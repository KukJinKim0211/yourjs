//수상내역
import React from 'react';
import styled from 'styled-components';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr} from './personal';


const Award = () => {
  return (
    <Container id='6'>
      <ContentTitle>🥇 수상내역</ContentTitle>
      <ContentSet>
        <Hr></Hr>
        <Content>
          <LeftBox>2022.05.27</LeftBox>
          <CenterBox></CenterBox>
          <RightBoxes>
          <RightBox>
            <RightBoxTitle>수상명칭</RightBoxTitle>
            <RightBoxContent>프로젝트 우수상</RightBoxContent>
          </RightBox>
          <RightBox>
            <RightBoxTitle>수상내용</RightBoxTitle>
            <RightBoxContent>집가고싶어요</RightBoxContent>
          </RightBox>
          <RightBox>
            <RightBoxTitle>수상기관</RightBoxTitle>
            <RightBoxContent>삼성 청년 SW 아카데미</RightBoxContent>
          </RightBox>
          <RightBox>파일</RightBox>
          </RightBoxes>
        </Content>
      </ContentSet>
    </Container>
  )
};

export default Award;
