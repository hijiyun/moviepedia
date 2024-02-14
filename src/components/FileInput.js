import React, { useEffect, useRef, useState } from 'react';

const FileInput = ({ name, value, onChange }) => {
  const [preview, setPreview] = useState();
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValues = e.target.files[0];
    onChange(name, nextValues);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = '';
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview();
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]); //파일을 선택할 때마다 미리보기 주소를 바꾸는 거임 !

  return (
    <div>
      {preview && <img src={preview} alt="이미지 미리보기" />}
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
      />
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
};

export default FileInput;
