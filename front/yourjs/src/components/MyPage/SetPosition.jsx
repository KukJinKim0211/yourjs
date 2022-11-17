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
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

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

const ContentFont = styled.p`
  font-size: 22px;
  text-align: center;
`;

const FavorDiv = styled.div`
  width: 94%;
  height: 30%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const PositionDiv = styled.div`
  width: 32%;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.selected ? '#4aa8d8' : 'rgba(0, 0, 0, 0.1)'};
  color: ${props => (props.selected ? 'white' : 'black')};
  margin: 5px 5px;
  cursor: pointer;
  border-radius: 15px;
  &:hover {
    background-color: #4aa8d8;
    color: white;
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

const ButtonDiv = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  margin: 10px 0px;
  margin-bottom: 30px;
`;

const SetPosition = () => {
  const [nickname, setNickname] = useState('');
  const [userPosition, setUserPosition] = useState('');
  const [totalPosition, setTotalPosition] = useState([]);
  const [newPosition, setNewPosition] = useState('');

  // 1: 관심포지션 미등록  2 : 관심포지션 등록
  const [positionInvalid, setPositionInvalid] = useState(0);
  // 현재 유저의 관심 포지션을 조회한다
  const getUserPosition = () => {
    axiosInstance.get(apis.userSubject).then(response => {
      console.log(response.data);
      if (response.status === 200 && response.data.length === 0) {
        setPositionInvalid(1);
      } else if (response.status === 200 && response.data.length > 0) {
        setNickname(response.data[0].user.nickname);
        setUserPosition(response.data[0].subject);
        setPositionInvalid(2);
      }
    });
  };

  // 전체 포지션을 조회한다
  const getTotalPosition = () => {
    axiosInstance
      .get(apis.subject)
      .then(response => setTotalPosition(response.data));
  };

  useEffect(() => {
    getTotalPosition();
    getUserPosition();
  }, []);

  const setPosition = () => {
    if (newPosition === '') alert('관심 포지션을 선택해 주세요.');

    axiosInstance
      .post(apis.userSubject, { subjectsStr: newPosition })
      .then(response => {
        if (response.status === 200) alert('관심포지션 설정이 완료되었습니다.');
        getUserPosition();
        setNewPosition('');
      });
  };

  return (
    <Wrapper>
      <TitleFont id="contentFont">관심 포지션 설정</TitleFont>
      <ContentFont id="contentFont">
        {positionInvalid === 1 && <>사용자님의 관심 포지션을 등록 해 주세요.</>}
        {positionInvalid === 2 && (
          <>
            <span style={{ color: `${colors.bsColor4}` }}>{nickname}</span>님의
            현재 관심 포지션은{' '}
            <span style={{ color: `${colors.bsColor4}` }}>
              {userPosition.subjectName}
            </span>
            입니다.
          </>
        )}
      </ContentFont>
      <FavorDiv>
        {totalPosition?.map((pos, index) => (
          <PositionDiv
            key={index}
            id="contentFont"
            selected={pos.subjectName === newPosition}
            onClick={e => setNewPosition(e.target.innerText)}
          >
            {pos.subjectName}
          </PositionDiv>
        ))}
      </FavorDiv>
      <ButtonDiv>
        <SaveButton
          type={0}
          color={colors.bsColor4}
          id="contentFont"
          onClick={() => setPosition()}
        >
          변경하기
        </SaveButton>
      </ButtonDiv>
    </Wrapper>
  );
};

export default SetPosition;
