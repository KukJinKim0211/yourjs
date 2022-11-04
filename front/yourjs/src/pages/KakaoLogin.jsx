// 카카오 로그인 시 Redirect URI
// 이 페이지에서 백엔드에 인가코드를 보내주며 로그인 토큰을 발급받는다.

import React from 'react';

const KakaoLogin = props => {
  // 리다이렉트 된 페이지에서 인가코드 꺼내오기
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);
  console.log(props);
  return <div></div>;
};

export default KakaoLogin;
