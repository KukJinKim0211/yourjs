// 계정 관리 컴포넌트
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../common/color';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import { useDispatch } from 'react-redux';

const Wrapper = styled.div`
  background-color: ${colors.bsColor0};
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding-left: 5%;
  width: 100%;
`;

const TitleFont = styled.p`
  color: black;
  font-size: 24px;
  width: 94%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 15px;
`;

const LabelFont = styled.p`
  color: rgba(0, 0, 0, 0.7);
  font-size: 20px;
  font-family: 'InfinitySans-RegularA1';
`;

const DataDiv = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const DataInput = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 16px;
  padding: 6px 3px;
  width: 44%;
  border-radius: 5px;

  &:hover {
    border: 1px solid ${colors.bsColor4};
  }

  &:focus {
    border: 1px solid ${colors.bsColor4};
    box-shadow: 0 0 10px ${colors.bsColor3};
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: ${props => props.color};
  margin-left: 3%;
`;

const NickCheckButton = styled.button`
  width: 10%;
  height: 70%;
  background-color: ${colors.bsColor3};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 3%;
`;

const SaveButton = styled.button`
  width: 200px;
  height: 40px;
  font-size: 18px;
  margin-top: 4%;
  margin-bottom: 4%;
  margin-left: 70%;
  background-color: ${props => props.color};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${props =>
      props.type === 0 ? colors.bsColor3 : 'rgba(0, 0, 0, 0.2)'};
  }
`;

const ManageAccount = () => {
  const [nickname, setNickname] = useState('');
  const [userImg, setUserImg] = useState('');
  const [email, setEmail] = useState('');
  const [nicknameInvalid, setNicknameInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .get(apis.getUserDetailInfo)
      .then(response => setUserImg(response.data.userImg));
  }, []);

  // 닉네임 중복확인
  const checkNickname = () => {
    if (nickname === '') return;
    axiosInstance.post(apis.nicknameCheck, { nickname }).then(response => {
      setNicknameInvalid(response.data);
      if (response.data) setErrorMessage('사용가능한 닉네임입니다.');
      else setErrorMessage('이미 존재하는 닉네임입니다.');
    });
  };

  // 회원정보 변경
  const infoChange = () => {
    if (!nicknameInvalid) {
      alert('닉네임 중복체크를 해주세요.');
    }
    if (nickname === '' || email === '') {
      alert('정보를 입력 해 주세요.');
    }
    axiosInstance
      .patch(apis.infoChange, { nickname, email, userImg })
      .then(response => {
        if (response.status === 200) {
          dispatch({ type: 'login', nickname });
          sessionStorage.setItem('nickname', nickname);
          alert('계정 정보 변경에 성공하셨습니다.');
        }
      });
  };

  return (
    <Wrapper>
      <TitleFont id="contentFont">계정 관리</TitleFont>
      <LabelFont>닉네임</LabelFont>
      <DataDiv>
        <DataInput
          value={nickname}
          onChange={e => setNickname(e.target.value)}
        ></DataInput>
        <NickCheckButton id="contentFont" onClick={() => checkNickname()}>
          중복확인
        </NickCheckButton>
      </DataDiv>
      {nicknameInvalid ? (
        <ErrorMessage color="blue">{errorMessage}</ErrorMessage>
      ) : (
        <ErrorMessage color="red">{errorMessage}</ErrorMessage>
      )}
      <LabelFont>이메일</LabelFont>
      <DataInput
        value={email}
        onChange={e => setEmail(e.target.value)}
      ></DataInput>
      <SaveButton
        type={0}
        color={colors.bsColor4}
        id="contentFont"
        onClick={() => infoChange()}
      >
        수정하기
      </SaveButton>
    </Wrapper>
  );
};

export default ManageAccount;
