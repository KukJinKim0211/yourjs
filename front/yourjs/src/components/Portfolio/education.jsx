//교육사항
import React, {useState, useEffect} from 'react';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr} from '../../common/PorfoStyled';
import { apis } from '../../common/apis';
import axiosInstance from '../../common/customAxios';


const Education = () => {
  const [viewData, setViewData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(apis.education)
      .then(response => {
        setViewData(response.data);
      })
  }, []);

  return (
    <Container id='4'>
      <ContentTitle>🔥 교육사항</ContentTitle>
      <ContentSet>
        <Hr></Hr>
        {viewData?.map((el, index) => (
          <Content key={index}>
            <LeftBox>{el.startDate}<br/>~ {el.endDate}</LeftBox>
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
                <RightBoxContent>{el.eduTime} 시간</RightBoxContent>
              </RightBox>
              <RightBox>
                <RightBoxTitle>교육내용</RightBoxTitle>
                <RightBoxContent>{el.eduContents?.split("\n").map((e, index) => <div key={index}>{e}</div>)}</RightBoxContent>
              </RightBox>
            </RightBoxes>
          </Content>
        ))}
      </ContentSet>
    </Container>
  )
};

export default Education;
