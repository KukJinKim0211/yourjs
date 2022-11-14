//자격증, 어학
import React, {useState, useEffect} from 'react';
import {Container, ContentTitle, ContentSet, Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr} from '../../common/PorfoStyled';
import { apis } from '../../common/apis';
import axiosInstance from '../../common/customAxios';


const Certificate = () => {
  const [viewData, setViewData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(apis.certificate)
      .then(response => {
        setViewData(response.data);
      })
  }, []);

  return (
    <Container id='5'>
      <ContentTitle>📖 자격증/어학</ContentTitle>
      <ContentSet>
        <Hr></Hr>
        {viewData?.map((el, index) => (
          <Content key={index}>
            <LeftBox>{el.acquisitionDate}</LeftBox>
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
            </RightBoxes>
          </Content>
        ))}
      </ContentSet>
    </Container>
  )
};

export default Certificate;
