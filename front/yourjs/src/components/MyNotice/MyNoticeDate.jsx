import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { useState } from 'react';


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

const MyNoticeDate = () => {
    const [endDate, setEndDate] = useState('');

  return (
    <TagBox>
        
      <Select>
        <option id="titleFont" value="서류마감">
          서류마감
        </option>
        <option id="titleFont" value="서류발표">
          서류발표
        </option>
        <option id="titleFont" value="코딩테스트">
          코딩테스트
        </option>
        <option id="titleFont" value="1차면접">
          1차면접
        </option>
        <option id="titleFont" value="1차면접발표">
          1차면접발표
        </option>
        <option id="titleFont" value="2차면접">
          2차면접발표
        </option>
        <option id="titleFont" value="2차면접발표">
          2차면접발표
        </option>
        <option id="titleFont" value="최종발표">
          최종발표
        </option>
      </Select>

      <DateBox id="titleFont">
        <h3>해당일</h3>
        <DateSelectBox>
          <DatePicker
            style ={{"z-index" : 999}}
            placeholderText='날짜를 선택해 주세요.'
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            autoComplete="off"
            id="contentFont"
            onChange={date => setEndDate(date)}
            selected={endDate}
          ></DatePicker>
        </DateSelectBox>
      </DateBox>
      
    </TagBox>
  );
};

export default MyNoticeDate;
