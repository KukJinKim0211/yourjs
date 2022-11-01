//Portfolio
import React from 'react';
import styled from 'styled-components';
import Personal from '../components/Portfolio/personal';
import Military from '../components/Portfolio/military';
import Education from '../components/Portfolio/education';
import Training from '../components/Portfolio/training';
import Certificate from '../components/Portfolio/certificate';
import Award from '../components/Portfolio/award';
import Career from '../components/Portfolio/career';
import Project from '../components/Portfolio/project';
import Sidebar from '../components/Portfolio/sidebar';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  /* margin-bottom: 100rem; */
  /* padding: 100px; */
`

const Box = styled.div`
  width: 60%;
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
  align-self: flex-end;
  margin-right: 5%;
  margin-top: 5%;
  font-size: 1.5rem;
  width: fit-content;
`

export { Wrapper, Box }

const Portfolio = () => {
  return (
    <Wrapper>
      <Wrapper>
        <Box>
          <Link to = 'edit'>
            <UpdatePofol>Edit</UpdatePofol>
          </Link>
          <Personal></Personal>
          <Military></Military>
          <Education></Education>
          <Training></Training>
          <Certificate></Certificate>
          <Award></Award>
          <Career></Career>
          <Project></Project>
        </Box>
        <Sidebar></Sidebar>
      </Wrapper>
      <br></br>
    </Wrapper>
  )
};

export default Portfolio;
