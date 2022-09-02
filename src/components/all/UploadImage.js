import React, { useState } from 'react';
import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export function UploadImage(props){
  const { image, setImage } = props;
  const [loading, setLoading] = useState(false);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = info => {
    if(info.file.status === 'uploading'){
      setLoading(true);
      return;
    }
    if(info.file.status === 'done'){
      getBase64(info.file.originFileObj, image => {
        console.log(image)
        setImage(image);
        setLoading(false);
      });
    }
  };

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => onSuccess("ok"), 0);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined className='upload_btn' /> : <PlusOutlined className='upload_btn' />}
      <p className='upload_text'>Upload</p>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      showUploadList={false}
      customRequest={dummyRequest}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={handleChange}>
      {image ? <img src={image} alt="avatar" className='upload_image' /> : uploadButton}
    </Upload>
  )
}