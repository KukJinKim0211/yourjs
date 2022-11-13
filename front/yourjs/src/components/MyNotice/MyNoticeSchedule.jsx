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
  border: none;
  margin-right: 10%;
  width: inherit;
  /* border-bottom: 3px solid gray; */
  margin-left: 6%;
  option {
  }
`;

const DateBox = styled.div`
  display: flex;
`;

const DateSelectBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 50px;
  margin-right: 15px;
`;

const MyNoticeSchedule = ({ getDateData,setDateDataee,index ,pushData}) => {
  const [endDate, setEndDate] = useState('');
  const [dateData, setDateData] = useState('');
  const [scheduleName, setScheduleName] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');


  

  // console.log(pushData.scheduleName,"오이야호")
//   useEffect(() => {
//     setDateDataee(index, {
//       scheduleName: dateData.scheduleName,
//       scheduleDate: dateData.scheduleDate,
//     });
//   }, [dateData]);

  // 할일 명 변경

  useEffect(() => {
    if (dateData.length !== 0) {
    setDateDataee(index, {
      scheduleName: dateData.scheduleName,
      scheduleDate: dateData.scheduleDate,
    });}
    
  }, [scheduleDate]);

  const handleScheduleName = e => {

    
    setDateData({ ...dateData, scheduleName: e.target.value });
    
    
  };

  // 할일 날짜 변경

  const handleScheduleDate = e => {
    setScheduleDate(e);
    setDateData({
      ...dateData,
      scheduleDate: dayjs(e).format('YYYY-MM-DD hh:mm:ss'),
      
    });
  };

  return (
    <TagBox>
      <Select onChange={handleScheduleName}
      key={pushData?.scheduleName}
      value={pushData?.scheduleName} >
        
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
        <h5>해당일</h5>
        <DateSelectBox>
          <DatePicker
            style={{ 'z-index': 999 }}
            placeholderText="날짜를 선택해 주세요."
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            autoComplete="off"
            id="contentFont"
            onChange={handleScheduleDate}
            selected={scheduleDate}
            value={pushData.scheduleDate}
          ></DatePicker>
        </DateSelectBox>
      </DateBox>
      
    </TagBox>
  );
};

export default MyNoticeSchedule;
