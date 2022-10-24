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


const Wrapper = styled.div`
  width: 60%;
  background-color: #f0e2d4;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Portfolio = () => {
  return (
  <Wrapper>
    Portfolio
    <Personal></Personal>
    <Military></Military>
    <Education></Education>
    <Training></Training>
    <Certificate></Certificate>
    <Award></Award>
    <Career></Career>
    <Project></Project>
  </Wrapper>
  )
};

export default Portfolio;
