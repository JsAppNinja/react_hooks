import React from 'react';
import PropTypes from 'prop-types';
import { takeRight } from 'lodash';
import { apiUrl } from '@common/helpers/url';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

// This module is packaged incorrectly on NPM so we must install
// this module via Git and import each file individually
import FileUploader from 'reactjs-file-uploader/src/components/FileUploader';

export default class CloudinaryPhotoUpload extends React.Component {
  static propTypes = {
    file: PropTypes.object.isRequired,
    private: PropTypes.boolean,
    onUploadComplete: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
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
    console.log('CLoudingar photo upload');
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
      <List dense={true}>
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
              <ListItem>
                <ListItemText
                  primary={data.file.name}
                  secondary={
                    <LinearProgress
                      variant="determinate"
                      value={Math.round(progress * 100)}
                    />
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="Delete"
                    onClick={this._onRemove}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          }}
        </FileUploader>
      </List>
    );
  }
}
