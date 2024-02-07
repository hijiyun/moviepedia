import React from 'react';
import './ReviewList.css';

const formatDate = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
};

const ReviewListItem = ({ item }) => {
  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt="item image" />
      <div>
        <h1>{item.title}</h1>
        <p>{item.rating}</p>
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
      </div>
    </div>
  );
};

const ReviewList = ({ items }) => {
  return (
    <ul>
      {items.map((item) => {
        return <ReviewListItem item={item} />;
      })}
    </ul>
  );
};

export default ReviewList;
