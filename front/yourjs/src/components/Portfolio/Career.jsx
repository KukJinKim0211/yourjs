//커리어
import React, {useState, useEffect} from 'react';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr} from '../../common/PorfoStyled';
import { apis } from '../../common/apis';
import axiosInstance from '../../common/customAxios';


const Career = () => {
  const [viewData, setViewData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(apis.career)
      .then(response => {
        setViewData(response.data);
      })
  }, []);

  return (
    <Container id='7'>
      <ContentTitle>📈 커리어</ContentTitle>
      <ContentSet>
        <Hr></Hr>
        {viewData?.map((el, index) => (
          <Content key={index}>
            <LeftBox>{el.startDate}<br/>~ {el.endDate}</LeftBox>
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
              {el.salary ? <RightBox>
                <RightBoxTitle>연봉</RightBoxTitle>
                <RightBoxContent>{el.salary}만원</RightBoxContent>
              </RightBox> : ''}
            </RightBoxes>
          </Content>
        ))}
      </ContentSet>
    </Container>
  )
};

export default Career;
