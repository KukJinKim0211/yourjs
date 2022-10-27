//자격증, 어학
import React from 'react';
import styled from 'styled-components';
import {Container, Content, LeftBox, RightBox} from './personal';


const Certificate = () => {
  return (
    <Container>
      !! 자격증/어학
      <Content>
        <LeftBox>자격증명</LeftBox>
        <RightBox>정보처리기사</RightBox>
      </Content>
      <Content>
        <LeftBox>자격증번호</LeftBox>
        <RightBox>003006861</RightBox>
      </Content>
      <Content>
        <LeftBox>발급기관</LeftBox>
        <RightBox>한국산업인력공단</RightBox>
      </Content>
      <Content>
        <LeftBox>취득일</LeftBox>
        <RightBox>2022.05.27</RightBox>
      </Content>
      <Content>
        <LeftBox>파일</LeftBox>
        <RightBox>파일링크</RightBox>
      </Content>
    </Container>
  )
};

export default Certificate;
