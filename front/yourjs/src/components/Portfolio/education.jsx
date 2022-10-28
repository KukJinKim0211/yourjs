//학력사항
import React from 'react';
import styled from 'styled-components';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, CenterBox, RightBoxes, RightBox, Hr} from './personal';


const Education = () => {
  return (
    <Container id='3'>
      <ContentTitle>🎓 학력사항</ContentTitle>
      <ContentSet>
        <Hr></Hr>
        <Content>
          <LeftBox>2015.03-2021.02</LeftBox>
          <CenterBox></CenterBox>
          <RightBoxes>
            <RightBox>경북대학교(대구)</RightBox>
            <RightBox>통계학 전공</RightBox>
            <RightBox>빅데이터 복수전공</RightBox>
            <RightBox>경영학 부전공</RightBox>
            <RightBox>전공 이수학점 93</RightBox>
            <RightBox>총 이수학점 134</RightBox>
            <RightBox>전공 평점 3.@@ / 4.3</RightBox>
            <RightBox>총 평점 3.@@ / 4.3</RightBox>
          </RightBoxes>
        </Content>
        <Content>
          <LeftBox>2011.03-2014.02</LeftBox>
          <CenterBox></CenterBox>
          <RightBoxes>
            <RightBox>양산제일고등학교(경남)</RightBox>
          </RightBoxes>
        </Content>
      </ContentSet>



      {/* <ContentSet>
        <Contents>
          <Hr></Hr>
          <Content>
            <LeftBox>2015.03-2021.02</LeftBox>
            <RightBox>경북대학교 통계학 전공</RightBox>
          </Content>
          <Content>
            <LeftBox>학교명</LeftBox>
            <RightBox>경북대학교(대구)</RightBox>
          </Content>
          <Content>
            <LeftBox>기간</LeftBox>
            <RightBox>2015.03~2021.02</RightBox>
          </Content>
          <Content>
            <LeftBox>전공</LeftBox>
            <RightBox>통계학</RightBox>
          </Content>
          <Content>
            <LeftBox>복수전공</LeftBox>
            <RightBox>빅데이터</RightBox>
          </Content>
          <Content>
            <LeftBox>부전공</LeftBox>
            <RightBox></RightBox>
          </Content>
          <Content>
            <Box30>전공 이수학점</Box30>
            <Box20>93</Box20>
            <Box30>총 이수학점</Box30>
            <Box20>134</Box20>
          </Content>
          <Content>
            <Box30>전공 평점</Box30>
            <Box20>3.@@ / 4.3</Box20>
            <Box30>총 평점</Box30>
            <Box20>3.@@ / 4.3</Box20>
          </Content>
        </Contents>
        <Contents>
          <Hr></Hr>
          <Content>
            <LeftBox>학교명</LeftBox>
            <RightBox>경북대학교(대구)</RightBox>
          </Content>
          <Content>
            <LeftBox>기간</LeftBox>
            <RightBox>2015.03~2021.02</RightBox>
          </Content>
          <Content>
            <LeftBox>전공</LeftBox>
            <RightBox>통계학</RightBox>
          </Content>
          <Content>
            <LeftBox>복수전공</LeftBox>
            <RightBox>빅데이터</RightBox>
          </Content>
          <Content>
            <LeftBox>부전공</LeftBox>
            <RightBox></RightBox>
          </Content>
          <Content>
            <Box30>전공 이수학점</Box30>
            <Box20>93</Box20>
            <Box30>총 이수학점</Box30>
            <Box20>134</Box20>
          </Content>
          <Content>
            <Box30>전공 평점</Box30>
            <Box20>3.@@ / 4.3</Box20>
            <Box30>총 평점</Box30>
            <Box20>3.@@ / 4.3</Box20>
          </Content>
        </Contents>
  </ContentSet> */}
    </Container>
  )
};

export default Education;
