import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent} from '../Portfolio/personal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { BoxInput, SaveButton } from './ProjectEditComponent';


const CertificateEditComponent = ({}) => {
  const [name, setName] = useState('');
  const [num, setNum] = useState('');
  const [institution, setInstitution] = useState('');
  const [acquisitionDate, setAcquisitionDate] = useState('');
  const [file, setFile] = useState('');
  const [data, setData] = useState({name: '', num: '', institution: '', acquisitionDate: '', file: ''});

  const onChangeNameHandler = e => {
    setName(e.target.value);
    setData({ ...data, name: name });
  };

  const onChangeNumHandler = e => {
    setNum(e.target.value);
    setData({ ...data, num: num });
  };

  const onChangeInstitutionHandler = e => {
    setInstitution(e.target.value);
    setData({ ...data, institution: institution });
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
            placeholderText='취득일'
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            autoComplete="off"
            id="contentFont"
            onChange={date => setAcquisitionDate(date)}
            selected={acquisitionDate}
        ></DatePicker>
        <br/><br/>
        <SaveButton>추가</SaveButton>
      </LeftBox>
      <CenterBox></CenterBox>
      <RightBoxes>
        <RightBox>
          <RightBoxTitle>자격증명</RightBoxTitle>
          <BoxInput 
            value={name}
            onChange={onChangeNameHandler}
            placeholder='자격증 명을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>자격번호</RightBoxTitle>
          <BoxInput 
            value={num}
            onChange={onChangeNumHandler}
            placeholder='자격번호를 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>발급기관</RightBoxTitle>
          <BoxInput 
            value={institution}
            onChange={onChangeInstitutionHandler}
            placeholder='발급기관을 입력해 주세요'
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


export default CertificateEditComponent;