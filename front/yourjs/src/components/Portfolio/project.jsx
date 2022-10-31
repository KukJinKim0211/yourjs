//프로젝트
import React from 'react';
import styled from 'styled-components';
import {Container, Content, LeftBox, RightBox} from './personal';


const Project = () => {
  return (
    <Container>
      !! 프로젝트
      <Content>
        <LeftBox>프로젝트명</LeftBox>
        <RightBox>츄애니원</RightBox>
      </Content>
      <Content>
        <LeftBox>프로젝트기간</LeftBox>
        <RightBox>2021.05.01~2021.07.01</RightBox>
      </Content>
      <Content>
        <LeftBox>소속명</LeftBox>
        <RightBox>삼성 청년 SW 아카데미</RightBox>
      </Content>
      <Content>
        <LeftBox>사용기술</LeftBox>
        <RightBox>SpringBoot</RightBox>
      </Content>
      <Content>
        <LeftBox>내용</LeftBox>
        <RightBox>애니메이션 최고야...</RightBox>
      </Content>
      <Content>
        <LeftBox>파일</LeftBox>
        <RightBox>파일링크</RightBox>
      </Content>
    </Container>
  )
};

export default Project;
