//병역사항
import React from 'react';
import styled from 'styled-components';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, CenterBox, RightBoxes, RightBox, Hr} from './personal';


const Military = () => {
  return (
    <Container id='2'>
      <ContentTitle>🚅 병역사항</ContentTitle>
      <ContentSet>
        <Hr></Hr>
        <Contents>
          <Content>
            <LeftBox>군별</LeftBox>
            <RightBox>육군</RightBox>
          </Content>
          <Content>
            <LeftBox>병과</LeftBox>
            <RightBox>보병</RightBox>
          </Content>
          <Content>
            <LeftBox>기간</LeftBox>
            <RightBox>2016.08.16 ~ 2018.08.15</RightBox>
          </Content>
          <Content>
            <LeftBox>전역사유</LeftBox>
            <RightBox>만기제대</RightBox>
          </Content>
        </Contents>
      </ContentSet>
    </Container>
  )
};

export default Military;
