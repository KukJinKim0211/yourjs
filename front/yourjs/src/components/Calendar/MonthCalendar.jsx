import React from 'react';
import WeekCalendar from './WeekCalendar';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MonthCalendar = ({ monthData }) => {
  return (
    <Wrapper>
      {monthData.map((data, index) => (
        <WeekCalendar key={index} weekData={data} />
      ))}
    </Wrapper>
  );
};

export default MonthCalendar;
