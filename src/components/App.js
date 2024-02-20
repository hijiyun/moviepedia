import React, { useEffect, useState } from 'react';
import ReviewList from './ReviewList';
import { createReviews, getReviews } from '../api';
import ReviewForm from './ReviewForm';

const LIMIT = 6;

const App = () => {
  const [items, setItems] = useState([]); // 지금 현재에 불러와져있는 모든 데이터들
  const [order, setOrder] = useState('createdAt');
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLodingError] = useState(null);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  const handleNewestClick = () => setOrder('createdAt');
  const handleBestClick = () => setOrder('rating');
  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLodingError(null);
      result = await getReviews(options);
    } catch (error) {
      setLodingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    /**
     * reviews: 렌더링 될때 불러와지는 데이터들 (limit이 6이니 데이터 6개만 보인다 !)
     */
    const { reviews, paging } = result;
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]);
    }
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  };

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  const handleCreateSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  };

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <ReviewForm
        onSubmit={createReviews}
        onSubmitSuccess={handleCreateSuccess}
      />
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
};

export default App;
