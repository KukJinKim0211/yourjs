import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr,
  ChangeButton, DelButton, customStyles, ModalForm, ModalTitle, ModalContent, ModalContentDate, InsertBtnDiv, InsertBtn} from '../../common/PorfoStyled';


const dataArr = [
  { awardName: '프로젝트 우수상', awardContents: '집가고싶어요', awardInstitution: '삼성 청년 SW 아카데미', winDate: '2022-05-27'},
];

const AwardEdit = () => {

  return (
    <div>
      <Container>
        <ContentTitle>🥇 수상내역</ContentTitle>
        <ContentSet>
          <Hr></Hr>
          {dataArr.map((el, index) => (
            <Content key={index}>
              <LeftBox>{el.winDate}<br/><br/>
              <ChangeButton>수정</ChangeButton>
              <DelButton>삭제</DelButton></LeftBox>
              <CenterBox></CenterBox>
              <RightBoxes>
                <RightBox>
                  <RightBoxTitle>수상명칭</RightBoxTitle>
                  <RightBoxContent>{el.awardName}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>수상내용</RightBoxTitle>
                  <RightBoxContent>{el.awardContents}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>수상기관</RightBoxTitle>
                  <RightBoxContent>{el.awardInstitution}</RightBoxContent>
                </RightBox>
                <RightBox>파일</RightBox>
              </RightBoxes>
            </Content>
            ))}
          </ContentSet>
        </Container>
    </div>
  )
}

export default AwardEdit