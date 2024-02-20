import React, { useState } from 'react';
import './ReviewForm.css';
import FileInput from './FileInput';
import RatingInput from './RatingInput';

const INITIAL_VALUES = {
  title: '',
  rating: 0,
  content: '',
  imgFile: null,
};

const ReviewForm = ({
  initialValues = INITIAL_VALUES,
  initialPreview,
  onSubmitSuccess,
  onSubmit,
  onCancel,
}) => {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubMitting] = useState(false);
  const [subMittingError, setSubMittingError] = useState(null);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('rating', values.rating);
    formData.append('content', values.content);
    formData.append('imgFile', values.imgFile);

    let result;
    try {
      setSubMittingError(null);
      setIsSubMitting(true);
      result = await onSubmit(formData);
    } catch (error) {
      setSubMittingError(error);
      return;
    } finally {
      setIsSubMitting(false);
    }
    const { review } = result;
    onSubmitSuccess(review);
    setValues(INITIAL_VALUES);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        initialPreview={initialPreview}
        value={values.imgFile}
        onChange={handleChange}
      />
      <input
        name="title"
        type="text"
        value={values.title}
        onChange={handleInputChange}
      />
      <RatingInput
        name="rating"
        value={values.rating}
        onChange={handleChange}
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      ></textarea>
      <button type="submit" disabled={isSubmitting}>
        확인
      </button>
      {onCancel && <button onClick={onCancel}>취소</button>}
      {subMittingError?.message && <div>{subMittingError.message}</div>}
    </form>
  );
};

export default ReviewForm;
