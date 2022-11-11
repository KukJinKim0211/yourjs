import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr,
  ChangeButton, DelButton, customStyles, ModalForm, ModalTitle, ModalContent, ModalContentDate, InsertBtnDiv, InsertBtn} from '../../common/PorfoStyled';


const dataArr = [
  { eduName: '삼성 청년 SW 아카데미 1학기', eduInstitution: '삼성 청년 SW 아카데미', eduTime: '800시간', eduContents: 'SW 필수 지식과 알고리즘 중심의 몰입형 코딩 교육', startDate: '2022.01.05', endDate: '2022.05.27'},
];

const TrainingEdit = () => {

  return (
    <div>
      <Container>
        <ContentTitle>🔥 교육사항</ContentTitle>
        <ContentSet>
          <Hr></Hr>
          {dataArr.map((el, index) => (
            <Content key={index}>
              <LeftBox>{el.startDate}<br/>~ {el.endDate}<br/><br/>
              <ChangeButton>수정</ChangeButton>
              <DelButton>삭제</DelButton></LeftBox>
              <CenterBox></CenterBox>
              <RightBoxes>
                <RightBox>
                  <RightBoxTitle>교육명</RightBoxTitle>
                  <RightBoxContent>{el.eduName}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>주관기관</RightBoxTitle>
                  <RightBoxContent>{el.eduInstitution}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>교육시간</RightBoxTitle>
                  <RightBoxContent>{el.eduTime}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>교육내용</RightBoxTitle>
                  <RightBoxContent>{el.eduContents}</RightBoxContent>
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

export default TrainingEdit