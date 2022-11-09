import React, { useState, useEffect } from 'react';
import { subMonths, addMonths, startOfMonth, endOfMonth } from 'date-fns';
import MonthCalendar from '../components/Calendar/MonthCalendar';
import CalendarSet from '../components/Calendar/CalendarSet';
import styled from 'styled-components';
import { fullWidth } from '../common/size';
import axiosInstance from '../common/customAxios';
import { apis } from '../common/apis';
import { getYYMMFormat } from '../common/date';

const Wrapper = styled.div`
  width: ${fullWidth};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Calendar = () => {
  // 현재 달력 상태 관리
  const [searchDate, setSearchDate] = useState(new Date());
  // 공고 총 데이터
  const [noticeData, setNoticeData] = useState([]);
  // 공고 명 리스트
  const [noticeList, setNoticeList] = useState([]);
  // 서버에서 응답받은 공고 데이터 상태 관리
  const [monthMenu, setMonthMenu] = useState([]);

  const getNotice = () => {
    axiosInstance
      .get(apis.notice)
      .then(response => setNoticeData(response.data));
  };

  useEffect(() => {
    getNotice();
    dataSetting();
  }, []);

  useEffect(() => {
    if (noticeData.length === 0) return;
    dataSetting(noticeData);
    getNoticeList();
  }, [noticeData]);

  const getNoticeList = () => {
    const newArray = [];
    noticeData.forEach(data =>
      newArray.push({
        noticeName: data.noticeName,
        noticeSeq: data.noticeSeq,
        companyName: data.coName,
      }),
    );
    noticeData.forEach(data => console.log(data.noticeSeq));
    setNoticeList(newArray);
  };

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
        // 오늘의 날짜 구하기 YYYY-MM-DD
        const today = `${getYYMMFormat(searchDate, day)}`;
        const scheduleData = [];
        noticeData.forEach(notice => {
          notice.schedules.forEach(sche => {
            if (sche.scheduleDate.slice(0, 10) === today) {
              scheduleData.push({
                ...notice,
                scheduleName: sche.scheduleName,
                scheduleDate: sche.scheduleDate,
              });
            }
          });
        });
        const obj = {
          id: idIdx,
          day: day,
          data: scheduleData,
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
      <CalendarSet searchDate={searchDate} />
      <MonthCalendar
        monthData={monthMenu}
        getNotice={getNotice}
        searchDate={searchDate}
        noticeList={noticeList}
        noticeData={noticeData}
      ></MonthCalendar>
    </Wrapper>
  );
};

export default Calendar;
