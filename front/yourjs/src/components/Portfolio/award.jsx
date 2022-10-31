//수상내역
import React from 'react';
import styled from 'styled-components';
import {Container, Content, LeftBox, RightBox} from './personal';


const Award = () => {
  return (
    <Container>
      !! 수상내역
      <Content>
        <LeftBox>수상명칭</LeftBox>
        <RightBox>프로젝트 우수상</RightBox>
      </Content>
      <Content>
        <LeftBox>수상내용</LeftBox>
        <RightBox>집가고싶어요</RightBox>
      </Content>
      <Content>
        <LeftBox>수상기관</LeftBox>
        <RightBox>삼성 청년 SW 아카데미</RightBox>
      </Content>
      <Content>
        <LeftBox>수상일</LeftBox>
        <RightBox>2022.05.27</RightBox>
      </Content>
      <Content>
        <LeftBox>파일</LeftBox>
        <RightBox>파일링크</RightBox>
      </Content>
    </Container>
  )
};

export default Award;
