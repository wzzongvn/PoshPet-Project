/*
* =======================================================================
* 새 파일: client/src/components/Footer.jsx (푸터 부분)
* =======================================================================
* 설명: 모든 페이지 하단에 공통으로 보일 푸터입니다.
*/
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-brown-800 text-cream-200">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <div className="flex justify-center mb-4">
                 <img src="/assets/image_9791c6.jpg" alt="PoshPet Logo" className="h-20 w-auto filter invert brightness-200"/>
            </div>
          <p>
            주소: 베트남 하노이시 | 대표: OOO | 사업자등록번호: 123-45-67890
          </p>
          <p className="mt-2">
            고객센터: 02-1234-5678 | 이메일: contact@poshpet.com
          </p>
          <p className="mt-8 text-center text-base text-cream-300">
            &copy; 2025 Posh Pet. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}