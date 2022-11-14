import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import { colors } from '../../common/color';


const SideMenu = styled.ul`
  background-color: ${colors.bsColor2};
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
`;

const Hover = styled.div`
  :hover {
    color: black;
    background-color: white;
    width: 80%;
    text-align: center;
    border-radius: 1rem;
  }
`

const Sidebar = () => {
  return (
    <SideMenu>
      <Hover>
        <Link to = '1' offset={-100}>
          <h3>인적사항</h3>
        </Link>
      </Hover>
      <Hover>
        <Link to = '2' offset={-100}>
          <h3>병역사항</h3>
        </Link>
      </Hover>
      <Hover>
        <Link to = '3' offset={-100}>
          <h3>학력사항</h3>
        </Link>
      </Hover>
      <Hover>
        <Link to = '4' offset={-100}>
          <h3>교육사항</h3>
        </Link>
      </Hover>
      <Hover>
        <Link to = '5' offset={-100}>
          <h3>자격증/어학</h3>
        </Link>
      </Hover>
      <Hover>
        <Link to = '6' offset={-100}>
          <h3>수상내역</h3>
        </Link>
      </Hover>
      <Hover>
        <Link to = '7' offset={-100}>
          <h3>커리어</h3>
        </Link>
      </Hover>
      <Hover>
        <Link to = '8' offset={-100}>
          <h3>프로젝트</h3>
        </Link>
      </Hover>
    </SideMenu>
    )
}


export default Sidebar;