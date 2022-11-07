import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent} from '../Portfolio/personal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';


const BoxInput = styled.input`
  border: none;
  width: 70%;
  border-bottom: 2px solid #b7cdee;
  :focus {
    outline: none;
  }
  padding: 0.5rem;
  font-family: 'InfinitySans-RegularA1';
`

const BoxArea = styled.textarea`
  border: none;
  width: 70%;
  border-bottom: 2px solid #b7cdee;
  :focus {
    outline: none;
  }
  padding: 0.5rem;
  font-family: 'InfinitySans-RegularA1';
`

const SaveButton = styled.button`
  width: 4rem;
  height: 3rem;
  margin: 2rem;
  cursor: pointer;
`

export {BoxInput, BoxArea, SaveButton}

const ProjectEditComponent = ({}) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [group, setGroup] = useState('');
  const [skill, setSkill] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');
  const [data, setData] = useState({title: '', start: '', end: '', group: '', skill: '', content: '', file: ''});

  const onChangeTitleHandler = e => {
    setTitle(e.target.value);
    setData({ ...data, title: title });
  };

  const onChangeGroupHandler = e => {
    setGroup(e.target.value);
    setData({ ...data, group: group });
  };

  const onChangeSkillHandler = e => {
    setSkill(e.target.value);
    setData({ ...data, skill: skill });
  };

  const onChangeContentHandler = e => {
    setContent(e.target.value);
    setData({ ...data, content: content });
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
            onChange={date => setStart(date)}
            selected={start}
        ></DatePicker>
        ~
        <DatePicker
            style ={{"z-index" : 999}}
            placeholderText='종료일'
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            autoComplete="off"
            id="contentFont"
            onChange={date => setEnd(date)}
            selected={end}
        ></DatePicker>
        <br/><br/>
        <SaveButton>추가</SaveButton>
      </LeftBox>
      <CenterBox></CenterBox>
      <RightBoxes>
        <RightBox>
          <RightBoxTitle>프로젝트명</RightBoxTitle>
          <BoxInput 
            value={title}
            onChange={onChangeTitleHandler}
            placeholder='프로젝트 명을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>소속명</RightBoxTitle>
          <BoxInput 
            value={group}
            onChange={onChangeGroupHandler}
            placeholder='프로젝트 소속명을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>사용기술</RightBoxTitle>
          <BoxInput 
            value={skill}
            onChange={onChangeSkillHandler}
            placeholder='프로젝트 사용기술을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>내용</RightBoxTitle>
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
//프로젝트명, 프로젝트기간, 소속명, 사용기술, 내용, 파일