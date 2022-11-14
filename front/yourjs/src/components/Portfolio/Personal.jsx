//인적사항
import React, {useState, useEffect} from 'react';
import {Container, ContentTitle, ContentSet, Content, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr} from '../../common/PorfoStyled';
import { apis } from '../../common/apis';
import axiosInstance from '../../common/customAxios';


const Personal = () => {
  const [viewData, setViewData] = useState([]);
  const [detailData, setDetailData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(apis.portfolio)
      .then(response => {
        setViewData(response.data);
      })

    axiosInstance
      .get(apis.getUserDetailInfo)
      .then(response => {
        setDetailData(response.data);
      })
  }, []);


  return (
    <Container id='1'>
      <ContentTitle>🔖 인적사항</ContentTitle>
      <ContentSet>
        <Hr></Hr>
          <Content>
            <CenterBox></CenterBox>
            <RightBoxes>
              <RightBox>
                <RightBoxTitle>이름</RightBoxTitle>
                <RightBoxContent>{detailData.userName}</RightBoxContent>
              </RightBox>
              {detailData.email ? <RightBox>
                <RightBoxTitle>이메일</RightBoxTitle>
                <RightBoxContent>{detailData.email}</RightBoxContent>
              </RightBox> : ''}
              {viewData.cnName ? <RightBox>
                <RightBoxTitle>한자 이름</RightBoxTitle>
                <RightBoxContent>{viewData.cnName}</RightBoxContent>
              </RightBox> : ''}
              {viewData.engName ? <RightBox>
                <RightBoxTitle>영어 이름</RightBoxTitle>
                <RightBoxContent>{viewData.engName}</RightBoxContent>
              </RightBox> : ''}
              {viewData.techStacks ? <RightBox>
                <RightBoxTitle>기술스택</RightBoxTitle>
                <RightBoxContent>{viewData.techStacks}</RightBoxContent>
              </RightBox> : ''}
              {viewData.links ? <RightBox>
                <RightBoxTitle>외부 URL</RightBoxTitle>
                <RightBoxContent>{viewData.links?.split("\n").map((e, index) => <div key={index}>{e}</div>)}</RightBoxContent>
              </RightBox> : ''}
            </RightBoxes>
          </Content>
      </ContentSet>
    </Container>
  )
};

export default Personal;
