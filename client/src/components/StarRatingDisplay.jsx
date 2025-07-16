/*
* =======================================================================
* 6단계: 새 파일 - client/src/components/StarRatingDisplay.jsx
* =======================================================================
*/
import React from 'react';

export default function StarRatingDisplay({ rating }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span key={starValue} className={`text-xl ${rating >= starValue ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
        );
      })}
    </div>
  );
}