import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import { Container, ContentTitle, ContentSet, Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr} from '../Portfolio/personal';
import { ChangeButton, DelButton } from './ProjectEdit';


const dataArr = [
  { certName: '정보처리기사', certNum: '003006861', certInstitution: '한국산업인력공단', acquisitionDate: '2022-05-26'},
];

const CertificateEdit = () => {

  return (
    <div>
      <Container>
        <ContentTitle>📖 자격증/어학</ContentTitle>
        <ContentSet>
          <Hr></Hr>
          {dataArr.map((el, index) => (
            <Content key={index}>
              <LeftBox>{el.acquisitionDate}<br/><br/>
              <ChangeButton>수정</ChangeButton>
              <DelButton>삭제</DelButton></LeftBox>
              <CenterBox></CenterBox>
              <RightBoxes>
                <RightBox>
                  <RightBoxTitle>자격증명</RightBoxTitle>
                  <RightBoxContent>{el.certName}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>자격번호</RightBoxTitle>
                  <RightBoxContent>{el.certNum}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>발급기관</RightBoxTitle>
                  <RightBoxContent>{el.certInstitution}</RightBoxContent>
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

export default CertificateEdit