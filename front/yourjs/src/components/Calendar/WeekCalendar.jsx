import React from 'react';
import DayCalendar from './DayCalendar';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

const WeekCalendar = ({
  weekData,
  getNotice,
  searchDate,
  noticeList,
  noticeData,
}) => {
  return (
    <Wrapper>
      {weekData.map((data, index) => (
        <DayCalendar
          key={index}
          dayData={data}
          getNotice={getNotice}
          searchDate={searchDate}
          noticeList={noticeList}
          noticeData={noticeData}
        />
      ))}
    </Wrapper>
  );
};

export default WeekCalendar;
