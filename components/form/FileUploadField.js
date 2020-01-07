import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { takeRight } from 'lodash';
import { apiUrl } from '@common/helpers/url';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import FileUploadFieldPresentation from '@common/components/form/FileUploadFieledPresentation';
// This module is packaged incorrectly on NPM so we must install
// this module via Git and import each file individually
import FileManager from 'reactjs-file-uploader/src/components/FileManager';
import FileUploader from 'reactjs-file-uploader/src/components/FileUploader';

export class FileUpload extends React.Component {
  static propTypes = {
    file: PropTypes.object.isRequired,
    private: PropTypes.boolean,
    onUploadComplete: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
  };

  static defaultProps = {
    presentationComponent: FileUploadFieldPresentation
  };

  _generateSignature = async params => {
    const url = apiUrl('/cloudinary/signature');
    const body = JSON.stringify({ cloudinary: params });

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      credentials: 'include'
    });

    return res.text();
  };

  _onComplete = event => {
    const res = JSON.parse(event.target.response);

    if (res.error) {
      this.props.onError(res.error.message);
      return;
    }

    const path = takeRight(res.url.split('/'), 2).join('/');
    this.props.onUploadComplete({
      path,
      size: res.bytes
    });
  };

  _onRemove = event => {
    event.preventDefault();
    this.props.onRemove();
    return false;
  };

  _onError = () => {
    this.props.onError('Error uploading file to Cloudinary');
  };

  constructor(props) {
    super(props);

    const { file } = props;

    this.state = {
      file,
      timestamp: new Date().getTime(),
      signature: null
    };
  }

  async componentWillMount() {
    const { timestamp } = this.state;

    const params = { timestamp };
    if (this.props.private) {
      params.type = 'private';
    }

    try {
      const signature = await this._generateSignature(params);
      this.setState({ signature }, () => {
        this.uploader.startUpload();
      });
    } catch (err) {
      this.props.onError('Unexpected error starting upload');
    }
  }

  render() {
    const { file, timestamp, signature } = this.state;

    const data = {
      file,
      timestamp,
      signature,
      api_key: process.env['CLOUDINARY_API_KEY']
    };

    if (this.props.private) {
      data.type = 'private';
    }

    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="space-evenly"
        width={0.5}
      >
        <FileUploader
          ref={uploader => (this.uploader = uploader)}
          file={file}
          url={process.env['CLOUDINARY_UPLOAD_URL']}
          formData={data}
          readFile
          onDownloadComplete={this._onComplete}
          onUploadProgres={this._onProgress}
          onError={this._onError}
        >
          {data => {
            const { requestState, uploadProgress } = data;

            const { loaded, total } = uploadProgress || {};
            let progress = 0;

            switch (requestState) {
              case 'uploadReady':
              case 'uploadStart':
                progress = 0;
                break;
              case 'uploadProgress':
                progress = total ? loaded / total : 0;
                break;
              case 'uploadComplete':
              case 'downloadStart':
              case 'downloadProgress':
              case 'downloadComplete':
                progress = 1;
                break;
            }

            return (
              <this.props.presentationComponent
                data={data}
                progress={progress}
                onRemoveClick={this._onRemove}
              />
            );
          }}
        </FileUploader>
      </Box>
    );
  }
}

const styles = {
  label: {
    overflow: 'hidden',
    position: 'relative'
  },
  input: {
    cursor: 'inherit',
    display: 'block',
    fontSize: '999px',
    filter: 'alpha(opacity=0)',
    minHeight: '100%',
    minWidth: '100%',
    opacity: 0,
    position: 'absolute',
    right: 0,
    textAlign: 'right',
    top: 0
  }
};

const FileUploadField = props => {
  const [files, setFiles] = useState([]);
  const paths = {};

  const updateForm = files => {
    const { field, form } = props;

    const values = files.map(file => {
      return paths[file.key];
    });

    form.setFieldValue(field.name, values);
  };

  const onFilesChange = event => {
    setFiles(files.concat(Array.from(event.target.files)));
  };

  const onRemoveFile = index => {
    const file = files[index];
    delete paths[file.key];
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    updateForm(newFiles);
  };

  const onUploadComplete = (key, res) => {
    paths[key] = res;
    updateForm(files);
    if (props.onComplete) {
      // res contains the path needed for cloudinary upload
      // mutation
      props.onComplete(res);
    }
  };

  return (
    <div>
      <Button component="div">
        <label style={styles.label}>
          {props.buttonText || 'Choose File'}
          <input
            type="file"
            style={styles.input}
            onChange={onFilesChange}
            multiple
          />
        </label>
      </Button>

      <FileManager files={files}>
        {files =>
          files.map((file, i) => {
            return (
              <FileUpload
                key={file.key}
                file={file}
                private={props.private}
                onRemove={() => onRemoveFile(i)}
                onUploadComplete={path => onUploadComplete(file.key, path)}
                onError={props.onError}
              />
            );
          })
        }
      </FileManager>
    </div>
  );
};

FileUploadField.propTypes = {
  private: PropTypes.boolean,
  buttonText: PropTypes.string,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  onError: PropTypes.func.isRequired,
  onComplete: PropTypes.func
};

export default FileUploadField;
