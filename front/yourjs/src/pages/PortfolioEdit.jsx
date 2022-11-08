import React, { useState } from 'react'
import { Wrapper } from './Portfolio';
import styled from 'styled-components';
import PersonalEdit from '../components/PortfolioEdit/PersonalEdit';
import MilitaryEdit from '../components/PortfolioEdit/MilitaryEdit';
import EducationEdit from '../components/PortfolioEdit/EducationEdit';
import EducationEditComponent from '../components/PortfolioEdit/EducationEditComponent';
import TrainingEdit from '../components/PortfolioEdit/TrainingEdit';
import TrainingEditComponent from '../components/PortfolioEdit/TrainingEditComponent';
import CertificateEdit from '../components/PortfolioEdit/CertificateEdit';
import CertificateEditComponent from '../components/PortfolioEdit/CertificateEditComponent';
import AwardEdit from '../components/PortfolioEdit/AwardEdit';
import AwardEditComponent from '../components/PortfolioEdit/AwardEditComponent';
import CareerEdit from '../components/PortfolioEdit/CareerEdit';
import CareerEditComponent from '../components/PortfolioEdit/CarrerEditComponent';
import ProjectEdit from '../components/PortfolioEdit/ProjectEdit';
import ProjectEditComponent from '../components/PortfolioEdit/ProjectEditComponent';
import { fullWidth } from '../common/size';
import { useEffect } from 'react';
import axiosInstance from '../common/customAxios';
import { apis } from '../common/apis';


const Box = styled.div`
  width: ${fullWidth};
  height: fit-content;
  margin: 60px auto;
  color: #1E1E1E;
  background-color: #FFF;
  box-shadow: rgba(0, 0, 0, 0.16) 0rem 1rem 4rem 0rem, rgba(0, 0, 0, 0.06) 0px 0px 0px 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TabMenu = styled.ul`
  background-color: #d4e1f5;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  padding: 1rem 0 1rem 0;
  width: 9rem; 
  height: fit-content;
  position: fixed; 
  top: 20%;
  margin-left: 83%; 
  user-select: none;
  cursor: pointer;
  font-family: 'GmarketSansMedium';
  border-radius: 1rem;

  .submenu {
  // 기본 Tabmenu 에 대한 CSS를 구현
    width: 70%;
    padding: 1rem;
    font-size: 1.3rem;
    transition: 0.5s;
    border-radius: 1rem;
    text-align: center;
  }

  .focused {
   //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: rgb(255,255,255);
    color: rgb(21,20,20);
  }

  & div.desc {
    text-align: center;
  }
`;

const BoxContent = styled.div`
  width: 100%;
  margin: 1.5rem;
`;

const apiSequence = [
  apis.portfolio, apis.military, apis.graduate, apis.education, apis.certificate ,apis.award, apis.career, apis.project
]

const PortfolioEdit = () => {
  
    const [openTab, setOpenTab] = useState(0);
    const [viewData, setViewData] = useState([]);
    useEffect(() => {
      setViewData()
    }, [])

    //토탈 데이터 받아오는 함수
    const getServerData = () => {
      axiosInstance
        .get(apiSequence[openTab])
        .then(response => setViewData(response.data))
    }

    useEffect(() => {

    }, [viewData])

    useEffect(() => {
      getServerData(openTab)
    }, [])

    useEffect(() => {
      console.log("오픈탭====================", openTab);
      getServerData(openTab);
    }, [openTab])

    const menuArr = [
        { name: '인적사항', content: <PersonalEdit/> },
        { name: '병역사항', content: <MilitaryEdit/> },
        { name: '학력사항', content: <EducationEdit/>, component: <EducationEditComponent/> },
        { name: '교육사항', content: <TrainingEdit/>, component: <TrainingEditComponent/> },
        { name: '자격증 / 어학', content: <CertificateEdit/>, component: <CertificateEditComponent/> },
        { name: '수상내역', content: <AwardEdit/>, component: <AwardEditComponent/> },
        { name: '커리어', content: <CareerEdit/>, component: <CareerEditComponent/>},
        { name: '프로젝트', content: <ProjectEdit dataArr={viewData} getServerData={getServerData}/>, component: <ProjectEditComponent getServerData={getServerData}/> },
    ];

    const selectMenuHandler = (index) => {
        setOpenTab(index);
        
    };

    return (
      <Wrapper>
        <Wrapper>
          <Box>
            <BoxContent>
              {menuArr[openTab].component}
            </BoxContent>
          </Box>
          <Box>
            <BoxContent>
              {menuArr[openTab].content}
            </BoxContent>
          </Box>
          <TabMenu>
              {menuArr.map((el, index) => (
                <li key={index} className={index === openTab ? "submenu focused" : "submenu"}
                onClick={() => selectMenuHandler(index)
                }>{el.name}</li>
              ))}
            </TabMenu>
        </Wrapper>
      </Wrapper>
    )
}

export default PortfolioEdit