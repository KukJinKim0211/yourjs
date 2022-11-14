import React from 'react';
import { useState } from 'react';
import {Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle,
  BoxInput, SaveButton, Essential, EssentialDate} from '../../common/PorfoStyled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';


const CareerEditComponent = ({getServerData}) => {
  const [company, setCompany] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState({company: '', department: '', position: '', salary: '', startDate: '', endDate: ''});

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

  const addButtonClicked = () => {
    const data = {
      company: company === "" ? null : company,
      startDate: startDate === "" ? null : startDate,
      endDate,
      department: department === "" ? null : department,
      position: position === "" ? null : position,
      salary,
    }
    if (data.company === null || data.startDate === null || data.department === null || data.position === null) {
      alert("필수값을 입력해 주세요.")
    } else {
    axiosInstance
      .post(apis.career, data)
      .then(response => {
        if (response.status === 200) {
          getServerData()
          setCompany('')
          setDepartment('')
          setPosition('')
          setSalary('')
          setStartDate('')
          setEndDate('')
        }
      })
      .catch(error => console.log(error));}
  };

  return (
    <Content>
      <LeftBox style={{marginLeft: "2rem"}}>
        <br/>
        <LeftBoxTitle>시작일<EssentialDate>(*)</EssentialDate>{"\u00A0"}{"\u00A0"}~{"\u00A0"}{"\u00A0"}종료일</LeftBoxTitle>
        <LeftBoxContent>
        <DatePicker
            style ={{"z-index" : 999}}
            placeholderText='시작일'
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            autoComplete="off"
            id="contentFont"
            onChange={date => setStartDate(date)}
            selected={startDate}
        ></DatePicker></LeftBoxContent>
        ~<LeftBoxContent>
        <DatePicker
            style ={{"z-index" : 999}}
            placeholderText='종료일'
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            autoComplete="off"
            id="contentFont"
            onChange={date => setEndDate(date)}
            selected={endDate}
        ></DatePicker></LeftBoxContent>
        <br/><br/>
        <SaveButton
          onClick={addButtonClicked}
        >추가</SaveButton>
      </LeftBox>
      <CenterBox></CenterBox>
      <RightBoxes>
        <RightBox>
          <RightBoxTitle>회사명 <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={company}
            onChange={onChangeCompanyHandler}
            placeholder='회사명을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>부서명 <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={department}
            onChange={onChangeDepartmentHandler}
            placeholder='부서명을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>직위 <Essential>(*)</Essential></RightBoxTitle>
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
            placeholder='연봉을 숫자로 입력해 주세요'
          ></BoxInput>
        </RightBox>
      </RightBoxes>
    </Content>
  )
}


export default CareerEditComponent;