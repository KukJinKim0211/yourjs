//signup
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../img/logo.png';
import { colors } from '../common/color';
import { SERVER_IP, apis } from '../common/apis';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  src: url('../img/logo.png');
`;

LogoImage.defaultProps = {
  src: logo,
};

const LabelText = styled.label`
  font-size: 20px;
  margin-top: 2%;
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

const MessageText = styled.p`
  color: ${props =>
    props.type === 1 ? colors.negativeMsgColor : colors.positiveMsgColor};
`;

const ButtonDiv = styled.div`
  margin-top: 3%;
  width: 100%;
  height: 50px;
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
  const [idState, setIdState] = useState(0);
  const [nickname, setNickname] = useState('');
  const [nicknameState, setNicknameState] = useState(0);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [password2State, setPassword2State] = useState(0);
  const [name, setName] = useState('');
  //const [email, setEmail] = useState('');

  // id 입력체크
  // 제한조건 : 6 ~ 12글자
  useEffect(() => {
    if (id.length === 0) {
      // 미입력시 : 0
      setIdState(0);
    } else if (id.length < 6 || id.length > 12) {
      // 글자 수 에러 : 1
      setIdState(1);
    } else {
      // 중복이상 : 2,  사용가능 : 3
      axios
        .post(SERVER_IP + apis.idCheck, {
          userId: id,
        })
        .then(response => {
          if (response.data) setIdState(3);
          else setIdState(2);
        })
        .catch(error => console.log(error));
    }
  }, [id]);

  // 닉네임 중복체크
  // 제한조건 : 2 ~ 8글자
  useEffect(() => {
    if (nickname.length === 0) {
      // 미입력시 : 0
      setNicknameState(0);
    } else if (nickname.length < 2 || nickname.length > 8) {
      // 글자 수 에러 : 1
      setNicknameState(1);
    } else {
      // 중복이상 : 2,  사용가능 : 3
      axios
        .post(SERVER_IP + apis.nicknameCheck, {
          nickname,
        })
        .then(response => {
          if (response.data) setNicknameState(3);
          else setNicknameState(2);
        })
        .catch(error => console.log(error));
    }
  }, [nickname]);

  // 비밀번호 일치체크
  useEffect(() => {
    if (password2.length === 0) {
      // 미입력시 : 0
      setPassword2State(0);
    } else if (password1 !== password2) {
      // 패스워드가 맞지 않을 시 : 1
      setPassword2State(1);
    } else {
      // 패스워드가 맞을 시 : 2
      setPassword2State(2);
    }
  }, [password2, password1]);

  // 빈칸 체크
  const emptyCheck = () => {
    // 아이디 유효성 체크
    if (idState !== 3) {
      alert('아이디를 확인해 주세요.');
      return false;
    }

    // 닉네임 유효성 체크
    if (nicknameState !== 3) {
      alert('닉네임을 확인해 주세요.');
      return false;
    }

    // 이름 입력 체크
    if (name.length < 2 || name.length > 8) {
      alert('이름의 양식이 맞지 않습니다.');
      return false;
    }

    // 비밀번호 자리수 체크
    if (password1.length < 4 || password1.length > 10) {
      alert('비밀번호의 양식이 맞지 않습니다.');
      return false;
    }

    // 비밀번호 일치 체크
    if (password2State !== 2) {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }

    return true;
  };

  // 회원가입 버튼 클릭 이벤트
  const confirmButtonClicked = () => {
    // 입력 정보 유효성 체크
    if (!emptyCheck()) return;
    /*
    {
  "userId": "string",
  "userName": "string",
  "password": "string",
  "nickname": "string",
  "authorityDtoSet": [
    {
      "authorityName": "string"
    }
  ]
}
*/
    axiosInstance
      .post(apis.signUp, {
        userId: id,
        userName: name,
        password: password1,
        nickname: nickname,
      })
      .then(response => {
        if (response.status === 200) navigate('/login');
      })
      .catch(error => console.log(error));
  };

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
        <FormInput
          width="100%"
          type="text"
          value={id}
          maxLength={12}
          placeholder="6 ~ 12글자"
          onChange={e => setId(e.target.value)}
        />
        {idState === 1 && (
          <MessageText type={1}>6글자 ~ 12글자를 입력 해 주세요.</MessageText>
        )}
        {idState === 2 && (
          <MessageText type={1}>이미 사용중인 아이디입니다.</MessageText>
        )}
        {idState === 3 && (
          <MessageText type={2}>사용할 수 있는 아이디입니다.</MessageText>
        )}
        <LabelText>닉네임</LabelText>
        <FormInput
          width="100%"
          type="text"
          value={nickname}
          maxLength={8}
          placeholder="2 ~ 8글자"
          onChange={e => setNickname(e.target.value)}
        />
        {nicknameState === 1 && (
          <MessageText type={1}>2글자 ~ 8글자를 입력 해 주세요.</MessageText>
        )}
        {nicknameState === 2 && (
          <MessageText type={1}>이미 사용중인 닉네임입니다.</MessageText>
        )}
        {nicknameState === 3 && (
          <MessageText type={2}>사용할 수 있는 닉네임입니다.</MessageText>
        )}
        <LabelText>이름</LabelText>
        <FormInput
          width="100%"
          type="text"
          value={name}
          maxLength={8}
          placeholder="2 ~ 8글자"
          onChange={e => setName(e.target.value)}
        />
        <LabelText>비밀번호</LabelText>
        <FormInput
          width="100%"
          type="password"
          value={password1}
          maxLength={10}
          placeholder="4 ~ 10글자"
          onChange={e => setPassword1(e.target.value)}
        />
        <LabelText>비밀번호확인</LabelText>
        <FormInput
          width="100%"
          type="password"
          value={password2}
          maxLength={10}
          placeholder="4 ~ 10글자"
          onChange={e => setPassword2(e.target.value)}
        />
        {password2State === 1 && (
          <MessageText type={1}>비밀번호가 일치하지 않습니다.</MessageText>
        )}
        {password2State === 2 && (
          <MessageText type={2}>비밀번호가 일치합니다.</MessageText>
        )}
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
