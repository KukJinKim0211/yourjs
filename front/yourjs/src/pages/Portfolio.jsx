//Portfolio
import React from 'react';
import styled from 'styled-components';
import Personal from '../components/Portfolio/Personal';
import Military from '../components/Portfolio/Military';
import Graduation from '../components/Portfolio/Graduation';
import Education from '../components/Portfolio/Education';
import Certificate from '../components/Portfolio/Certificate';
import Award from '../components/Portfolio/Award';
import Career from '../components/Portfolio/Career';
import Project from '../components/Portfolio/Project';
import Sidebar from '../components/Portfolio/Sidebar';
import { Link } from 'react-router-dom';
import { fullWidth } from '../common/size';
import { colors } from '../common/color';

const Wrapper = styled.div`
  width: 100%;
`

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

const UpdatePofol = styled.div`
  color: ${colors.bsColor4};
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  padding: 1rem 0 1rem 0;
  width: 9rem; 
  height: fit-content;
  position: fixed; 
  top: 12%;
  /* margin-left: 73%;  */
  margin-left: 1400px;
  user-select: none;
  cursor: pointer;
  font-family: 'GmarketSansMedium';
  border-radius: 1rem;
  border: 1px solid ${colors.bsColor3};
  :hover {
    background-color: ${colors.bsColor1};
  }
`

export { Wrapper, Box }


const Portfolio = () => {
  return (
    <Wrapper>
      <Wrapper>
        <Box>
          <br></br><br></br>
          <UpdatePofol>
            <Link to = 'edit' style={{textDecoration:"none", color:"orange"}}>⚙ 수정</Link>
          </UpdatePofol>
          <Personal/>
          <Military/>
          <Graduation/>
          <Education/>
          <Certificate/>
          <Award/>
          <Career/>
          <Project/>
          <br></br><br></br>
        </Box>
        <Sidebar/>
      </Wrapper>
      <br></br><br></br>
    </Wrapper>
  )
};

export default Portfolio;
