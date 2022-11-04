import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import ProjectEditComponent from './ProjectEditComponent';
import { Container, ContentTitle, ContentSet, Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr} from '../Portfolio/personal';

const PlusButton = styled.button`
  border-radius: 1rem;
  border: none;
  cursor: pointer;
`;

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

const dataArr = [
  { title: '츄애니원', group: '삼성 청년 SW 아카데미', skill: 'SpringBoot', procontent: '애니메이션 최고야...', start: '2021-05-01', end: '2021-07-29'},
  { title: 'Pecommend', group: '삼성 청년 SW 아카데미', skill: 'React', procontent: '향수 최고야...', start: '2021-01-01', end: '2021-04-29'}
];

const ProjectEdit = () => {
  const [buttonFlag,setButtonFlag] = useState(false)

  const handleOnclick = () => {
    setButtonFlag(!buttonFlag)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' , marginTop:"1rem" }}>
        <PlusButton onClick={handleOnclick}>{buttonFlag? '➖': '➕'}</PlusButton>
      </div>
      {buttonFlag && (<ProjectEditComponent ></ProjectEditComponent>)}
      <br/><br/>
      <Container>
        <ContentTitle>📜 프로젝트</ContentTitle>
        <ContentSet>
          <Hr></Hr>
          {dataArr.map((el, index) => (
            <Content key={index}>
              <LeftBox>{el.start}<br/>~ {el.end}<br/><br/>
              <ChangeButton>수정</ChangeButton>
              <DelButton>삭제</DelButton></LeftBox>
              <CenterBox></CenterBox>
              <RightBoxes>
                <RightBox>
                  <RightBoxTitle>프로젝트명</RightBoxTitle>
                  <RightBoxContent>{el.title}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>소속명</RightBoxTitle>
                  <RightBoxContent>{el.where}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>사용기술</RightBoxTitle>
                  <RightBoxContent>{el.skill}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>내용</RightBoxTitle>
                  <RightBoxContent>{el.procontent}</RightBoxContent>
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