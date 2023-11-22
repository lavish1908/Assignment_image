import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/images').then((response) => {
      setImages(response.data);
    });
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', file);

    axios.post('http://localhost:5000/upload', formData).then(() => {
      // Refresh the images after uploading
      axios.get('http://localhost:5000/images').then((response) => {
        setImages(response.data);
      });
    });
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div>
      <h1>MERN Image Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <div style={{ marginTop: '20px' }}>
        {images.map((image) => (
          <img
            key={image._id}
            src={`http://localhost:5000/${image.path}`}
            alt=""
            style={{ width: '100px', marginRight: '10px', cursor: 'pointer' }}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>

      {selectedImage && (
        <div style={{ marginTop: '20px' }}>
          <h2>Selected Image</h2>
          <img
            src={`http://localhost:5000/${selectedImage.path}`}
            alt=""
            style={{ width: '300px' }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
