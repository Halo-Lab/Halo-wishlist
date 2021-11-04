import React, { useState } from 'react';
import ReactS3Client from 'react-aws-s3-typescript';
import { useDispatch } from 'react-redux';

import { updateUserPic } from '../../../store/user-reducer';
import { s3Config } from '../../../utils/s3Config';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (file) => {
    const s3 = new ReactS3Client(s3Config);

    try {
      const res = await s3.uploadFile(file);
      if (res.status === 204) {
        console.log(res.location);
        dispatch(updateUserPic(res.location));
      }
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div>
      <div>React S3 File Upload</div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
  );
};

export default Upload;
