import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import { Container, ContentTitle, ContentSet, Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr} from '../Portfolio/personal';
import { ChangeButton, DelButton } from './ProjectEdit';


const dataArr = [
  { company: '삼성전자', department: 'IT개발', position: '대리', salary: '5000만', startDate: '2021.01.01', endDate: '2021.12.12'},
];

const CareerEdit = () => {

  return (
    <div>
      <Container>
        <ContentTitle>📈 커리어</ContentTitle>
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
                  <RightBoxTitle>회사명</RightBoxTitle>
                  <RightBoxContent>{el.company}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>부서명</RightBoxTitle>
                  <RightBoxContent>{el.department}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>직위</RightBoxTitle>
                  <RightBoxContent>{el.position}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>연봉</RightBoxTitle>
                  <RightBoxContent>{el.salary}</RightBoxContent>
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

export default CareerEdit