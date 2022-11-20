import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const TagBox = styled.div`
  display: flex;
`;

const Select = styled.select`
  padding-left: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 16px;
  border-radius: 5px;
  margin-right: 5.5%;
  width: 300px;
  option {
  }
`;

const EachTitle = styled.h3`
  width: 100px;
  margin-left: 40px;
`;

const DateBox = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

const DateSelectBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-left: 30px;
  margin-right: 15px;
`;

const MyNoticeDate = ({ getDateData, li, index, setDateDataee }) => {
  const [dateData, setDateData] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');

  

  useEffect(() => {
    setDateDataee(index, {
      scheduleName: dateData.scheduleName,
      scheduleDate: dateData.scheduleDate,
    });
  }, [dateData]);

  // 할일 명 변경
  const handleScheduleName = e => {
    setDateData({ ...dateData, scheduleName: e.target.value });
    getDateData(dateData);
  };

  // 할일 날짜 변경

  const handleScheduleDate = e => {
    setScheduleDate(e);
    setDateData({
      ...dateData,
      scheduleDate: dayjs(e).format('YYYY-MM-DD hh:mm:ss'),
      index: li.index,
    });
  };

  return (
    <TagBox>
      <Select
        id="titleFont"
        onChange={handleScheduleName}
        defaultValue="일정을 선택하세요"
      >
        <option  disabled hidden>일정을 선택하세요</option>
        <option id="titleFont" value="서류제출">
          서류제출
        </option>
        <option id="titleFont" value="서류발표">
          서류발표
        </option>
        <option id="titleFont" value="코딩테스트">
          코딩테스트
        </option>
        <option id="titleFont" value="코딩테스트발표">
          코딩테스트발표
        </option>
        <option id="titleFont" value="1차면접">
          1차면접
        </option>
        <option id="titleFont" value="1차면접발표">
          1차면접발표
        </option>
        <option id="titleFont" value="2차면접">
          2차면접
        </option>
        <option id="titleFont" value="2차면접발표">
          2차면접발표
        </option>
        <option id="titleFont" value="최종발표">
          최종발표
        </option>
        <option id="titleFont" value="기타">
          기타
        </option>
      </Select>

      <DateBox id="titleFont">
        <EachTitle>해당일</EachTitle>
        <DateSelectBox>
          
          <DatePicker
            style={{ 'z-index': 999, backgroundColor: 'red' }}
            placeholderText="날짜를 선택해 주세요."
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            autoComplete="off"
            id="contentFont"
            onChange={handleScheduleDate}
            selected={scheduleDate}
          ></DatePicker>
          
        </DateSelectBox>
      </DateBox>
    </TagBox>
  );
};

export default MyNoticeDate;
