//νλ‘μ νΈ
import React, {useState, useEffect} from 'react';
import {Container, ContentTitle, ContentSet, Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr, NoData} from '../../common/PorfoStyled';
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
      <ContentTitle>π νλ‘μ νΈ</ContentTitle>
      <ContentSet>
        <Hr></Hr>
        {viewData.length ? 
          <div>
            {viewData?.map((el, index) => (
              <Content key={index}>
                <LeftBox>{el.startDate}<br/>~ {el.endDate}</LeftBox>
                <CenterBox></CenterBox>
                <RightBoxes>
                  <RightBox>
                    <RightBoxTitle>νλ‘μ νΈλͺ</RightBoxTitle>
                    <RightBoxContent>{el.projectName}</RightBoxContent>
                  </RightBox>
                  <RightBox>
                    <RightBoxTitle>μμλͺ</RightBoxTitle>
                    <RightBoxContent>{el.belongs}</RightBoxContent>
                  </RightBox>
                  <RightBox>
                    <RightBoxTitle>μ¬μ©κΈ°μ </RightBoxTitle>
                    <RightBoxContent>{el.tools}</RightBoxContent>
                  </RightBox>
                  <RightBox>
                    <RightBoxTitle>λ΄μ©</RightBoxTitle>
                    <RightBoxContent>{el.content?.split("\n").map((e, index) => <div key={index}>{e}</div>)}</RightBoxContent>
                  </RightBox>
                </RightBoxes>
              </Content>
            ))}
          </div> : 
          <NoData>λ±λ‘λ μ λ³΄κ° μμ΅λλ€.</NoData>
        }
      </ContentSet>
    </Container>
  )
};


export default Project;