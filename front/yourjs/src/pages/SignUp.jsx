//signup
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../img/logo.png';
import { colors } from '../common/color';
import { useNavigate } from 'react-router-dom';

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
  src: url('../img/logo.png');
`;

LogoImage.defaultProps = {
  src: logo,
};

const LabelText = styled.label`
  font-size: 20px;
  margin-top: 3%;
`;

const FormInput = styled.input`
  width: ${props => props.width};
  height: 30px;
  font-size: 16px;
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

const InputButton = styled.button`
  width: 27%;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.buttonBlue};
    color: white;
  }
`;

const InputDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonDiv = styled.div`
  margin-top: 3%;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 49%;
  background-color: ${props => props.color};
  border: none;
  font-size: 20px;
  color: ${props => props.fontcolor};
  cursor: pointer;
  border-radius: 5px;
`;

const SignUp = () => {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [name, setName] = useState('');
  //const [email, setEmail] = useState('');
  // 빈칸 체크
  const emptyCheck = () => {
    return true;
  };

  // 회원가입 버튼 클릭 이벤트
  const confirmButtonClicked = () => {};

  // 취소버튼 클릭 이벤트
  const cancelButtonClicked = () => {
    navigate('/login');
  };
  return (
    <Wrapper>
      <CenterDiv>
        <LogoImage />
      </CenterDiv>
      <CenterDiv>
        <h1>회원가입</h1>
      </CenterDiv>
      <FormDiv>
        <LabelText>아이디</LabelText>
        <InputDiv>
          <FormInput
            width="70%"
            type="text"
            value={id}
            onChange={e => {
              if (e.target.value.length < 13) setId(e.target.value);
              console.log(e.target.value.length);
            }}
          />
          <InputButton>중복확인</InputButton>
        </InputDiv>
        <LabelText>닉네임</LabelText>
        <InputDiv>
          <FormInput
            width="70%"
            type="text"
            value={nickname}
            onChange={e => {
              if (e.target.value.length < 13) setNickname(e.target.value);
              console.log(e.target.value.length);
            }}
          />
          <InputButton>중복확인</InputButton>
        </InputDiv>
        <LabelText>비밀번호</LabelText>
        <FormInput
          width="100%"
          type="password"
          value={password1}
          onChange={e => setPassword1(e.target.value)}
        />
        <LabelText>비밀번호확인</LabelText>
        <FormInput
          width="100%"
          type="password"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
        />
        <LabelText>이름</LabelText>
        <FormInput
          width="100%"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        {/*
        <LabelText>이메일</LabelText>
        <FormInput
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
  />*/}
        <ButtonDiv>
          <Button
            color={colors.buttonBlue}
            fontcolor="white"
            onClick={confirmButtonClicked}
          >
            회원가입
          </Button>
          <Button
            color="rgba(0, 0, 0, 0.2)"
            fontcolor="black"
            onClick={cancelButtonClicked}
          >
            취소
          </Button>
        </ButtonDiv>
      </FormDiv>
    </Wrapper>
  );
};

export default SignUp;
