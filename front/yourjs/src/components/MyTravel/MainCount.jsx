// 메인캘린더>취업여정 컴포넌트

import React, { useState, useEffect } from 'react';
import MainCountItem from './MainCountItem';
import styled from 'styled-components';
import { colors } from '../../common/color';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

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

const countData = [
  { title: '총 지원 횟수', content: '23회', icon: faFolder },
  {
    title: '등록 중 공고',
    content: '4회',
    icon: faFileLines,
  },
  {
    title: '진행 중 공고',
    content: '3회',
    icon: faPenToSquare,
  },
  {
    title: '프로필 관리',
    content: '프로필 보기',
    icon: faAddressCard,
  },
];

const MainCount = () => {
  const nickname = useSelector(state => state.nickname);

  return (
    <Wrapper>
      <TitleDiv>
        <TitleText>
          <span style={{ color: colors.bsColor4 }}>{nickname}</span>
          님의 취업여정이에요.
        </TitleText>
      </TitleDiv>
      <CountItemDiv>
        <MainCountItem data={countData[0]} />
        <div style={{ width: '2%' }} />
        <MainCountItem data={countData[1]} />
        <div style={{ width: '2%' }} />
        <MainCountItem data={countData[2]} />
        <div style={{ width: '2%' }} />
        <MainCountItem data={countData[3]} />
      </CountItemDiv>
    </Wrapper>
  );
};

export default MainCount;
