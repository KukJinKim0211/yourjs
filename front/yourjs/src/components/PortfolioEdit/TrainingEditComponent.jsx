import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxeduInstitution} from '../Portfolio/personal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { BoxInput, BoxArea, SaveButton } from './ProjectEditComponent';


const TrainingEditComponent = ({}) => {
  const [eduName, setEduName] = useState('');
  const [eduInstitution, setEduInstitution] = useState('');
  const [eduTime, setEduTime] = useState('');
  const [eduContents, setEduContents] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [file, setFile] = useState('');
  const [data, setData] = useState({eduName: '', eduInstitution: '', eduTime: '', eduContents: '', startDate: '', endDate: '', file: ''});

  const onChangeEduNameHandler = e => {
    setEduName(e.target.value);
    setData({ ...data, eduName: eduName });
  };

  const onChangeEduInstitutionHandler = e => {
    setEduInstitution(e.target.value);
    setData({ ...data, eduInstitution: eduInstitution });
  };

  const onChangeEduTimeHandler = e => {
    setEduTime(e.target.value);
    setData({ ...data, eduTime: eduTime });
  };

  const onChangeEduContentsHandler = e => {
    setEduContents(e.target.value);
    setData({ ...data, eduContents: eduContents });
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
          <RightBoxTitle>교육명</RightBoxTitle>
          <BoxInput 
            value={eduName}
            onChange={onChangeEduNameHandler}
            placeholder='교육명을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>주관기관</RightBoxTitle>
          <BoxInput 
            value={eduInstitution}
            onChange={onChangeEduInstitutionHandler}
            placeholder='주관기관을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>교육시간</RightBoxTitle>
          <BoxInput 
            value={eduTime}
            onChange={onChangeEduTimeHandler}
            placeholder='교육시간을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>교육내용</RightBoxTitle>
          <BoxArea 
            value={eduContents}
            onChange={onChangeEduContentsHandler}
            placeholder='교육내용을 입력해 주세요'
          ></BoxArea>
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


export default TrainingEditComponent;