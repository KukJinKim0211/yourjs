import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr,
  ChangeButton, DelButton, customStyles, ModalForm, ModalTitle, ModalContent, ModalContentDate, InsertBtnDiv, InsertBtn,
  BoxInput, BoxArea, SaveButton, Essential, EssentialDate} from '../../common/PorfoStyled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';


const AwardEditComponent = ({}) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [institution, setInstitution] = useState('');
  const [windate, setWindate] = useState('');
  const [file, setFile] = useState('');
  const [data, setData] = useState({name: '', content: '', institution: '', windate: '', file: ''});

  const onChangeNameHandler = e => {
    setName(e.target.value);
    setData({ ...data, name: name });
  };

  const onChangeContentHandler = e => {
    setContent(e.target.value);
    setData({ ...data, content: content });
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
            placeholderText='수상일'
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            autoComplete="off"
            id="contentFont"
            onChange={date => setWindate(date)}
            selected={windate}
        ></DatePicker>
        <br/><br/>
        <SaveButton>추가</SaveButton>
      </LeftBox>
      <CenterBox></CenterBox>
      <RightBoxes>
        <RightBox>
          <RightBoxTitle>수상명칭</RightBoxTitle>
          <BoxInput 
            value={name}
            onChange={onChangeNameHandler}
            placeholder='수상명칭을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>수상내용</RightBoxTitle>
          <BoxArea 
            value={content}
            onChange={onChangeContentHandler}
            placeholder='수상내용을 입력해 주세요'
          ></BoxArea>
        </RightBox>
        <RightBox>
          <RightBoxTitle>수상기관</RightBoxTitle>
          <BoxInput 
            value={institution}
            onChange={onChangeInstitutionHandler}
            placeholder='수상기관을 입력해 주세요'
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


export default AwardEditComponent;