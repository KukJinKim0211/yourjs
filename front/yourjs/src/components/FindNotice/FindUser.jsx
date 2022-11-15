import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import { profileImgList } from '../../common/profileImage';
import UserCard from './UserCard';
import { useSelector } from 'react-redux';

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

  const getUserData = () => {
    axiosInstance.get(apis.subjectPosition).then(response => {
      if (response.status === 200) {
        setUser(response.data);
      }
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Wrapper>
      <TitleDiv>
        <TitleText>{nickname}님의 관심분야</TitleText>
      </TitleDiv>
      <CardDiv>
        {user?.map((d, index) => (
          <UserCard key={index} data={d} />
        ))}
      </CardDiv>
    </Wrapper>
  );
};

export default FindUser;
