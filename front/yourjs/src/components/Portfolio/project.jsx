//프로젝트
import React, {useState, useEffect} from 'react';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr} from '../../common/PorfoStyled';
import { apis } from '../../common/apis';
import axiosInstance from '../../common/customAxios';


const Project = () => {
  const [viewData, setViewData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(apis.project)
      .then(response => {
        setViewData(response.data);
      })
  }, []);

  return (
    <Container id='8'>
      <ContentTitle>📜 프로젝트</ContentTitle>
      <ContentSet>
        <Hr></Hr>
        {viewData?.map((el, index) => (
          <Content key={index}>
            <LeftBox>{el.startDate}<br/>~ {el.endDate}</LeftBox>
            <CenterBox></CenterBox>
            <RightBoxes>
              <RightBox>
                <RightBoxTitle>프로젝트명</RightBoxTitle>
                <RightBoxContent>{el.projectName}</RightBoxContent>
              </RightBox>
              <RightBox>
                <RightBoxTitle>소속명</RightBoxTitle>
                <RightBoxContent>{el.belongs}</RightBoxContent>
              </RightBox>
              <RightBox>
                <RightBoxTitle>사용기술</RightBoxTitle>
                <RightBoxContent>{el.tools}</RightBoxContent>
              </RightBox>
              <RightBox>
                <RightBoxTitle>내용</RightBoxTitle>
                <RightBoxContent>{el.content?.split("\n").map((e, index) => <div key={index}>{e}</div>)}</RightBoxContent>
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
