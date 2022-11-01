//Login
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../img/logo.png';
import { colors } from '../common/color';
import {
  KAKAO_AUTH_URL,
  NAVER_CLIENT_ID,
  NAVER_REDIRECT_URI,
} from '../common/login';
import kakao_login_button from '../img/kakao_login_button.png';
import naver_login_button from '../img/naver_login_button.png';
import axios from 'axios';
import { SERVER_IP, apis } from '../common/apis';
import { setCookie, getCookie } from '../common/cookie';
import axiosInstance from '../common/customAxios';

const Wrapper = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoImage = styled.img`
  padding-top: 5%;
  width: 40%;
`;

LogoImage.defaultProps = {
  src: logo,
};

const LabelText = styled.label`
  font-size: 20px;
  margin-top: 8%;
`;

const FormInput = styled.input`
  height: 40px;
  font-size: 22px;
  color: black;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  &:hover {
    border-bottom: 1px solid black;
  }
  &:focus {
    border-bottom: 1px solid black;
  }
`;

const LoginButton = styled.button`
  width: ${props => props.width};
  height: ${props => props.height};
  font-size: 26px;
  background-color: ${props => props.color};
  color: ${props => props.fontcolor};
  margin-top: 2%;
  cursor: pointer;
  border: none;
  border-radius: 5px;
`;

const KakaoButtonImage = styled.img`
  padding-top: 3%;
  width: 100%;
  height: 100%;
  object-fit: fill;
  cursor: pointer;
`;

KakaoButtonImage.defaultProps = {
  src: kakao_login_button,
};

const NaverButtonImage = styled.img`
  padding-top: 3%;
  width: 100%;
  height: 100%;
  object-fit: fill;
  cursor: pointer;
`;

NaverButtonImage.defaultProps = {
  src: naver_login_button,
};

const NaverIdLogin = styled.div`
  display: none;
`;

const Login = () => {
  const { naver } = window;
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const naverRef = useRef();
  const navigate = useNavigate();
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_REDIRECT_URI,
      isPopup: false,
      loginButton: { color: 'green', type: 2, height: '70' },
    });
    naverLogin.init();
  };
  const getToken = () => {
    const token = window.location.href.split('=')[1].split('&')[0];
  };
  const userAccessToken = () => {
    window.location.href.includes('access_token') && getToken();
  };

  const handleNaverLogin = () => {
    naverRef.current.children[0].click();
  };

  const loginButtonClicked = () => {
    if (id.length === 0) return;

    if (password.length === 0) return;

    console.log('login click');

    // 로그인 POST 전송
    axiosInstance
      .post(apis.login, { userId: id, password: password })
      .then(response => {
        if (response.status === 200) {
          // 로그인 시 발급받은 Refresh Token을 웹 쿠키에 저장
          setCookie('refresh_Token', response.data.token);
        }
        console.log(response);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    initializeNaverLogin();
    userAccessToken();
  });

  return (
    <Wrapper>
      <CenterDiv>
        <LogoImage />
      </CenterDiv>
      <CenterDiv>
        <h1>로그인</h1>
      </CenterDiv>
      <FormDiv>
        <LabelText>아이디</LabelText>
        <FormInput
          type="text"
          value={id}
          onChange={e => setId(e.target.value)}
          maxLength={12}
        ></FormInput>
        <LabelText>비밀번호</LabelText>
        <FormInput
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          maxLength={10}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              loginButtonClicked();
            }
          }}
        ></FormInput>
        <p>
          <Link to="/signup">아이디가 없으신가요? 회원가입</Link>
        </p>
        <LoginButton
          color={colors.buttonBlue}
          fontcolor="white"
          width="100%"
          height="65px"
          onClick={loginButtonClicked}
        >
          로그인
        </LoginButton>
        {/*
        <a href={KAKAO_AUTH_URL}>
          <LoginButton
            color={colors.kakao}
            fontcolor="black"
            width="100%"
            height="50px"
          >
            카카오로그인
          </LoginButton>
        </a>
        <LoginButton
          color={colors.naver}
          fontcolor="white"
          width="100%"
          height="50px"
        >
          네이버로그인
  </LoginButton>*/}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <a href={KAKAO_AUTH_URL} style={{ width: '49%', height: '65px' }}>
            <KakaoButtonImage />
          </a>
          <a style={{ width: '49%', height: '65px' }}>
            <NaverIdLogin ref={naverRef} id="naverIdLogin" />
            <NaverButtonImage onClick={handleNaverLogin} />
          </a>
        </div>
      </FormDiv>
    </Wrapper>
  );
};

export default Login;
