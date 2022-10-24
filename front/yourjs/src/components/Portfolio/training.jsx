//교육사항
import React from 'react';
import styled from 'styled-components';
import {Container, Contents, LeftBox, RightBox} from './personal';


const Training = () => {
  return (
    <Container>
      !! 교육사항
      <Contents>
        <LeftBox>교육명</LeftBox>
        <RightBox>삼성 청년 SW 아카데미 1학기</RightBox>
      </Contents>
      <Contents>
        <LeftBox>주관기관</LeftBox>
        <RightBox>삼성 청년 SW 아카데미</RightBox>
      </Contents>
      <Contents>
        <LeftBox>교육시간</LeftBox>
        <RightBox>800시간</RightBox>
      </Contents>
      <Contents>
        <LeftBox>교육기간</LeftBox>
        <RightBox>2022.01.05~2022.05.27</RightBox>
      </Contents>
      <Contents>
        <LeftBox>교육내용</LeftBox>
        <RightBox>SW 필수 지식과 알고리즘 중심의 몰입형 코딩 교육</RightBox>
      </Contents>
      <Contents>
        <LeftBox>파일</LeftBox>
        <RightBox>파일링크</RightBox>
      </Contents>
    </Container>
  )
};

export default Training;
