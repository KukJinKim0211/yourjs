import React from 'react';
import { useState } from 'react';
import {Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle,
  BoxInput, BoxArea, SaveButton, Essential, EssentialDate} from '../../common/PorfoStyled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';


const ProjectEditComponent = ({getServerData}) => {
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [belongs, setBelongs] = useState('');
  const [tools, setTools] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');
  const [data, setData] = useState({projectName: '', startDate: '', endDate: '', belongs: '', tools: '', content: '', file: ''});

  const onChangeNameHandler = e => {
    setProjectName(e.target.value);
    setData({ ...data, projectName: projectName });
  };

  const onChangeBelongsHandler = e => {
    setBelongs(e.target.value);
    setData({ ...data, belongs: belongs });
  };

  const onChangeToolsHandler = e => {
    setTools(e.target.value);
    setData({ ...data, tools: tools });
  };

  const onChangeContentHandler = e => {
    setContent(e.target.value);
    setData({ ...data, content: content });
  };

  const onChangeFileHandler = e => {
    setFile(e.target.value);
    setData({ ...data, file: file });
  };

  const addButtonClicked = () => {
    const data = {
      projectName: projectName === "" ? null : projectName,
      startDate: startDate === "" ? null : startDate,
      endDate,
      belongs: belongs === "" ? null : belongs,
      tools: tools === "" ? null : tools,
      content: content === "" ? null : content,
      file
    }
    console.log(data)
    if (data.projectName === null || data.startDate === null || data.belongs === null || data.tools === null || data.content === null) {
      alert("필수값을 입력해 주세요.")
    } else {
    axiosInstance
      .post(apis.project, data)
      .then(response => {
        if (response.status === 200) {
          getServerData()
          setProjectName('')
          setStartDate('')
          setEndDate('')
          setBelongs('')
          setTools('')
          setContent('')
          setFile('')
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
          <RightBoxTitle>프로젝트명 <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={projectName}
            onChange={onChangeNameHandler}
            placeholder='프로젝트 명을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>소속명 <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={belongs}
            onChange={onChangeBelongsHandler}
            placeholder='프로젝트 소속명을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>사용기술 <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={tools}
            onChange={onChangeToolsHandler}
            placeholder='프로젝트 사용기술을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>내용 <Essential>(*)</Essential></RightBoxTitle>
          <BoxArea 
            value={content}
            onChange={onChangeContentHandler}
            placeholder='프로젝트 내용을 입력해 주세요'
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


export default ProjectEditComponent;