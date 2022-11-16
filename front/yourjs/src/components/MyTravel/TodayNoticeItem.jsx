// 오늘 마감 공고/오늘 발표 공고 > item

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../common/color';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Wrapper = styled.div`
  width: 90%;
  height: 35px;
  margin-left: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 2px;
`;

const TotalDiv = styled.div`
  width: 100%;
  height: 90%;
`;

const TitleDiv = styled.div`
  width: ${props => (props.type === 1 ? '50%' : '70%')};
  height: 30px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.7);
`;

const DateDiv = styled.div`
  width: ${props => (props.type === 1 ? '50%' : '30%')};
  height: 30px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.6);
`;

const TitleText = styled.p`
  font-weight: 700;
  &:hover {
    border-bottom: 1px solid ${colors.bsColor4};
  }
`;

const ContentText = styled.p`
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TodayNoticeItem = ({ content, type }) => {
  const [time, setTime] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 지원마감시간
  useEffect(() => {
    // if (type === 2) return;
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
      const timeData = new Date(content.scheduleDate);
      const during = timeData - currTime;
      const hour = Math.floor(
        (during % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minute = Math.floor((during % (1000 * 60 * 60)) / (1000 * 60));
      const second = Math.floor((during % (1000 * 60)) / 1000);

      var stDate = new Date(
        currentTime.substring(0, 4),
        currentTime.substring(5, 7),
        currentTime.substring(8, 10),
      );
      var endDate = new Date(
        content.scheduleDate.substring(0, 4),
        content.scheduleDate.substring(5, 7),
        content.scheduleDate.substring(8, 10),
      );
      var btMs = endDate.getTime() - stDate.getTime();
      var btDay = btMs / (1000 * 60 * 60 * 24);
      setTime(
        `${btDay}일 ${hour < 10 ? '0' + hour : hour}:${
          minute < 10 ? '0' + minute : minute
        }:${second < 10 ? '0' + second : second}`,
      );
    }, 1000);
    return () => clearInterval(getTime);
  }, []);

  const noticeClicked = () => {
    dispatch({ type: 'selected', select: 2 });
    sessionStorage.setItem('selectItem', 2);
    navigate('/notice/detail', {
      state: {
        noticeSeq: content.noticeSeq,
      },
    });
  };

  return (
    <Wrapper onClick={() => noticeClicked()}>
      <TotalDiv
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TitleDiv type={type}>
          {type === 1 && (
            <TitleText id="contentFont">{content.coName}</TitleText>
          )}
          {type === 2 && (
            <TitleText id="contentFont">
              {content.coName}-{content.scheduleName}
            </TitleText>
          )}
        </TitleDiv>
        <DateDiv type={type}>
          {type === 1 && (
            <ContentText>
              <span id="contentFont">지원마감까지 {time}</span>
            </ContentText>
          )}
          {type === 2 && (
            <ContentText>
              <span id="contentFont">{time}</span>
            </ContentText>
          )}
        </DateDiv>
      </TotalDiv>
    </Wrapper>
  );
};

export default TodayNoticeItem;
