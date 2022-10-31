// 메인 캘린더 > 오늘 마감 공고, 오늘 발표 공고

import React from 'react';
import styled from 'styled-components';
import TodayNoticeItem from './TodayNoticeItem';
import { colors } from '../../common/color';

const Wrapper = styled.div`
  width: 33%;
  height: 100%;
  background-color: ${colors.bsColor1};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;

const TitleDiv = styled.div`
  width: 100%;
  height: 25%;
`;

const ContentDiv = styled.div`
  width: 100%;
  height: 75%;
`;

const TitleText = styled.p`
  font-size: 20px;
  margin-top: 2%;
  margin-left: 5%;
  color: ${colors.bsColor4};
  user-select: none;
  font-weight: 600;
`;

const TodayNotice = ({ data }) => {
  return (
    <Wrapper>
      <TitleDiv>
        <TitleText>{data.title}</TitleText>
      </TitleDiv>
      <ContentDiv>
        {data.content.map((content, index) => (
          <TodayNoticeItem key={index} content={content} />
        ))}
      </ContentDiv>
    </Wrapper>
  );
};

export default TodayNotice;
