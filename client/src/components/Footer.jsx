/*
* =======================================================================
* 새 파일: client/src/components/Footer.jsx (푸터 부분)
* =======================================================================
* 설명: 모든 페이지 하단에 공통으로 보일 푸터입니다.
*/
import React from 'react';

export default function Footer() {
  const brandColors = { footerBg: '#5D4037', footerText: '#F8F5F0', footerTextSecondary: '#BCAAA4' };
  return (
    <footer id="about" className="py-12" style={{ backgroundColor: brandColors.footerBg, color: brandColors.footerText }}>
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center mb-6">
          <img src="/assets/image_9791c6.jpg" alt="PoshPet Logo" className="h-16 w-auto filter invert"/>
        </div>
        <p className="mb-4" style={{ color: brandColors.footerTextSecondary }}>
          주소: 베트남 하노이시 | 대표: OOO | 사업자등록번호: 123-45-67890<br />
          고객센터: 02-1234-5678 | 이메일: contact@poshpet.com
        </p>
        <p className="text-sm" style={{ color: '#BCAAA4' }}>&copy; 2025 PoshPet. All Rights Reserved.</p>
      </div>
    </footer>
  );
}