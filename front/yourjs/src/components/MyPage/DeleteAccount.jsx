// 공개범위설정
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../common/color';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import { useNavigate } from 'react-router-dom';

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

const SaveButton = styled.button`
  width: 200px;
  height: 40px;
  font-size: 18px;
  margin-bottom: 4%;
  background-color: ${props => props.color};
  border: none;
  border-radius: 10px;
  margin-left: 70%;
  cursor: pointer;
  &:hover {
    background-color: ${props =>
      props.type === 0 ? colors.bsColor3 : 'rgba(0, 0, 0, 0.2)'};
  }
`;

const RadioDiv = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  font-size: 18px;
`;

const RadioButton = styled.input`
  background-color: red;
  display: inline;
  margin-right: 20px;
`;

const ContentText = styled.span`
  font-family: 'InfinitySans-RegularA1';
  margin-bottom: 20px;
`;

const DeleteAccount = () => {
  const [infoLevel, setInfoLevel] = useState('0');

  const navigator = useNavigate();

  // 공개 범위 변경
  const deleteAccount = () => {
    axiosInstance.delete(apis.deleteUser).then(response => {
      if (response.status === 200) {
        alert('계정이 삭제되었습니다.');
        navigator('/');
      }
    });
  };
  return (
    <Wrapper>
      <TitleFont id="contentFont">계정 탈퇴</TitleFont>
      <RadioDiv>
        <ContentText>모든 정보가 삭제됩니다.</ContentText>
      </RadioDiv>
      <SaveButton
        type={0}
        color={colors.bsColor4}
        id="contentFont"
        onClick={() => deleteAccount()}
      >
        삭제하기
      </SaveButton>
    </Wrapper>
  );
};

export default DeleteAccount;
