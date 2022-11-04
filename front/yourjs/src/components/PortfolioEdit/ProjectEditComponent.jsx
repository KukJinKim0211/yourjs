import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent} from '../Portfolio/personal';


const DateBox = styled.input`
  border: none;
  width: 50%;
  border-bottom: 2px solid orange;
  :focus {
    outline: none;
  }
  padding: 0.5rem;
`

const BoxInput = styled.input`
  border: none;
  width: 70%;
  border-bottom: 2px solid orange;
  :focus {
    outline: none;
  }
  padding: 0.5rem;
`

const SaveButton = styled.button`
  width: 4rem;
  height: 2rem;
  cursor: pointer;
  /* margin: 1rem; */
  /* margin-left: 85%; */
`

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

  const onChangeStartHandler = e => {
    setStart(e.target.value);
    setData({ ...data, start: start });
  };

  const onChangeEndHandler = e => {
    setEnd(e.target.value);
    setData({ ...data, end: end });
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
      <LeftBox>
        <DateBox
          value={start}
          onChange={onChangeStartHandler}
          placeholder='시작일'
        ></DateBox><br/>~ 
        <DateBox
          value={end}
          onChange={onChangeEndHandler}
          placeholder='종료일' 
        ></DateBox><br/><br/>
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
          <BoxInput 
            value={content}
            onChange={onChangeContentHandler}
            placeholder='프로젝트 내용을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>파일</RightBoxTitle>
          <BoxInput 
            value={file}
            onChange={onChangeFileHandler}
            placeholder='프로젝트 파일을 업로드해 주세요'
          ></BoxInput>
        </RightBox>
      </RightBoxes>
    </Content>
  )
}


export default ProjectEditComponent;
//프로젝트명, 프로젝트기간, 소속명, 사용기술, 내용, 파일