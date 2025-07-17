// 파일: client/src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // 사용자의 브라우저 언어를 감지합니다.
  .use(initReactI18next) // i18n 인스턴스를 react-i18next에 전달합니다.
  .init({
    // 번역 리소스
    resources: {
      en: {
        translation: {
          // Header
          "menu.services": "Services",
          "menu.pricing": "Pricing",
          "menu.login": "Login",
          "menu.logout": "Logout",
          "menu.myPage": "My Page",
          "menu.admin": "Admin",
          "menu.adminServices": "Service Mng.",
          "menu.realtimeBooking": "Book Now",
          "greeting": "{{name}}",
          // Home Page
          "home.hero.title1": "The Most Special Day",
          "home.hero.title2": "For Your Beloved Pet",
          "home.hero.subtitle": "Posh Pet offers an unforgettable experience with love and professionalism, beyond simple care.",
        }
      },
      ko: {
        translation: {
          // Header
          "menu.services": "서비스",
          "menu.pricing": "가격",
          "menu.login": "로그인",
          "menu.logout": "로그아웃",
          "menu.myPage": "마이페이지",
          "menu.admin": "관리자",
          "menu.adminServices": "서비스 관리",
          "menu.realtimeBooking": "실시간 예약",
          "greeting": "{{name}}님",
          // Home Page
          "home.hero.title1": "당신의 반려가족을 위한",
          "home.hero.title2": "가장 특별한 하루",
          "home.hero.subtitle": "Posh Pet은 단순한 케어를 넘어, 사랑과 전문성으로 잊지 못할 경험을 선물합니다.",
        }
      },
      vi: {
        translation: {
          // Header
          "menu.services": "Dịch vụ",
          "menu.pricing": "Bảng giá",
          "menu.login": "Đăng nhập",
          "menu.logout": "Đăng xuất",
          "menu.myPage": "Trang của tôi",
          "menu.admin": "Quản trị",
          "menu.adminServices": "Quản lý dịch vụ",
          "menu.realtimeBooking": "Đặt lịch ngay",
          "greeting": "Chào {{name}}",
          // Home Page
          "home.hero.title1": "Một Ngày Đặc Biệt Nhất",
          "home.hero.title2": "Cho Thú Cưng Yêu Quý Của Bạn",
          "home.hero.subtitle": "Posh Pet không chỉ là sự chăm sóc, mà còn là món quà trải nghiệm khó quên với tình yêu và sự chuyên nghiệp.",
        }
      }
    },
    fallbackLng: 'en', // 기본 언어 설정
    interpolation: {
      escapeValue: false // React는 이미 XSS 방어 기능이 있으므로 false로 설정
    }
  });

export default i18n;