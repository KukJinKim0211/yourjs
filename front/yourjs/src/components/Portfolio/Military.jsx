//병역사항
import React, {useState, useEffect} from 'react';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr} from '../../common/PorfoStyled';
import { apis } from '../../common/apis';
import axiosInstance from '../../common/customAxios';

const Military = () => {
  const [viewData, setViewData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(apis.military)
      .then(response => {
        setViewData(response.data);
      })
  }, []);

  return (
    <Container id='2'>
      <ContentTitle>🚅 병역사항</ContentTitle>
      <ContentSet>
        <Hr></Hr>
        {viewData?.map((el, index) => (
          <Content key={index}>
            <LeftBox>{el.startDate}<br/>~ {el.endDate}</LeftBox>
            <CenterBox></CenterBox>
            <RightBoxes>
              <RightBox>
                <RightBoxTitle>군별</RightBoxTitle>
                <RightBoxContent>{el.militaryType}</RightBoxContent>
              </RightBox>
              <RightBox>
                <RightBoxTitle>병과</RightBoxTitle>
                <RightBoxContent>{el.specialityType}</RightBoxContent>
              </RightBox>
              <RightBox>
                <RightBoxTitle>전역사유</RightBoxTitle>
                <RightBoxContent>{el.discharge}</RightBoxContent>
              </RightBox>
            </RightBoxes>
          </Content>
        ))}
      </ContentSet>
    </Container>
  )
};

export default Military;
