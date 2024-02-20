const BASE_URL = 'https://learn.codeit.kr';

export async function getReviews({
  order = 'createdAt',
  offset = 0,
  limit = 0,
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(`${BASE_URL}/api/film-reviews?${query}`);
  if (!response.ok) {
    throw new Error('리뷰를 불러오는데 실패했어요');
  }
  const body = await response.json();
  return body;
}

export async function createReviews(formData) {
  const response = await fetch(`${BASE_URL}/api/film-reviews`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('리뷰를 생성하는데 실패했어요');
  }
  const body = await response.json();
  return body;
}
