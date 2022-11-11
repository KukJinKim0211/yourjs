//학력사항
import React from 'react';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr} from '../../common/PorfoStyled';


const Education = () => {
  return (
    <Container id='3'>
      <ContentTitle>🎓 학력사항</ContentTitle>
      <ContentSet>
        <Hr></Hr>
        <Content>
          <LeftBox>2015.03<br/>~ 2021.02</LeftBox>
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
          <LeftBox>2011.03<br/>~ 2014.02</LeftBox>
          <CenterBox></CenterBox>
          <RightBoxes>
            <RightBox>양산제일고등학교(경남)</RightBox>
          </RightBoxes>
        </Content>
      </ContentSet>
    </Container>
  )
};

export default Education;
