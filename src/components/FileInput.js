import React, { useState } from 'react';

const FileInput = ({ name, value, onChange }) => {
  const handleChange = (e) => {
    const nextValues = e.target.files[0];
    console.log(nextValues);
    onChange(name, nextValues);
  };
  return (
    <div>
      <input type="file" onChange={handleChange} />
    </div>
  );
};

export default FileInput;
