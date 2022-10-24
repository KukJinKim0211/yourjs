//병역사항
import React from 'react';
import styled from 'styled-components';
import {Container, Contents, LeftBox, RightBox} from './personal';


const Military = () => {
  return (
    <Container>
      !! 병역사항
      <Contents>
        <LeftBox>군별(병과)</LeftBox>
        <RightBox>육해공(보병)</RightBox>
      </Contents>
      <Contents>
        <LeftBox>기간</LeftBox>
        <RightBox>2016.08.16~2018.08.15</RightBox>
      </Contents>
      <Contents>
        <LeftBox>전역사유</LeftBox>
        <RightBox>만기제대</RightBox>
      </Contents>
    </Container>
  )
};

export default Military;
