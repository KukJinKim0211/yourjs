//프로젝트
import React from 'react';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr} from '../../common/PorfoStyled';


const Project = () => {
  const dataArr = [
    { title: '츄애니원', where: '삼성 청년 SW 아카데미', skill: 'SpringBoot', procontent: '애니메이션 최고야...', start: '2021-05-01', end: '2021-07-29'},
    { title: 'Pecommend', where: '삼성 청년 SW 아카데미', skill: 'React', procontent: '향수 최고야...', start: '2021-01-01', end: '2021-04-29'}
  ];
  return (
    <Container id='8'>
      <ContentTitle>📜 프로젝트</ContentTitle>
      <ContentSet>
        <Hr></Hr>
        {dataArr.map((el, index) => (
          <Content key={index}>
            <LeftBox>{el.start}<br/>~ {el.end}</LeftBox>
            <CenterBox></CenterBox>
            <RightBoxes>
              <RightBox>
                <RightBoxTitle>프로젝트명</RightBoxTitle>
                <RightBoxContent>{el.title}</RightBoxContent>
              </RightBox>
              <RightBox>
                <RightBoxTitle>소속명</RightBoxTitle>
                <RightBoxContent>{el.where}</RightBoxContent>
              </RightBox>
              <RightBox>
                <RightBoxTitle>사용기술</RightBoxTitle>
                <RightBoxContent>{el.skill}</RightBoxContent>
              </RightBox>
              <RightBox>
                <RightBoxTitle>내용</RightBoxTitle>
                <RightBoxContent>{el.procontent}</RightBoxContent>
              </RightBox>
              <RightBox>파일</RightBox>
            </RightBoxes>
          </Content>
        ))}
      </ContentSet>
    </Container>
  )
};

export default Project;
