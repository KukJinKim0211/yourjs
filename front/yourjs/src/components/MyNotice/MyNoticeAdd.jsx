import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MyNoticeAddcomponent from './MyNoticeAddcomponent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import MyNoticeDate from './MyNoticeDate';

const Wrapper = styled.div`
  width: 60%;
  height: 100%;
`;

//제목
const TitleBox = styled.div`
  display: flex;
  align-items: center;
`;
//회사 div
const CompanyBox = styled.div`
  display: flex;
  height: 50px;
`;

const CompanyInput = styled.input`
  border: none;

  width: inherit;
  border-bottom: 3px solid gray;
  margin-top: 10px;
  margin-left: 30px;
  :focus {
    outline: none;
  }
`;

//상태 div
const StateBox = styled.div`
  display: flex;
  height: 50px;
`;



const StateSelect = styled.select`
  border: none;

  width: inherit;
  border-bottom: 3px solid gray;
  margin-top: 10px;
  margin-left: 30px;
  option {
    
  }
`;
//url 입력 div
const UrlBox = styled.div`
  display: flex;
  height: 50px;
`;

const UrlInput = styled.input`
  border: none;

  width: 12%;
  border-bottom: 3px solid gray;
  margin-top: 10px;
  margin-left: 30px;
  :focus {
    outline: none;
  }
`;
// date 입력 div
const DateBox = styled.div`
  
  width : 40%;
  
`;

const DateTitle = styled.div`
  
  font-size: 1.17em;
  font-weight: 700;
`

const DateSelectBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
`;

const ComponentAddButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: antiquewhite;
  border-radius: 10px;
  border: none;
  box-shadow: 0.5rem 0.5rem 0.5rem gray;
  cursor: pointer;
  font-weight: 700;
`;

const SaveCancelButton = styled.button`
  background-color: ${props => props.backgroundColor};
  margin-left: ${props => props.marginLeft};
  border: none;
  box-shadow: 0.5rem 0.5rem 0.5rem gray;
  width: 10%;
  height: 30px;
  cursor: pointer;
  margin-bottom: 10%;
`;
let countList = 1;
let countDate = 1;
const MyNoticeAdd = () => {
  
  const [list, setList] = useState(['']);
  const [dateList , setDateList] = useState(['']) // 일정 등록 컴포넌트 생성을 위한 list

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const onClick = () => {
    // 수정 필요 ( 자식 값 안가져옴 - > 헛짓중 )
    const a = [...list];
    
    a.unshift({ index: countList,  });
    
    countList = countList +1 ;
    

    setList(a);
  };


  const handleDateClick = () => {
    const b = [...dateList];
    b.unshift({index : countDate});
    countDate = countDate + 1
    setDateList(b)
    console.log("123123")
    }

  return (
    <Wrapper>
      <br></br>
      <TitleBox>
        <h1 style={{ width: '70%' }}>내 공고 등록</h1>
      </TitleBox>

      <br></br>
      <br></br>

      <CompanyBox id="titleFont">
        <h3>회사명</h3>
        <CompanyInput
          id="titleFont"
          placeholder="회사를 입력해 주세요"
        ></CompanyInput>
      </CompanyBox>
      <br></br>
      <StateBox id="titleFont">
        <h3>결과를 선택하세요 </h3>
        <StateSelect id="titleFont" defaultValue="진행중">
          <option id="titleFont" value="진행중">
            진행중
          </option>
          <option id="titleFont" value="서류탈락">
            서류탈락
          </option>
          <option id="titleFont" value="면접탈락">
            면접탈락
          </option>
          <option id="titleFont" value="최종합격">
            최종합격
          </option>
        </StateSelect>
      </StateBox>
      <br></br>
      <UrlBox id="titleFont">
        <h3>채용사이트</h3>
        <UrlInput placeholder="URL을 입력하세요"></UrlInput>
      </UrlBox>
      <br></br>
      <DateBox id="titleFont">
        
        <DateTitle>일정 등록</DateTitle>
        <button style={{marginLeft: "83%"}} onClick={handleDateClick}>➕</button>
        {dateList.map((li, index) => (
        <MyNoticeDate key={index}></MyNoticeDate>
      ))}
        

      </DateBox>
      <br></br>

      {/* <DateBox id="titleFont">
        <h3>시작일</h3>
        <DateSelectBox>
          <DatePicker
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            autoComplete='off'
            id="contentFont"
            onChange={date => setStartDate(date)}
            selected={startDate}
          ></DatePicker>
        </DateSelectBox>

          <h3>마감일</h3>
          <DateSelectBox>
          <DatePicker
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            autoComplete='off'
            id="contentFont"
            onChange={date => setEndDate(date)}
            selected={endDate}
          ></DatePicker>
        </DateSelectBox>
      </DateBox> */}

      <br></br>
      <br></br>

      <div id="box"></div>
      {list.map((li, index) => (
        <MyNoticeAddcomponent key={index}></MyNoticeAddcomponent>
      ))}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '20px',
        }}
      >
        <ComponentAddButton onClick={onClick}>항목추가</ComponentAddButton>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SaveCancelButton id="contentFont" backgroundColor="#81C6E8">
          저장
        </SaveCancelButton>{' '}
        <SaveCancelButton
          id="contentFont"
          backgroundColor="#FF6464"
          marginLeft="30px"
        >
          취소
        </SaveCancelButton>
      </div>
    </Wrapper>
  );
};

export default MyNoticeAdd;
