import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxdepartment} from '../Portfolio/personal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { BoxInput, BoxArea, SaveButton } from './ProjectEditComponent';


const CareerEditComponent = ({}) => {
  const [company, setCompany] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [file, setFile] = useState('');
  const [data, setData] = useState({company: '', department: '', position: '', salary: '', startDate: '', endDate: '', file: ''});

  const onChangeCompanyHandler = e => {
    setCompany(e.target.value);
    setData({ ...data, company: company });
  };

  const onChangeDepartmentHandler = e => {
    setDepartment(e.target.value);
    setData({ ...data, department: department });
  };

  const onChangePositionHandler = e => {
    setPosition(e.target.value);
    setData({ ...data, position: position });
  };

  const onChangeSalaryHandler = e => {
    setSalary(e.target.value);
    setData({ ...data, salary: salary });
  };

  const onChangeFileHandler = e => {
    setFile(e.target.value);
    setData({ ...data, file: file });
  };

  return (
    <Content>
      <LeftBox style={{marginLeft: "2rem"}}>
      <br/>
        <DatePicker
            style ={{"z-index" : 999}}
            placeholderText='시작일'
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            autoComplete="off"
            id="contentFont"
            onChange={date => setStartDate(date)}
            selected={startDate}
        ></DatePicker>
        ~
        <DatePicker
            style ={{"z-index" : 999}}
            placeholderText='종료일'
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            autoComplete="off"
            id="contentFont"
            onChange={date => setEndDate(date)}
            selected={endDate}
        ></DatePicker>
        <br/><br/>
        <SaveButton>추가</SaveButton>
      </LeftBox>
      <CenterBox></CenterBox>
      <RightBoxes>
        <RightBox>
          <RightBoxTitle>회사명</RightBoxTitle>
          <BoxInput 
            value={company}
            onChange={onChangeCompanyHandler}
            placeholder='회사명을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>수상내용</RightBoxTitle>
          <BoxInput 
            value={department}
            onChange={onChangeDepartmentHandler}
            placeholder='부서명을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>수상기관</RightBoxTitle>
          <BoxInput 
            value={position}
            onChange={onChangePositionHandler}
            placeholder='직위를 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>연봉</RightBoxTitle>
          <BoxInput 
            value={salary}
            onChange={onChangeSalaryHandler}
            placeholder='연봉을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>파일</RightBoxTitle>
          <BoxInput 
            value={file}
            onChange={onChangeFileHandler}
            placeholder='파일을 업로드해 주세요'
          ></BoxInput>
        </RightBox>
      </RightBoxes>
    </Content>
  )
}


export default CareerEditComponent;