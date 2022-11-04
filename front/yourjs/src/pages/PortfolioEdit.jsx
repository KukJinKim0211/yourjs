import React, { useState } from 'react'
import { Wrapper } from './Portfolio';
import styled from 'styled-components';
import PersonalEdit from '../components/PortfolioEdit/PersonalEdit';
import MilitaryEdit from '../components/PortfolioEdit/MilitaryEdit';
import EducationEdit from '../components/PortfolioEdit/EducationEdit';
import TrainingEdit from '../components/PortfolioEdit/TrainingEdit';
import CertificateEdit from '../components/PortfolioEdit/CertificateEdit';
import AwardEdit from '../components/PortfolioEdit/AwardEdit';
import CareerEdit from '../components/PortfolioEdit/CareerEdit';
import ProjectEdit from '../components/PortfolioEdit/ProjectEdit';
import { fullWidth } from '../common/size';
import ProjectEditComponent from '../components/PortfolioEdit/ProjectEditComponent';

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

const PortfolioEdit = () => {
    const [openTab, setOpenTab] = useState(1);
    const menuArr = [
        { name: '인적사항', content: <PersonalEdit/> },
        { name: '병역사항', content: <MilitaryEdit/> },
        { name: '학력사항', content: <EducationEdit/> },
        { name: '교육사항', content: <TrainingEdit/> },
        { name: '자격증 / 어학', content: <CertificateEdit/> },
        { name: '수상내역', content: <AwardEdit/> },
        { name: '커리어', content: <CareerEdit/> },
        { name: '프로젝트', content: <ProjectEdit/>, component: <ProjectEditComponent/> },
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
                <li className={index === openTab ? "submenu focused" : "submenu"}
                onClick={() => selectMenuHandler(index)}>{el.name}</li>
              ))}
            </TabMenu>
        </Wrapper>
      </Wrapper>
    )
}

export default PortfolioEdit