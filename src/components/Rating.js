import React from 'react';
import './Rating.css';

const RATINGS = [1, 2, 3, 4, 5];

const Star = ({ selected = false, rating, onSelect, onHover, onMouseOut }) => {
  const className = `Rating-star ${selected ? 'selected' : ''}`;

  const handleClick = onSelect ? () => onSelect(rating) : undefined;

  const handleMouseOver = onHover ? () => onHover(rating) : undefined;

  return (
    <span
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >
      *
    </span>
  );
};

const Rating = ({ className, value = 0, onSelect, onHover, onMouseOut }) => {
  return (
    <div className={className} onMouseOut={onMouseOut}>
      {RATINGS.map((rating) => (
        <Star
          key={rating}
          selected={value >= rating}
          rating={rating}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </div>
  );
};

export default Rating;
