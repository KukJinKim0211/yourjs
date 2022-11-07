import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import { Container, ContentTitle, ContentSet, Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr} from '../Portfolio/personal';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import Project from '../Portfolio/project';

const ChangeButton = styled.button`
  width: 4rem;
  height: 2rem;
  cursor: pointer;
  margin: 0.5rem;
`

const DelButton = styled.button`
  width: 4rem;
  height: 2rem;
  cursor: pointer;
  margin: 0.5rem;
`


export {ChangeButton, DelButton}

const ProjectEdit = ({dataArr}) => {
  const delButtonClicked = (projectSeq) => {

    console.log(projectSeq)
    // console.log('A')
    // console.log(dataArr)
    console.log(apis.project + `/${projectSeq}`)
    axiosInstance
      .delete(apis.project, {
        "projectSeq": projectSeq
      })
      .then(response => {
        if (response.status === 200) {
          console.log('삭제성공')
        }
      })
      .catch(error => console.log(error));
  };
  return (
    <div>
      <Container>
        <ContentTitle>📜 프로젝트</ContentTitle>
        <ContentSet>
          <Hr></Hr>
          {dataArr?.map((el, index) => (
            <Content key={index}>
              <LeftBox>{el.startDate}<br/>~ {el.endDate}<br/><br/>
              <ChangeButton>수정</ChangeButton>
              <DelButton onClick={() => delButtonClicked(el.projectSeq)}>삭제</DelButton></LeftBox>
              <CenterBox></CenterBox>
              <RightBoxes>
                <RightBox>
                  <RightBoxTitle>프로젝트명</RightBoxTitle>
                  <RightBoxContent>{el.projectName}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>소속명</RightBoxTitle>
                  <RightBoxContent>{el.belongs}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>사용기술</RightBoxTitle>
                  <RightBoxContent>{el.tools}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>내용</RightBoxTitle>
                  <RightBoxContent>{el.content}</RightBoxContent>
                </RightBox>
                <RightBox>파일</RightBox>
              </RightBoxes>
            </Content>
            ))}
          </ContentSet>
        </Container>
    </div>
  )
}

export default ProjectEdit