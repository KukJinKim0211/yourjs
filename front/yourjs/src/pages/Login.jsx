//Login
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../img/logo.png';
import { colors } from '../common/color';
import { KAKAO_AUTH_URL } from '../common/login';
import kakao_login_button from '../img/kakao_login_button.png';
import naver_login_button from '../img/naver_login_button.png';
import axios from 'axios';
import { SERVER_IP, apis } from '../common/apis';
import { setCookie, getCookie } from '../common/cookie';
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
  margin: 10% 0px;
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
  margin-bottom: 2%;
`;

const FormInput = styled.input`
  height: 40px;
  font-size: 22px;
  color: black;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-left: 10px;
  /* &:hover {
    border-bottom: 1px solid black;
  }
  &:focus {
    border-bottom: 1px solid black;
  } */

  &:hover {
    border: 1px solid ${colors.bsColor4};
  }

  &:focus {
    border: 1px solid ${colors.bsColor4};
    box-shadow: 0 0 10px ${colors.bsColor3};
    outline: none;
  }
`;

const CustomCheckBox = styled.input`
  width: 25px;
  height: 25px;
  accent-color: ${colors.bsColor3};

  &:checked {
    background-color: ${colors.bsColor0};
    color: white;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  height: 75px;
  font-size: 26px;
  background-color: ${colors.bsColor3};
  color: black;
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

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getToken = () => {
    const token = window.location.href.split('=')[1].split('&')[0];
  };
  const userAccessToken = () => {
    window.location.href.includes('access_token') && getToken();
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
          dispatch({ type: 'selected', select: 0 });
          sessionStorage.setItem('selectItem', 0);
          sessionStorage.setItem('nickname', response.data.nickname);
          sessionStorage.setItem('loginState', true);
          sessionStorage.setItem('accessToken', response.data.accessToken);
          navigate('/main');
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    userAccessToken();
  });

  return (
    <Wrapper>
      <CenterDiv>
        <LogoImage />
      </CenterDiv>
      {/* <CenterDiv>
        <h1 id="titleFont">로그인</h1>
      </CenterDiv> */}
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
        <p id="contentFont" style={{ textAlign: 'right' }}>
          <Link to="/signup">아이디가 없으신가요? 회원가입</Link>
        </p>
        <LoginButton id="contentFont" onClick={loginButtonClicked}>
          로그인
        </LoginButton>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <a href={KAKAO_AUTH_URL} style={{ width: '100%', height: '75px' }}>
            <KakaoButtonImage />
          </a>
        </div>
      </FormDiv>
    </Wrapper>
  );
};

export default Login;
