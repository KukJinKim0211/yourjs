import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import Project from '../Portfolio/project';

const Box = styled.div`
  margin-bottom: 2rem;
  height: fit-content;
`

const BoxName = styled.div`
  display: flex;
  height: 50px;
`

const BoxTitle = styled.h4`
  width: 20%;
  text-align: center;
`

const BoxInput = styled.input`
  border: none;
  width: 70%;
  border-bottom: 3px solid gray;
  margin-top: 10px;
  margin-left: 30px;
  :focus {
    outline: none;
  }
`

const PlusButton = styled.button`
  border-radius: 1rem;
  border: none;
  cursor: pointer;
`;

const WriteForm = () => {
  return (
    <Box>
      <BoxName>
        <BoxTitle>프로젝트명</BoxTitle>
        <BoxInput placeholder='프로젝트 명을 입력해 주세요'></BoxInput>
      </BoxName>
      <BoxName>
        <BoxTitle>시작일</BoxTitle>
        <BoxInput placeholder='프로젝트 시작일을 입력해 주세요'></BoxInput>
      </BoxName>
      <BoxName>
        <BoxTitle>종료일</BoxTitle>
        <BoxInput placeholder='프로젝트 종료일을 입력해 주세요'></BoxInput>
      </BoxName>
      <BoxName>
        <BoxTitle>소속명</BoxTitle>
        <BoxInput placeholder='프로젝트 소속명을 입력해 주세요'></BoxInput>
      </BoxName>
      <BoxName>
        <BoxTitle>사용기술</BoxTitle>
        <BoxInput placeholder='프로젝트 사용기술 입력해 주세요'></BoxInput>
      </BoxName>
      <BoxName>
        <BoxTitle>내용</BoxTitle>
        <BoxInput placeholder='프로젝트 내용을 입력해 주세요'></BoxInput>
      </BoxName>
      <BoxName>
        <BoxTitle>파일</BoxTitle>
        <BoxInput placeholder='프로젝트 파일을 업로드해 주세요'></BoxInput>
      </BoxName>
      <br/><hr/>  
    </Box>
  )
}

const ProjectEdit = () => {
  const [list, setList] = useState(['']);
  const onClick = () => {
    const a = [...list];
    a.unshift({ title: 'ba', content: 'b' });
    setList(a);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' , marginTop:"1rem" }}>
        <PlusButton onClick={onClick}>➕</PlusButton>
      </div>
      {list.map((li, index) => (
        <WriteForm key={index}></WriteForm>
      ))}
    </div>
  )
}

export default ProjectEdit


// 프로젝트명, 프로젝트기간, 소속명, 사용기술, 내용, 파일