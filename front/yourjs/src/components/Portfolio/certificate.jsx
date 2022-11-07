//자격증, 어학
import React from 'react';
import styled from 'styled-components';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr} from './personal';


const Certificate = () => {
  return (
    <Container id='5'>
      <ContentTitle>📖 자격증/어학</ContentTitle>
      <ContentSet>
        <Hr></Hr>
        <Content>
          <LeftBox>2022.05.27</LeftBox>
          <CenterBox></CenterBox>
          <RightBoxes>
          <RightBox>
            <RightBoxTitle>자격증명</RightBoxTitle>
            <RightBoxContent>정보처리기사</RightBoxContent>
          </RightBox>
          <RightBox>
            <RightBoxTitle>자격번호</RightBoxTitle>
            <RightBoxContent>003006861</RightBoxContent>
          </RightBox>
          <RightBox>
            <RightBoxTitle>발급기관</RightBoxTitle>
            <RightBoxContent>한국산업인력공단</RightBoxContent>
          </RightBox>
          <RightBox>파일</RightBox>
          </RightBoxes>
        </Content>
      </ContentSet>
    </Container>
  )
};

export default Certificate;
