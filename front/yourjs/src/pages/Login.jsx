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
import { useDispatch } from 'react-redux';

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

const CheckBoxDiv = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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

const CustomCheckBox = styled.input`
  background-color: red;
  width: 25px;
  height: 25px;
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
  const [autoLogin, setAutoLogin] = useState(false);

  const dispatch = useDispatch();

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
    // 아이디 유효성 체크
    if (id.length === 0) return;
    // 비밀번호 유효성 체크
    if (password.length === 0) return;
    // 로그인 POST 전송
    axios
      .post(SERVER_IP + apis.login, { userId: id, password: password })
      .then(response => {
        if (response.status === 200) {
          // 로그인 시 발급받은 Access/Refresh Token을 웹 쿠키에 저장
          setCookie('refresh_Token', response.data.refreshToken);
          // 자동 로그인 처리
          if (autoLogin) localStorage.setItem('autoLogin', true);
          else localStorage.setItem('autoLogin', false);
          dispatch({ type: 'login', nickname: response.data.nickname });
          sessionStorage.setItem('selectItem', 0);
          sessionStorage.setItem('loginState', true);
          sessionStorage.setItem('accessToken', response.data.accessToken);
          navigate('/main');
        }
      })
      .catch(error => console.log(error));
  };

  const kakao = async () => {
    const response = await axios
      .get(KAKAO_AUTH_URL)
      .then(response => console.log(response));
    console.log(response);
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
        <h1 id="titleFont">로그인</h1>
      </CenterDiv>
      <FormDiv>
        <LabelText id="contentFont">아이디</LabelText>
        <FormInput
          type="text"
          value={id}
          onChange={e => setId(e.target.value)}
          maxLength={12}
        ></FormInput>
        <LabelText id="contentFont">비밀번호</LabelText>
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
        <CheckBoxDiv>
          <CustomCheckBox
            type="checkbox"
            value={autoLogin}
            onClick={() => setAutoLogin(!autoLogin)}
          ></CustomCheckBox>
          <p id="contentFont" style={{ marginLeft: '10px' }}>
            자동 로그인
          </p>
        </CheckBoxDiv>
        <p id="contentFont">
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
          {/* <KakaoButtonImage onClick={() => kakao()} /> */}
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
