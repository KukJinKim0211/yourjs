//학력사항
import React, {useState, useEffect} from 'react';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr} from '../../common/PorfoStyled';
import { apis } from '../../common/apis';
import axiosInstance from '../../common/customAxios';


const Graduation = () => {
  const [viewData, setViewData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(apis.graduation)
      .then(response => {
        setViewData(response.data);
      })
  }, []);

  return (
    <Container id='3'>
      <ContentTitle>🎓 학력사항</ContentTitle>
      <ContentSet>
        <Hr></Hr>
        {viewData?.map((el, index) => (
          <Content key={index}>
            <LeftBox>{el.startDate}<br/>~ {el.endDate}</LeftBox>
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
              {el.majorName ? <RightBox>
                <RightBoxTitle>전공</RightBoxTitle>
                <RightBoxContent>{el.majorName}</RightBoxContent>
              </RightBox> : ''}
              {el.doubleMajorName ? <RightBox>
                <RightBoxTitle>복수전공</RightBoxTitle>
                <RightBoxContent>{el.doubleMajorName}</RightBoxContent>
              </RightBox> : ''}
              {el.subMajorName ? <RightBox>
                <RightBoxTitle>부전공</RightBoxTitle>
                <RightBoxContent>{el.subMajorName}</RightBoxContent>
              </RightBox> : ''}
              {el.majorCredit ? <RightBox>
                <RightBoxTitle>전공 이수학점</RightBoxTitle>
                <RightBoxContent>{el.majorCredit}</RightBoxContent>
              </RightBox> : ''}
              {el.totCredit ? <RightBox>
                <RightBoxTitle>총 이수학점</RightBoxTitle>
                <RightBoxContent>{el.totCredit}</RightBoxContent>
              </RightBox> : ''}
              {el.majorAvgCredit ? <RightBox>
                <RightBoxTitle>전공 평점</RightBoxTitle>
                <RightBoxContent>{el.majorAvgCredit}</RightBoxContent>
              </RightBox> : ''}
              {el.totAvgCredit ? <RightBox>
                <RightBoxTitle>총 평점</RightBoxTitle>
                <RightBoxContent>{el.totAvgCredit}</RightBoxContent>
              </RightBox> : ''}
            </RightBoxes>
          </Content>
        ))}
      </ContentSet>
    </Container>
  )
};

export default Graduation;
