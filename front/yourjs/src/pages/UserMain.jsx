//MainCalendar
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainCount from '../components/MyTravel/MainCount';
import CurrentTime from '../components/MyTravel/CurrentTime';
import TodayNotice from '../components/MyTravel/TodayNotice';
import RecommendNotice from '../components/MyTravel/RecommendNotice';
import { colors } from '../common/color';
import {
  faHourglassEnd,
  faBell,
  faFileLines,
} from '@fortawesome/free-solid-svg-icons';
import { fullWidth } from '../common/size';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from '../common/customAxios';
import { apis } from '../common/apis';
import { getFullDateFormat } from '../common/date';

const Wrapper = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const MainCountDiv = styled.div`
  width: ${fullWidth};
  height: 200px;
  display: flex;
`;

const TodayDiv = styled.div`
  margin-top: 30px;
  width: ${fullWidth};
  height: 200px;
  display: flex;
`;

const RecommendDiv = styled.div`
  margin-top: 30px;
  width: ${fullWidth};
  height: 270px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  background-color: ${colors.bsColor0};
`;

const RecommendTitleDiv = styled.div`
  margin-top: 2%;
  width: ${fullWidth};
  height: 20%;
  margin-left: 2%;
`;

const RecommendContentDiv = styled.div`
  width: 96%;
  margin-left: 2%;
  margin-right: 2%;
  height: 80%;
`;

const RecommendTitleText = styled.p`
  margin-left: 1%;
  display: inline;
  color: ${colors.bsColor4};
  font-size: 20px;
  font-weight: 600;
`;

const UserMain = () => {
  // 마감 임박 공고
  const [endNotice, setEndNotice] = useState([]);
  // 발표 임박 공고
  const [nextNotice, setNextNotice] = useState([]);
  useEffect(() => {
    getEndNotice();
  }, []);

  // 마감임박 공고 정제
  const getEndNotice = () => {
    // 시간 계산
    const date = getFullDateFormat(new Date());
    // 사용자의 모든 공고를 가져옴
    axiosInstance.get(apis.notice).then(response => {
      if (response.status === 200) {
        const { data } = response;

        const notice1 = [];
        // "서류제출" 일정만을 가져옴
        data.forEach(da =>
          da.schedules.forEach(d => {
            if (d.scheduleName === '서류제출' && d.scheduleDate > date) {
              const newData = {
                coName: da.coName,
                noticeSeq: da.noticeSeq,
                scheduleDate: d.scheduleDate,
              };
              notice1.push(newData);
            }
          }),
        );

        const notice2 = [];
        // 이후의 일정만을 가져옴
        data.forEach(da =>
          da.schedules.forEach(d => {
            if (d.scheduleDate > date) {
              const newData = {
                coName: da.coName,
                noticeSeq: da.noticeSeq,
                scheduleDate: d.scheduleDate,
                scheduleName: d.scheduleName,
              };
              notice2.push(newData);
            }
          }),
        );

        notice1.sort(
          (a, b) => new Date(a.scheduleDate) - new Date(b.scheduleDate),
        );

        notice2.sort(
          (a, b) => new Date(a.scheduleDate) - new Date(b.scheduleDate),
        );

        setEndNotice(notice1.slice(0, 4));
        setNextNotice(notice2.slice(0, 4));
      }
    });
  };

  return (
    <Wrapper>
      <MainCountDiv>
        <MainCount />
      </MainCountDiv>
      <TodayDiv>
        <CurrentTime />
        <div style={{ width: '2%' }} />
        <TodayNotice
          icon={faHourglassEnd}
          title="마감임박공고"
          data={endNotice}
          type={1}
        />
        <div style={{ width: '2%' }} />
        <TodayNotice
          icon={faBell}
          title="다음 일정 보기"
          data={nextNotice}
          type={2}
        />
      </TodayDiv>
      <RecommendDiv>
        <RecommendTitleDiv>
          <FontAwesomeIcon
            icon={faFileLines}
            size="xl"
            className="fa-light"
            style={{ marginLeft: '20px' }}
            color={colors.bsColor4}
          />
          <RecommendTitleText id="titleFont">
            관심 분야의 놓친 공고
          </RecommendTitleText>
        </RecommendTitleDiv>
        <RecommendContentDiv>
          <RecommendNotice />
        </RecommendContentDiv>
      </RecommendDiv>
    </Wrapper>
  );
};

export default UserMain;
