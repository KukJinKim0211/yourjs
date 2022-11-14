//수상내역
import React, {useState, useEffect} from 'react';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr} from '../../common/PorfoStyled';
import { apis } from '../../common/apis';
import axiosInstance from '../../common/customAxios';


const Award = () => {
  const [viewData, setViewData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(apis.award)
      .then(response => {
        setViewData(response.data);
      })
  }, []);

  return (
    <Container id='6'>
      <ContentTitle>🥇 수상내역</ContentTitle>
      <ContentSet>
        <Hr></Hr>
        {viewData?.map((el, index) => (
          <Content key={index}>
            <LeftBox>{el.winDate}</LeftBox>
            <CenterBox></CenterBox>
            <RightBoxes>
              <RightBox>
                <RightBoxTitle>수상명</RightBoxTitle>
                <RightBoxContent>{el.awardName}</RightBoxContent>
              </RightBox>
              <RightBox>
                <RightBoxTitle>수상내용</RightBoxTitle>
                <RightBoxContent>{el.awardContents?.split("\n").map((e, index) => <div key={index}>{e}</div>)}</RightBoxContent>
              </RightBox>
              <RightBox>
                <RightBoxTitle>수상기관</RightBoxTitle>
                <RightBoxContent>{el.awardInstitution}</RightBoxContent>
              </RightBox>
            </RightBoxes>
          </Content>
        ))}
      </ContentSet>
    </Container>
  )
};

export default Award;
