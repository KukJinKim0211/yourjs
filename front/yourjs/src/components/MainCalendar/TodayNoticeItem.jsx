// 오늘 마감 공고/오늘 발표 공고 > item

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 90%;
  height: 30px;
  margin-left: 5%;
  display: flex;
  cursor: pointer;
  &:hover {
    border-bottom: 1px solid black;
  }
`;

const TitleDiv = styled.div`
  width: 50%;
  height: 30px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

const DateDiv = styled.div`
  width: 50%;
  height: 30px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

const ContentText = styled.p`
  font-size: 14px;
`;

const TodayNoticeItem = ({ content, type }) => {
  const [time, setTime] = useState('');

  // 지원마감시간
  useEffect(() => {
    if (type === 2) return;
    const getTime = setInterval(() => {
      const date = new Date();
      const currentTime = `${date.getFullYear()}-${
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1
      }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()} ${
        date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      }:${
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      }:${
        date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      }`;
      const currTime = new Date(currentTime);
      const timeData = new Date(content.date);
      const during = timeData - currTime;
      const hour = Math.floor(
        (during % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minute = Math.floor((during % (1000 * 60 * 60)) / (1000 * 60));
      const second = Math.floor((during % (1000 * 60)) / 1000);

      // 2022-10-10 20:20:20
      var stDate = new Date(
        currentTime.substring(0, 4),
        currentTime.substring(5, 7),
        currentTime.substring(8, 10),
      );
      var endDate = new Date(
        content.date.substring(0, 4),
        content.date.substring(5, 7),
        content.date.substring(8, 10),
      );
      var btMs = endDate.getTime() - stDate.getTime();
      var btDay = btMs / (1000 * 60 * 60 * 24);
      console.log(btDay);
      setTime(
        `${btDay}일 ${hour < 10 ? '0' + hour : hour}:${
          minute < 10 ? '0' + minute : minute
        }:${second < 10 ? '0' + second : second}`,
      );
    }, 1000);
    return () => clearInterval(getTime);
  }, []);

  return (
    <Wrapper>
      <TitleDiv>
        <ContentText>
          <span style={{ fontWeight: '600' }} id="contentFont">
            {content.company}
          </span>
        </ContentText>
      </TitleDiv>
      <DateDiv>
        {type === 1 && (
          <ContentText>
            <span id="contentFont">
              <span style={{ fontWeight: '600' }}>지원마감</span>까지 {time}
            </span>
          </ContentText>
        )}
      </DateDiv>
    </Wrapper>
  );
};

export default TodayNoticeItem;
