/*
* =======================================================================
* 파일: client/src/components/Footer.jsx (수정)
* =======================================================================
* 설명: 전체적인 디자인 톤에 맞춰 푸터를 수정했습니다.
*/
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-brown-800 text-cream-200">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <div className="flex justify-center mb-6">
                 <img src="/assets/image_9791c6.jpg" alt="PoshPet Logo" className="h-24 w-auto filter invert brightness-200"/>
            </div>
          <p className="text-sm">
            주소: <a href="https://maps.app.goo.gl/AjubbtPsY7a3pksV6" target="_blank" rel="noopener noreferrer" className="hover:underline">베트남 하노이시</a> | 대표: OOO
          </p>
          <p className="mt-2 text-sm">
            고객센터: 02-1234-5678 | 이메일: contact@poshpet.com
          </p>
          <p className="mt-8 text-center text-xs text-cream-300 opacity-75">
            &copy; 2025 Posh Pet. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}