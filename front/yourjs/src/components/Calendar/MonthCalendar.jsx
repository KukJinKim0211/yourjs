import React from 'react';
import WeekCalendar from './WeekCalendar';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MonthCalendar = ({
  monthData,
  getNotice,
  searchDate,
  noticeList,
  noticeData,
  guest,
}) => {
  return (
    <Wrapper>
      {monthData.map((data, index) => (
        <WeekCalendar
          key={index}
          weekData={data}
          getNotice={getNotice}
          searchDate={searchDate}
          noticeList={noticeList}
          noticeData={noticeData}
          guest={guest}
        />
      ))}
    </Wrapper>
  );
};

export default MonthCalendar;
