// 내정보보기 컴포넌트
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../common/color';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import { INFO_LEVEL } from '../../common/define';

const Wrapper = styled.div`
  background-color: ${colors.bsColor0};
  display: flex;
  flex-direction: column;
  padding-left: 5%;
`;

const TitleFont = styled.p`
  color: black;
  font-size: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 15px;
`;

const TitleLabel = styled.p`
  width: 15%;
  color: rgba(0, 0, 0, 0.7);
  font-size: 20px;
`;

const ContentLabel = styled.p`
  width: 85%;
  color: rgba(0, 0, 0, 0.7);
  font-size: 20px;
`;

const DataDiv = styled.div`
  width: 100%;
  height: 40px;
  margin-bottom: 2%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const MyAccountInfo = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    axiosInstance
      .get(apis.getUserDetailInfo)
      .then(response => setData(response.data));
  }, []);

  return (
    <Wrapper>
      <TitleFont>내정보보기</TitleFont>
      <DataDiv>
        <TitleLabel>이름</TitleLabel>
        <ContentLabel>{data.userName}</ContentLabel>
      </DataDiv>
      <DataDiv>
        <TitleLabel>닉네임</TitleLabel>
        <ContentLabel>{data.nickname}</ContentLabel>
      </DataDiv>
      <DataDiv>
        <TitleLabel>이메일</TitleLabel>
        <ContentLabel>{data.email}</ContentLabel>
      </DataDiv>
      <DataDiv>
        <TitleLabel>공개범위</TitleLabel>
        <ContentLabel>{INFO_LEVEL[data.infoLevel - 1]}</ContentLabel>
      </DataDiv>
    </Wrapper>
  );
};

export default MyAccountInfo;
