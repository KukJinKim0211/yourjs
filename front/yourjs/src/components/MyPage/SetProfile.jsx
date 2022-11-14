import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
import { colors } from '../../common/color';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import { profileImgList } from '../../common/profileImage';

const Wrapper = styled.div`
  background-color: ${colors.bsColor0};
  width: 100%;
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

const ProfileDiv = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

const ProfileImageDiv = styled.div`
  width: 90px;
  height: 90px;
  margin-left: 12px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  background-color: white;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  user-select: none;
  &:hover {
    border: 3px solid ${colors.bsColor4};
  }
`;

const SelectedProfileDiv = styled.div`
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

const ButtonDiv = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  margin: 10px 0px;
`;

const SetProfile = () => {
  const [selectImage, setSelectImage] = useState(-1);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const getUserProfile = () => {
    axiosInstance.get(apis.getUserDetailInfo).then(response => {
      response.data.userImg === null
        ? setSelectImage('-1')
        : setSelectImage(response.data.userImg);
      setNickname(response.data.nickname);
      setEmail(response.data.email);
    });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const setUserProfile = () => {
    axiosInstance
      .patch(apis.infoChange, {
        nickname,
        email,
        userImg: selectImage,
      })
      .then(response => alert('프로필 사진 변경이 완료되었습니다.'));
  };

  return (
    <Wrapper>
      <TitleFont>프로필사진 설정</TitleFont>
      <SelectedProfileDiv>
        <SelectedImage
          src={selectImage === '-1' ? Profile00 : profileImgList[selectImage]}
        />
      </SelectedProfileDiv>
      <ButtonDiv>
        <SaveButton
          type={0}
          color={colors.bsColor4}
          id="contentFont"
          onClick={() => setUserProfile()}
        >
          변경하기
        </SaveButton>
      </ButtonDiv>
      <ProfileDiv>
        {profileImgList.map((img, index) => (
          <ProfileImageDiv
            key={index}
            onClick={() => setSelectImage(index.toString())}
          >
            <ProfileImage src={img} />
          </ProfileImageDiv>
        ))}
      </ProfileDiv>
    </Wrapper>
  );
};

export default SetProfile;
