//인적사항
import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  width: 90%;
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
`;

const ContentTitle = styled.div`
  width: 20%;
  font-weight: bold;
  font-size: 1.3rem;
  text-align: center;
  font-family: 'Pretendard-Regular';
`

const ContentSet = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`

const Contents = styled.div`
  
`

const Content = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const LeftBox = styled.div`
  width: 25%;
  text-align: center;
  word-break: break-all;
  font-weight: bold;
  font-family: 'Pretendard-Regular';
`;

const LeftBoxTitle = styled.div`
  width: 100%;
  margin: 1rem;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`

const LeftBoxContent = styled.div`
  width: 100%;
  margin-left: 1rem;
  text-align: center;
`

const CenterBox = styled.div`
  width: 5%;
`

const RightBoxes = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`

const RightBox = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  font-family: 'InfinitySans-RegularA1';
  font-weight: 200;
  color: rgba(0, 0, 0, 0.55);
`;

const RightBoxTitle = styled.div`
  width: 20%;
  /* text-align: center; */
`

const RightBoxContent = styled.div`
  width: 80%;
`

const Hr = styled.hr`
  width: 100%;
  height: 0.1rem;
  /* background-color: orange; */
  background-color: #d4e1f5;
`

export {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr, LeftBoxTitle, LeftBoxContent}

const Personal = () => {
  return (
    <Container id='1'>
      <ContentTitle>🔖 인적사항</ContentTitle>
      <ContentSet>
        <Contents>
          <Hr></Hr>
          <Content>
              <LeftBox>이름</LeftBox>
              <RightBox>금동운 / 一二三 / Dongwoon Keum</RightBox>
          </Content>
          <Content>
              <LeftBox>E-mail</LeftBox>
              <RightBox>dcloud0820@gamil.com</RightBox>
          </Content>
          <Content>
              <LeftBox>기술스택</LeftBox>
              <RightBox>Python, Django. Java, Javascript, Typescript, React, R</RightBox>
          </Content>
          <Content>
              <LeftBox>외부 URL</LeftBox>
              <RightBox>https://github.com/Dongwoon0820</RightBox>
          </Content>
        </Contents>
      </ContentSet>
    </Container>
  )
};

export default Personal;
