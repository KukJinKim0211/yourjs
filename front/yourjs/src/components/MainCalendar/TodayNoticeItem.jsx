// 오늘 마감 공고/오늘 발표 공고 > item

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 90%;
  height: 40px;
  margin-left: 5%;
  display: flex;
  cursor: pointer;
  &:hover {
    border: 1px solid black;
  }
`;

const TitleDiv = styled.div`
  width: 80%;
  height: 40px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

const DateDiv = styled.div`
  width: 20%;
  height: 40px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

const ContentText = styled.p`
  font-size: 16px;
`;

const TodayNoticeItem = ({ content }) => {
  return (
    <Wrapper>
      <TitleDiv>
        <ContentText>{content.company}</ContentText>
      </TitleDiv>
      <DateDiv>
        <ContentText>{`~${content.date.substring(5, 10)}`}</ContentText>
      </DateDiv>
    </Wrapper>
  );
};

export default TodayNoticeItem;
