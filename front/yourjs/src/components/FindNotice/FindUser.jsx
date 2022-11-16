import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import { profileImgList } from '../../common/profileImage';
import UserCard from './UserCard';
import { useSelector } from 'react-redux';
import Require from './Require';

const Wrapper = styled.div`
  width: 100%;
`;

const TitleDiv = styled.div`
  width: 100%;
  height: 10%;
`;

const TitleText = styled.p`
  font-size: 28px;
  color: black;
`;

const CardDiv = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

const FindUser = () => {
  const nickname = useSelector(state => state.nickname);
  const [user, setUser] = useState([]);
  const [info, setInfo] = useState(0);

  const getUserData = async () => {
    const { data } = await axiosInstance.get(apis.userSubject);
    // 관심 포지션이 등록되어있지 않을 시
    if (data.lenght === 0) {
      setInfo(2);
      return;
    }
    if (data[0].user.infoLevel === 3 || data[0].user.infoLevel === null) {
      setInfo(2);
      return;
    }
    // 정보 공유 비공개로 되어 있을 시..
    axiosInstance.get(apis.subjectPosition).then(response => {
      console.log(response);
      if (response.status === 200) {
        setUser(response.data);
        setInfo(1);
      }
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Wrapper>
      {info === 1 && (
        <>
          <TitleDiv>
            <TitleText>{nickname}님의 관심분야</TitleText>
          </TitleDiv>
          <CardDiv>
            {user?.map((d, index) => (
              <UserCard key={index} data={d} />
            ))}
          </CardDiv>
        </>
      )}
      {info === 2 && <Require />}
    </Wrapper>
  );
};

export default FindUser;
