import React, { useState, useEffect } from 'react';
import { subMonths, addMonths, startOfMonth, endOfMonth } from 'date-fns';
import MonthCalendar from '../components/Calendar/MonthCalendar';
import styled from 'styled-components';
import { fullWidth } from '../common/size';

const Wrapper = styled.div`
  width: ${fullWidth};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Calendar = () => {
  // 현재 달력 상태 관리
  const [searchDate, setSearchDate] = useState(new Date());
  // 서버에서 응답받은 공고 데이터 상태 관리
  const [monthMenu, setMonthMenu] = useState([]);

  useEffect(() => {
    dataSetting('');
  }, []);

  // 하위 컴포넌트로 보낼 데이터 포매팅
  const dataSetting = data => {
    const array = [];
    let idIdx = 1;
    let dayIdx = 1;

    // 현재 달에서 1일이 되는 인덱스를 가져옴 0:일 1:월 2:화 3:수 4:목 5:금 6:토
    const startDay = startOfMonth(searchDate).getDay();
    // 현재 달에서 마지막날짜를 가져옴
    const endDay = endOfMonth(searchDate).getDate();

    // 주 기준으로 배열 관리
    for (let i = 0; i < (startDay + endDay) / 7; i++) {
      const week = [];
      // 하루 기준으로 객체 관리
      for (let j = 0; j < 7; j++) {
        const day = idIdx > startDay ? (dayIdx <= endDay ? dayIdx++ : 0) : 0;
        // const filteredData = data.filter(item => {
        //   return parseInt(item.meal_date.split('-')[2]) === day;
        // });
        const obj = {
          id: idIdx,
          day: day,
          // meal:
          //   filteredData[0] === undefined ? [] : filteredData[0].meal_content,
          // snack:
          //   filteredData[0] === undefined ? [] : filteredData[0].snack_content,
          // meal_no: filteredData[0] === undefined ? 0 : filteredData[0].meal_no,
        };
        idIdx++;
        week.push(obj);
      }
      array.push(week);
    }

    setMonthMenu(monthMenu => array);
  };
  return (
    <Wrapper>
      <MonthCalendar monthData={monthMenu}></MonthCalendar>
    </Wrapper>
  );
};

export default Calendar;
