/*
* =======================================================================
* 4단계: 새 파일 - client/src/components/ReviewModal.jsx
* =======================================================================
*/
import React, { useState } from 'react';
import { createReview } from '../services/api.js';
import StarRatingInput from './StarRatingInput.jsx';

export default function ReviewModal({ reservation, onClose }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await createReview({
        reservationId: reservation._id,
        rating,
        text,
      });
      onClose(true);
    } catch (err) {
      setError(err.response?.data?.msg || '리뷰 작성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-brown-800 mb-4 font-serif">리뷰 작성하기</h2>
        <p className="text-sm text-gray-600 mb-1">서비스: {reservation.service.name}</p>
        <p className="text-sm text-gray-600 mb-6">펫: {reservation.pet.name}</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">별점</label>
            <StarRatingInput rating={rating} setRating={setRating} />
          </div>
          <div className="mb-6">
            <label htmlFor="review-text" className="block text-sm font-medium text-gray-700">후기</label>
            <textarea id="review-text" rows="4" value={text} onChange={(e) => setText(e.target.value)} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-brown-500 focus:border-brown-500" placeholder="소중한 경험을 공유해주세요."></textarea>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => onClose(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">취소</button>
            <button type="submit" disabled={isSubmitting} className="bg-brown-600 text-white px-4 py-2 rounded-md hover:bg-brown-700 disabled:opacity-50">
              {isSubmitting ? '제출 중...' : '작성 완료'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}