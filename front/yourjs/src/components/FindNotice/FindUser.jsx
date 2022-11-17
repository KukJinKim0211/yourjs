import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import { profileImgList } from '../../common/profileImage';
import UserCard from './UserCard';
import { useSelector } from 'react-redux';
import Require from './Require';
import { areIntervalsOverlapping } from 'date-fns/esm';
import Sorry from '../../img/sorry.png';

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

const ErrorDiv = styled.div`
  width: 100%;
  margin-top: 10%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ErrorText = styled.p`
  font-size: 22px;
`;

const TitleSpan = styled.span`
  color: ${props => props.color};
`;

const Image = styled.img`
  width: 40%;
  height: 40%;
`;

const FindUser = () => {
  const nickname = useSelector(state => state.nickname);
  const [user, setUser] = useState([]);
  // 1: 정상데이터  2 : 관심포지션 미등록/정보공개 미허용  3 : 관심포지션에 등록된 사람이 없음
  const [info, setInfo] = useState(0);

  const getUserData = async () => {
    const { data } = await axiosInstance.get(apis.userSubject);
    console.log(data);
    // 관심 포지션이 등록되어있지 않을 시
    if (data.length === 0) {
      setInfo(2);
      return;
    }

    if (data[0].user.infoLevel === 3 || data[0].user.infoLevel === null) {
      setInfo(2);
      return;
    }

    axiosInstance.get(apis.subjectPosition).then(response => {
      if (response.status === 200) {
        if (response.data.length === 0) {
          setInfo(3);
          return;
        }
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
      {info === 3 && (
        <ErrorDiv>
          <Image src={Sorry} />
          <ErrorText id="titleFont">
            관심 포지션에 등록되어 있는 사람이 없습니다.
          </ErrorText>
        </ErrorDiv>
      )}
    </Wrapper>
  );
};

export default FindUser;
