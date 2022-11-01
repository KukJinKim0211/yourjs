//교육사항
import React from 'react';
import styled from 'styled-components';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr} from './personal';


const Training = () => {
  return (
    <Container id='4'>
      <ContentTitle>🔥 교육사항</ContentTitle>
      <ContentSet>
        <Hr></Hr>
        <Content>
          <LeftBox>2022.01.05<br/>~ 2022.05.27</LeftBox>
          <CenterBox></CenterBox>
          <RightBoxes>
          <RightBox>
            <RightBoxTitle>교육명</RightBoxTitle>
            <RightBoxContent>삼성 청년 SW 아카데미 1학기</RightBoxContent>
          </RightBox>
          <RightBox>
            <RightBoxTitle>주관기관</RightBoxTitle>
            <RightBoxContent>삼성 청년 SW 아카데미</RightBoxContent>
          </RightBox>
          <RightBox>
            <RightBoxTitle>교육시간</RightBoxTitle>
            <RightBoxContent>800시간</RightBoxContent>
          </RightBox>
          <RightBox>
            <RightBoxTitle>교육내용</RightBoxTitle>
            <RightBoxContent>SW 필수 지식과 알고리즘 중심의 몰입형 코딩 교육</RightBoxContent>
          </RightBox>
          <RightBox>파일링크</RightBox>
          </RightBoxes>
        </Content>
      </ContentSet>
    </Container>
  )
};

export default Training;
