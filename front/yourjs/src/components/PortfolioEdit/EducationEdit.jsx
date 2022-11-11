import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr,
  ChangeButton, DelButton, customStyles, ModalForm, ModalTitle, ModalContent, ModalContentDate, InsertBtnDiv, InsertBtn} from '../../common/PorfoStyled';


const dataArr = [
  {
    schoolName: "경북대학교",
    location: "대구",
    totAvgCredit: "2.22/4.30",
    majorAvgCredit: "3.33/4.30",
    totCredit: "134",
    majorCredit: "93",
    majorName: "통계학",
    doubleMajorName: "빅데이터",
    subMajorName: "",
    startDate: "2015-03",
    endDate: "2021-12",
  }
];

const EducationEdit = () => {

  return (
    <div>
      <Container>
        <ContentTitle>🎓 학력사항</ContentTitle>
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
                  <RightBoxTitle>학교명</RightBoxTitle>
                  <RightBoxContent>{el.schoolName}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>지역</RightBoxTitle>
                  <RightBoxContent>{el.location}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>전공</RightBoxTitle>
                  <RightBoxContent>{el.majorName}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>복수전공</RightBoxTitle>
                  <RightBoxContent>{el.doubleMajorName}</RightBoxContent>
                </RightBox>
                {el.subMajorName !== "" ? <RightBox>
                  <RightBoxTitle>부전공</RightBoxTitle>
                  <RightBoxContent>{el.subMajorName}</RightBoxContent>
                </RightBox> : ''
                }
                <RightBox>
                  <RightBoxTitle>전공 이수학점</RightBoxTitle>
                  <RightBoxContent>{el.majorCredit}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>총 이수학점</RightBoxTitle>
                  <RightBoxContent>{el.totCredit}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>전공 평점</RightBoxTitle>
                  <RightBoxContent>{el.majorAvgCredit}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>총 평점</RightBoxTitle>
                  <RightBoxContent>{el.totAvgCredit}</RightBoxContent>
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

export default EducationEdit