import React, { useState } from 'react';
import axios from 'axios';
import catImage from './cat.jpg'; 

const App = () => {
  const [file, setFile] = useState(null); 
  const [extractedSkills, setExtractedSkills] = useState([]); // store extracted skills
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // update file state
  };

  const handleFileUpload = async () => {
    if (!file) {
      setErrorMessage('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { extractedSkills } = response.data;

      if (Array.isArray(extractedSkills)) {
        setExtractedSkills(extractedSkills); // Update extracted skills 
      } else {
        setExtractedSkills([]); // clear extracted skills if not valid
      }

      setErrorMessage(''); // clear any previous errors
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage('An error occurred while uploading the file.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${catImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mx-auto my-16">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Skill Extractor</h1>
        
        {/* tis is the file upload button */}
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />
        
        <button
          onClick={handleFileUpload}
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Upload File
        </button>
        
        {/* tjis is the error message*/}
        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}

        {/* displays extracted skills */}
        {extractedSkills.length > 0 && (
          <div className="mt-6 bg-gray-100 p-4 rounded h-48 overflow-y-scroll">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Extracted Skills:</h2>
            <ul className="space-y-2">
              {extractedSkills.map((skill, index) => (
                <li key={index} className="text-blue-600">{skill.word}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
