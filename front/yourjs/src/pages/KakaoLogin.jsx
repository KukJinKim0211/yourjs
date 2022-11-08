// 카카오 로그인 시 Redirect URI
// 이 페이지에서 백엔드에 인가코드를 보내주며 로그인 토큰을 발급받는다.

import React, { useEffect } from 'react';
import axios from 'axios';
import { SERVER_IP, apis } from '../common/apis';
import { setCookie } from '../common/cookie';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const KakaoLogin = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // 리다이렉트 된 페이지에서 인가코드 꺼내오기
    const code = new URL(window.location.href).searchParams.get('code');
    axios.get(SERVER_IP + apis.kakaoLogin + `?code=${code}`).then(response => {
      if (response.state === 200 && response.data !== '') {
        const data = response.data;
        // 로그인 시 발급받은 Access/Refresh Token을 웹 쿠키에 저장
        setCookie('refresh_Token', response.data.refreshToken);
        // 자동 로그인 처리
        localStorage.setItem('autoLogin', false);
        dispatch({ type: 'login', nickname: response.data.nickname });
        sessionStorage.setItem('selectItem', 0);
        sessionStorage.setItem('loginState', true);
        sessionStorage.setItem('accessToken', response.data.accessToken);
        navigate('/main');
      }
    });
  }, []);
  return <div></div>;
};

export default KakaoLogin;
