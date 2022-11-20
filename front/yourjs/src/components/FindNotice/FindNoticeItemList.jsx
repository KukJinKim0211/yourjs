import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import { profileImgList } from '../../common/profileImage';
import UserCard from './UserCard';

const Wrapper = styled.div`
  width: 100%;
`;

const FindNoticeItemList = () => {
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
      {user?.map(d => (
        <UserCard data={user} />
      ))}
    </Wrapper>
  );
};

export default FindNoticeItemList;
