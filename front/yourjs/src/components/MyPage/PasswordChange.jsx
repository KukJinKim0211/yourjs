// 패스워드 변경 컴포넌트
import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../common/color';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';

const Wrapper = styled.div`
  background-color: ${colors.bsColor0};
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding-left: 5%;
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

const SaveButton = styled.button`
  width: 200px;
  height: 40px;
  font-size: 18px;
  margin-bottom: 4%;
  background-color: ${props => props.color};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${props =>
      props.type === 0 ? colors.bsColor3 : 'rgba(0, 0, 0, 0.2)'};
  }
`;

const ErrorText = styled.p`
  color: ${props => props.color};
`;

const PasswordChange = () => {
  const [curPassword, setCurPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [message, setMessage] = useState('');
  // 비밀번호가 일치하는지 flag
  const [invalid, setInvalid] = useState(false);

  const checkNewPassword = e => {
    setNewPassword2(e.target.value);
    if (newPassword === e.target.value) {
      setMessage('비밀번호가 일치합니다.');
      setInvalid(true);
    } else {
      setMessage('비밀번호가 불일치합니다.');
      setInvalid(false);
    }
  };

  const changePassword = () => {
    if (curPassword === '' || newPassword === '' || newPassword2 === '')
      alert('정보를 입력 해 주세요');

    if (!invalid) alert('새로운 비밀번호를 확인 해 주세요');

    axiosInstance
      .patch(apis.passwordChange, { curPassword, newPassword })
      .then(response => {
        if (response.data.type === 'success') {
          alert('비밀번호 변경에 성공하셨습니다.');
        } else {
          alert('비밀번호 변경에 실패하셨습니다.');
        }
      });
  };

  return (
    <Wrapper>
      <TitleFont>비밀번호 변경</TitleFont>
      <LabelFont>현재 비밀번호</LabelFont>
      <DataInput
        value={curPassword}
        onChange={e => setCurPassword(e.target.value)}
        type="password"
      ></DataInput>
      <LabelFont>변경할 비밀번호</LabelFont>
      <DataInput
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        type="password"
      ></DataInput>
      <LabelFont>변경할 비밀번호 확인</LabelFont>
      <DataInput
        value={newPassword2}
        onChange={e => checkNewPassword(e)}
        type="password"
      ></DataInput>
      <ErrorText color={invalid ? `blue` : `red`}>{message}</ErrorText>
      <SaveButton
        type={0}
        color={colors.bsColor4}
        id="contentFont"
        onClick={() => changePassword()}
      >
        변경하기
      </SaveButton>
    </Wrapper>
  );
};

export default PasswordChange;
