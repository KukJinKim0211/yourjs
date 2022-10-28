//커리어
import React from 'react';
import styled from 'styled-components';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr} from './personal';


const Career = () => {
  return (
    <Container id='7'>
      <ContentTitle>📈 커리어</ContentTitle>
      <ContentSet>
        <Hr></Hr>
        <Content>
          <LeftBox>2021.01.01~2021.12.12</LeftBox>
          <CenterBox></CenterBox>
          <RightBoxes>
          <RightBox>
            <RightBoxTitle>회사명</RightBoxTitle>
            <RightBoxContent>삼성전자</RightBoxContent>
          </RightBox>
          <RightBox>
            <RightBoxTitle>부서명</RightBoxTitle>
            <RightBoxContent>IT기획부</RightBoxContent>
          </RightBox>
          <RightBox>
            <RightBoxTitle>직위</RightBoxTitle>
            <RightBoxContent>대리</RightBoxContent>
          </RightBox>
          <RightBox>
            <RightBoxTitle>연봉</RightBoxTitle>
            <RightBoxContent>5000만</RightBoxContent>
          </RightBox>
          <RightBox>파일</RightBox>
          </RightBoxes>
        </Content>
      </ContentSet>
    </Container>
  )
};

export default Career;
