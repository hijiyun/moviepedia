import React, { useState } from 'react';
import './ReviewList.css';
import Rating from './Rating';
import ReviewForm from './ReviewForm';
import useTranslate from '../hooks/useTranslate';

const formatDate = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
};

const ReviewListItem = ({ item, onDelete, onEdit }) => {
  const t = useTranslate();
  const handleDeleteClick = () => onDelete(item.id);
  const handleEditClick = () => {
    onEdit(item.id);
  };
  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt="item image" />
      <div>
        <h1>{item.title}</h1>
        <Rating value={item.rating} />
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <button onClick={handleDeleteClick}>{t('delete button')}</button>
        <button onClick={handleEditClick}>{t('edit button')}</button>
      </div>
    </div>
  );
};

const ReviewList = ({ items, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const handleCancel = () => setEditingId(null);
  return (
    <ul>
      {items.map((item) => {
        if (item.id === editingId) {
          const { imgUrl, title, rating, content } = item;
          const initialValues = { title, rating, content };
          return (
            <div key={item.id}>
              <ReviewForm
                initialValues={initialValues}
                initialPreview={imgUrl}
                onCancel={handleCancel}
              />
            </div>
          );
        }
        return (
          <div key={item.id}>
            <ReviewListItem
              item={item}
              onDelete={onDelete}
              onEdit={setEditingId}
            />
          </div>
        );
      })}
    </ul>
  );
};

export default ReviewList;
