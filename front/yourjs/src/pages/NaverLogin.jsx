// 카카오 로그인 시 Redirect URI
// 이 페이지에서 백엔드에 인가코드를 보내주며 로그인 토큰을 발급받는다.

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NaverLogin = () => {
  const location = useLocation();
  // 리다이렉트 된 페이지에서 인가코드 꺼내오기
  const getNaverToken = () => {
    if (!location.hash) return;
    const token = location.hash.split('=')[1].split('&')[0]; //token 출력
    console.log(token);
  };

  useEffect(() => {
    getNaverToken();
  }, []);

  return <div></div>;
};

export default NaverLogin;
