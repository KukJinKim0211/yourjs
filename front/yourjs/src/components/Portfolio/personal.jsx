//인적사항
import React, {useState, useEffect} from 'react';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr,
  ChangeButton, DelButton, customStyles, ModalForm, ModalTitle, ModalContent, ModalContentArea, ModalContentDate, InsertBtnDiv, InsertBtn, BoxInput, BoxArea, SaveButton, Essential, EssentialDate} from '../../common/PorfoStyled';
import { apis } from '../../common/apis';
import axiosInstance from '../../common/customAxios';


const Personal = () => {
  // const [viewData, setViewData] = useState([]);

  // useEffect(() => {
  //   axiosInstance
  //     .get(apis.portfolio)
  //     .then(response => {
  //       setViewData(response.data);
  //     })
  // }, []);

  return (
    <Container id='1'>
      <ContentTitle>🔖 인적사항</ContentTitle>
      {/* <ContentSet>
        <Hr></Hr>
        {viewData?.map((el, index) => (
          <Content key={index}>
            <LeftBox></LeftBox>
            <CenterBox></CenterBox>
            <RightBoxes>
              <RightBox>
                <RightBoxTitle>한자 이름</RightBoxTitle>
                <RightBoxContent>{el.cnName}</RightBoxContent>
              </RightBox>
              <RightBox>
                <RightBoxTitle>영어 이름</RightBoxTitle>
                <RightBoxContent>{el.engName}</RightBoxContent>
              </RightBox>
              <RightBox>
                <RightBoxTitle>기술스택</RightBoxTitle>
                <RightBoxContent>{el.techStacks}</RightBoxContent>
              </RightBox>
              <RightBox>
                <RightBoxTitle>외부 URL</RightBoxTitle>
                <RightBoxContent>{el.links}</RightBoxContent>
              </RightBox>
            </RightBoxes>
          </Content>
        ))}
      </ContentSet> */}
    </Container>
  )
};

export default Personal;
