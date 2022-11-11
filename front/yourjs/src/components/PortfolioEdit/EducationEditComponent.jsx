import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr,
  ChangeButton, DelButton, customStyles, ModalForm, ModalTitle, ModalContent, ModalContentDate, InsertBtnDiv, InsertBtn,
  BoxInput, BoxArea, SaveButton, Essential, EssentialDate} from '../../common/PorfoStyled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';


const EducationEditComponent = ({}) => {
  const [schoolName, setSchoolName] = useState('');
  const [location, setLocation] = useState('');
  const [totAvgCredit, setTotAvgCredit] = useState('');
  const [majorAvgCredit, setMajorAvgCredit] = useState('');
  const [totCredit, setTotCredit] = useState('');
  const [majorCredit, setMajorCredit] = useState('');
  const [majorName, setMajorName] = useState('');
  const [doubleMajorName, setDoubleMajorName] = useState('');
  const [subMajorName, setSubMajorName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [file, setFile] = useState('');
  const [data, setData] = useState(
    {
      schoolName: "",
      location: "",
      totAvgCredit: "",
      majorAvgCredit: "",
      totCredit: "",
      majorCredit: "",
      majorName: "",
      doubleMajorName: "",
      subMajorName: "",
      startDate: "",
      endDate: "",
      file: ''
    });

  const onChangeSchoolNameHandler = e => {
    setSchoolName(e.target.value);
    setData({ ...data, schoolName: schoolName });
  };

  const onChangeLocationHandler = e => {
    setLocation(e.target.value);
    setData({ ...data, location: location });
  };

  const onChangeTotAvgCreditHandler = e => {
    setTotAvgCredit(e.target.value);
    setData({ ...data, totAvgCredit: totAvgCredit });
  };

  const onChangeMajorAvgCreditHandler = e => {
    setMajorAvgCredit(e.target.value);
    setData({ ...data, majorAvgCredit: majorAvgCredit });
  };

  const onChangeTotCreditHandler = e => {
    setTotCredit(e.target.value);
    setData({ ...data, totCredit: totCredit });
  };

  const onChangeMajorCreditHandler = e => {
    setMajorCredit(e.target.value);
    setData({ ...data, majorCredit: majorCredit });
  };

  const onChangeMajorNameHandler = e => {
    setMajorName(e.target.value);
    setData({ ...data, majorName: majorName });
  };

  const onChangeDoubleMajorNameHandler = e => {
    setDoubleMajorName(e.target.value);
    setData({ ...data, doubleMajorName: doubleMajorName });
  };

  const onChangeSubMajorNameHandler = e => {
    setSubMajorName(e.target.value);
    setData({ ...data, subMajorName: subMajorName });
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
          <RightBoxTitle>학교명</RightBoxTitle>
          <BoxInput 
            value={schoolName}
            onChange={onChangeSchoolNameHandler}
            placeholder='학교명을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>지역</RightBoxTitle>
          <BoxInput 
            value={location}
            onChange={onChangeLocationHandler}
            placeholder='지역을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>전공</RightBoxTitle>
          <BoxInput 
            value={majorName}
            onChange={onChangeMajorNameHandler}
            placeholder='전공을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>복수전공</RightBoxTitle>
          <BoxInput 
            value={doubleMajorName}
            onChange={onChangeDoubleMajorNameHandler}
            placeholder='복수전공을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>부전공</RightBoxTitle>
          <BoxInput 
            value={subMajorName}
            onChange={onChangeSubMajorNameHandler}
            placeholder='부전공을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>전공 이수학점</RightBoxTitle>
          <BoxInput 
            value={majorCredit}
            onChange={onChangeMajorCreditHandler}
            placeholder='전공 이수학점을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>총 이수학점</RightBoxTitle>
          <BoxInput 
            value={totCredit}
            onChange={onChangeTotCreditHandler}
            placeholder='총 이수학점을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>전공 평점</RightBoxTitle>
          <BoxInput 
            value={majorAvgCredit}
            onChange={onChangeMajorAvgCreditHandler}
            placeholder='전공 평점을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>총 평점</RightBoxTitle>
          <BoxInput 
            value={totAvgCredit}
            onChange={onChangeTotAvgCreditHandler}
            placeholder='총 평점을 입력해 주세요'
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


export default EducationEditComponent;