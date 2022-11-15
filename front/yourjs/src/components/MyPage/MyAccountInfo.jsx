// 내정보보기 컴포넌트
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../common/color';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import { INFO_LEVEL } from '../../common/define';
import Profile00 from '../../img/profile/profile00.png';
import Profile01 from '../../img/profile/profile01.png';
import Profile02 from '../../img/profile/profile02.png';
import Profile03 from '../../img/profile/profile03.png';
import Profile04 from '../../img/profile/profile04.png';
import Profile05 from '../../img/profile/profile05.png';
import Profile06 from '../../img/profile/profile06.png';
import Profile07 from '../../img/profile/profile07.png';
import Profile08 from '../../img/profile/profile08.png';
import Profile09 from '../../img/profile/profile09.png';
import Profile10 from '../../img/profile/profile10.png';
import Profile11 from '../../img/profile/profile11.png';
import Profile12 from '../../img/profile/profile12.png';
import Profile13 from '../../img/profile/profile13.png';
import Profile14 from '../../img/profile/profile14.png';
import Profile15 from '../../img/profile/profile15.png';
import Profile16 from '../../img/profile/profile16.png';
import { profileImgList } from '../../common/profileImage';

const Wrapper = styled.div`
  background-color: ${colors.bsColor0};
  display: flex;
  flex-direction: column;
  padding-left: 5%;
  width: 100%;
`;

const SelectedProfileDiv = styled.div`
  margin-top: 3%;
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
`;

const SelectedImage = styled.img`
  width: 25%;
  border-radius: 50%;
  background-color: white;
  border: 1px solid ${colors.bsColor3};
`;

const TitleFont = styled.p`
  color: black;
  font-size: 24px;
  width: 94%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 15px;
`;

const TitleLabel = styled.p`
  width: 15%;
  color: rgba(0, 0, 0, 0.7);
  font-size: 20px;
  font-family: 'InfinitySans-RegularA1';
`;

const ContentLabel = styled.p`
  width: 20%;
  color: rgba(0, 0, 0, 0.7);
  font-size: 18px;
  font-family: 'InfinitySans-RegularA1';
  padding-top: 4px;
`;

const DataDiv = styled.div`
  width: 100%;
  height: 40px;
  margin-bottom: 3%;
  display: flex;
  justify-content: center;
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
      <TitleFont id="contentFont">내정보보기</TitleFont>
      <SelectedProfileDiv>
        <SelectedImage
          src={
            data.userImg === '-1' || data.userImg === null
              ? Profile00
              : profileImgList[parseInt(data.userImg)]
          }
        />
      </SelectedProfileDiv>
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
      <DataDiv></DataDiv>
    </Wrapper>
  );
};

export default MyAccountInfo;
