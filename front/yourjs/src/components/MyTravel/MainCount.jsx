// 메인캘린더>취업여정 컴포넌트

import React, { useState, useEffect } from 'react';
import MainCountItem from './MainCountItem';
import styled from 'styled-components';
import { colors } from '../../common/color';
import {
  faFolder,
  faFileLines,
  faPenToSquare,
  faAddressCard,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';

const Wrapper = styled.div`
  width: 100%;
  min-width: 500;
  height: 190px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;

const TitleDiv = styled.div`
  width: 100%;
  height: 50%;
`;

const TitleText = styled.p`
  font-size: 26px;
  font-weight: 600;
`;

const CountItemDiv = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
`;

const titleData = [
  '총 지원 횟수',
  '등록 중 공고',
  '진행 중 공고',
  '프로필 관리',
];

const MainCount = () => {
  const [countData, setCountData] = useState([
    {
      title: '총 지원 횟수',
      content: 0,
      icon: faFolder,
    },
    {
      title: '등록 중 공고',
      content: 0,
      icon: faFileLines,
    },
    {
      title: '진행 중 공고',
      content: 0,
      icon: faPenToSquare,
    },
    {
      title: '프로필 관리',
      content: '프로필 관리',
      icon: faAddressCard,
    },
  ]);
  const nick = useSelector(state => state.nickname);
  const [nickname, setNickname] = useState(
    sessionStorage.getItem('nickname') === null
      ? nick
      : sessionStorage.getItem('nickname'),
  );

  const getNotice = () => {
    axiosInstance.get(apis.notice).then(response => {
      if (response.status === 200) {
        let i1 = 4;
        let i2 = 0;
        const newArray = [...countData];
        response.data.forEach(d => {
          if (d.progress === '등록') {
            i1++;
          }

          if (d.profress === '진행중') {
            i2++;
          }
        });

        // 총 지원 횟수
        newArray[0].content = response.data.length;
        // 등록 중 공고
        newArray[1].content = i1;
        // 진행 중 공고
        newArray[2].content = i2;
        setCountData(newArray);
      }
    });
  };
  useEffect(() => {
    getNotice();
  }, []);

  return (
    <Wrapper>
      <TitleDiv>
        <TitleText>
          <span style={{ color: colors.bsColor4 }}>{nickname}</span>
          님의 취업여정이에요.
        </TitleText>
      </TitleDiv>
      <CountItemDiv>
        <MainCountItem data={countData[0]} type={0} />
        <div style={{ width: '2%' }} />
        <MainCountItem data={countData[1]} type={1} />
        <div style={{ width: '2%' }} />
        <MainCountItem data={countData[2]} type={2} />
        <div style={{ width: '2%' }} />
        <MainCountItem data={countData[3]} type={3} />
      </CountItemDiv>
    </Wrapper>
  );
};

export default MainCount;
