/*
* =======================================================================
* 5단계: 새 파일 - client/src/components/StarRatingInput.jsx
* =======================================================================
*/
import React from 'react';

export default function StarRatingInput({ rating, setRating }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none text-3xl">
          <span className={`${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
        </button>
      ))}
    </div>
  );
}
