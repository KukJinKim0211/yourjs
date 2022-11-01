//프로젝트
import React from 'react';
import styled from 'styled-components';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr} from './personal';


const Project = () => {
  const start = '2021-05-01';
  const end = '2021-07-29';
  return (
    <Container id='8'>
      <ContentTitle>📜 프로젝트</ContentTitle>
      <ContentSet>
        <Hr></Hr>
        <Content>
          <LeftBox>{start}<br/>~ {end}</LeftBox>
          <CenterBox></CenterBox>
          <RightBoxes>
          <RightBox>
            <RightBoxTitle>프로젝트명</RightBoxTitle>
            <RightBoxContent>츄애니원</RightBoxContent>
          </RightBox>
          <RightBox>
            <RightBoxTitle>소속명</RightBoxTitle>
            <RightBoxContent>삼성 청년 SW 아카데미</RightBoxContent>
          </RightBox>
          <RightBox>
            <RightBoxTitle>사용기술</RightBoxTitle>
            <RightBoxContent>SpringBoot</RightBoxContent>
          </RightBox>
          <RightBox>
            <RightBoxTitle>내용</RightBoxTitle>
            <RightBoxContent>애니메이션 최고야...</RightBoxContent>
          </RightBox>
          <RightBox>파일</RightBox>
          </RightBoxes>
        </Content>
        <Content>
          <LeftBox>2021.02.01<br/>~ 2021.04.01</LeftBox>
          <CenterBox></CenterBox>
          <RightBoxes>
          <RightBox>
            <RightBoxTitle>프로젝트명</RightBoxTitle>
            <RightBoxContent>Pecommend</RightBoxContent>
          </RightBox>
          <RightBox>
            <RightBoxTitle>소속명</RightBoxTitle>
            <RightBoxContent>삼성 청년 SW 아카데미</RightBoxContent>
          </RightBox>
          <RightBox>
            <RightBoxTitle>사용기술</RightBoxTitle>
            <RightBoxContent>React</RightBoxContent>
          </RightBox>
          <RightBox>
            <RightBoxTitle>내용</RightBoxTitle>
            <RightBoxContent>향수 추천...</RightBoxContent>
          </RightBox>
          <RightBox>파일</RightBox>
          </RightBoxes>
        </Content>
      </ContentSet>
    </Container>
  )
};

export default Project;
