// src/components/FileUpload.js
import React, { useState } from "react";

const FileUpload = ({ onFileSelect }) => {
  const [file, setFile] = useState(null); // Store the selected file

  const handleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("No file selected");
      return;
    }

    const selectedFile = e.target.files[0]; // ✅ Declare selectedFile inside the function

    setFile(selectedFile); // ✅ Store it in state

    if (typeof onFileSelect === "function") {
      onFileSelect(selectedFile); // ✅ Call the parent function with the file
    } else {
      console.error("onFileSelect is not a function");
    }
  };

  return (
    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer px-6 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition duration-200"
      >
        Choose a File
      </label>
      {/* ✅ Show selected file name after upload */}
      {file && <p className="mt-2 text-gray-700">Selected File: {file.name}</p>}
    </div>
  );
};

export default FileUpload;
