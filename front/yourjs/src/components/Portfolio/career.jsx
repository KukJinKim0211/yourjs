//커리어
import React from 'react';
import styled from 'styled-components';
import {Container, Content, LeftBox, RightBox} from './personal';


const Career = () => {
  return (
    <Container>
      !! 커리어
      <Content>
        <LeftBox>회사명</LeftBox>
        <RightBox>삼성전자</RightBox>
      </Content>
      <Content>
        <LeftBox>부서명(직위)</LeftBox>
        <RightBox>IT기획부(대리)</RightBox>
      </Content>
      <Content>
        <LeftBox>근무기간</LeftBox>
        <RightBox>2021.01.01~2021.12.12</RightBox>
      </Content>
      <Content>
        <LeftBox>연봉</LeftBox>
        <RightBox>5000만</RightBox>
      </Content>
      <Content>
        <LeftBox>파일</LeftBox>
        <RightBox>파일링크</RightBox>
      </Content>
    </Container>
  )
};

export default Career;
