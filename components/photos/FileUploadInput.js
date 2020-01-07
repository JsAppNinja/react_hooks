import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

// This module is packaged incorrectly on NPM so we must install
// this module via Git and import each file individually
import FileManager from 'reactjs-file-uploader/src/components/FileManager';

import { FileUpload as UploadWithProgressBar } from '@common/components/form/FileUploadField';

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

const FileUploadInput = props => {
  const [files, setFiles] = useState([]);
  const paths = {};

  const onFilesChange = event => {
    setFiles(files.concat(Array.from(event.target.files)));
  };

  const onRemoveFile = index => {
    const file = files[index];
    delete paths[file.key];
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const onUploadComplete = (key, res) => {
    paths[key] = res;
    if (props.onComplete) {
      // res contains the path needed for cloudinary upload
      // mutation
      props.onComplete(res);
    }
  };

  return (
    <>
      <FileManager files={files}>
        {files => {
          return (
            <>
              <Button component="div">
                <label style={styles.label}>
                  Choose File
                  {/* actual input element is not rendered visibly */}
                  <input
                    type="file"
                    style={styles.input}
                    onChange={onFilesChange}
                    multiple={props.multiple}
                  />
                </label>
              </Button>
              {files.map((file, i) => {
                return (
                  <UploadWithProgressBar
                    key={file.key}
                    file={file}
                    private={props.private}
                    onRemove={() => onRemoveFile(i)}
                    onUploadComplete={path => onUploadComplete(file.key, path)}
                    onError={err => console.log(err)}
                  />
                );
              })}
            </>
          );
        }}
      </FileManager>
    </>
  );
};

FileUploadInput.propTypes = {
  private: PropTypes.bool,
  onComplete: PropTypes.func,
  multiple: PropTypes.bool
};
export default FileUploadInput;
