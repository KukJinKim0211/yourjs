//Login
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../img/logo.png';
import { colors } from '../common/color';

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
  src: url('../../img/logo.png');
`;

const LabelText = styled.label`
  font-size: 20px;
  margin-top: 8%;
`;

const FormInput = styled.input`
  height: 40px;
  font-size: 30px;
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
  font-size: 20px;
  background-color: ${props => props.color};
  color: ${props => props.fontcolor};
  margin-top: 2%;
  cursor: pointer;
  border: none;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

LogoImage.defaultProps = {
  src: logo,
};

const Login = () => {
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
        <FormInput type="text"></FormInput>
        <LabelText>비밀번호</LabelText>
        <FormInput type="password"></FormInput>
        <p>
          <Link to="/signup">아이디가 없으신가요? 회원가입</Link>
        </p>
        <LoginButton
          color={colors.buttonBlue}
          fontcolor="white"
          width="100%"
          height="50px"
        >
          로그인
        </LoginButton>

        <LoginButton
          color={colors.kakao}
          fontcolor="black"
          width="100%"
          height="50px"
        >
          카카오로그인
        </LoginButton>
        <LoginButton
          color={colors.naver}
          fontcolor="white"
          width="100%"
          height="50px"
        >
          네이버로그인
        </LoginButton>
      </FormDiv>
    </Wrapper>
  );
};

export default Login;
