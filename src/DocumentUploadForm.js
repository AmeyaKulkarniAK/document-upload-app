import axios from 'axios';
import React, { useState } from 'react';

const DocumentUploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      axios
        .post('/api/upload', formData)
        .then((response) => {
          const newDocument = response.data;
          onUpload(newDocument); // Call the onUpload callback with the new document data
          setFile(null);
          alert('File uploaded successfully');
        })
        .catch((error) => {
          // Handle error
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default DocumentUploadForm;
