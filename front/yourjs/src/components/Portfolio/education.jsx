//학력사항
import React from 'react';
import styled from 'styled-components';
import {Container, Contents, LeftBox, RightBox} from './personal';


const HalfBox = styled.div`
  width: 50%;
`

const Education = () => {
  return (
    <Container>
      !! 학력사항
      <Contents>
        <LeftBox>학교명(소재지)</LeftBox>
        <RightBox>경북대학교(대구)</RightBox>
      </Contents>
      <Contents>
        <LeftBox>기간</LeftBox>
        <RightBox>2015.03~2021.02</RightBox>
      </Contents>
      <Contents>
        <HalfBox>전공</HalfBox>
        <HalfBox>통계학</HalfBox>
        <HalfBox>복수전공</HalfBox>
        <HalfBox>빅데이터</HalfBox>
        <HalfBox>부전공</HalfBox>
        <HalfBox></HalfBox>
      </Contents>
      <Contents>
        <HalfBox>전공 이수학점</HalfBox>
        <HalfBox>93</HalfBox>
        <HalfBox>총 이수학점</HalfBox>
        <HalfBox>134</HalfBox>
      </Contents>
      <Contents>
        <HalfBox>전공 평점</HalfBox>
        <HalfBox>3.@@ / 4.3</HalfBox>
        <HalfBox>총 평점</HalfBox>
        <HalfBox>3.@@ / 4.3</HalfBox>
      </Contents>
    </Container>
  )
};

export default Education;
