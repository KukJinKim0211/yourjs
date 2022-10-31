import React, { useState } from 'react'
import { Wrapper } from './Portfolio';
import styled from 'styled-components';
import Personal from '../components/Portfolio/personal';
import Military from '../components/Portfolio/military';
import Education from '../components/Portfolio/education';
import Training from '../components/Portfolio/training';
import Certificate from '../components/Portfolio/certificate';
import Award from '../components/Portfolio/award';
import Career from '../components/Portfolio/career';
import ProjectEdit from '../components/PortfolioEdit/projectedit';
import Sidebar from '../components/Portfolio/sidebar';

const Box = styled.div`
  width: 60%;
  height: fit-content;
  margin: 60px auto;
  color: #1E1E1E;
  background-color: #FFF;
  box-shadow: rgba(0, 0, 0, 0.16) 0rem 1rem 4rem 0rem, rgba(0, 0, 0, 0.06) 0px 0px 0px 0.3rem;
  display: flex;
  align-items: center;
`;

const TabMenu = styled.ul`
  background-color: #dcdcdc;
  color: rgb(232, 234, 237);
  font-weight: bold;
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

  .submenu {
  // 기본 Tabmenu 에 대한 CSS를 구현
    width: 50%;
    padding: 1rem;
    font-size: 1rem;
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
  /* text-align: center; */
  width: 100%;
  /* margin: 60px auto; */
  margin: 1.5rem;
`;

const PortfolioEdit = () => {
    const [openTab, setOpenTab] = useState(1);
    const menuArr = [
        // { name: 'Tab1', content: 'Tab menu ONE' },
        { name: '인적사항', content: <Personal/> },
        { name: '병역사항', content: <Military/> },
        { name: '학력사항', content: 'Tab menu THREE' },
        { name: '교육사항', content: 'Tab menu THREE' },
        { name: '자격증/어학', content: 'Tab menu THREE' },
        { name: '수상내역', content: 'Tab menu THREE' },
        { name: '커리어', content: 'Tab menu THREE' },
        { name: '프로젝트', content: <ProjectEdit/> },
    ];
    const selectMenuHandler = (index) => {
        setOpenTab(index);
    };

    return (
      <Wrapper>
        <Wrapper>
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
        <br/>
      </Wrapper>
    )
}

export default PortfolioEdit