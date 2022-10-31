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
  margin: 60px auto;
  /* padding: 40px; */
  color: #1E1E1E;
  background-color: #FFF;
  box-shadow: rgba(0, 0, 0, 0.16) 0rem 1rem 4rem 0rem, rgba(0, 0, 0, 0.06) 0px 0px 0px 0.3rem;
  height: fit-content; 
  /* background-color: #ecdccf; */
  /* box-shadow: 0.5rem 0.5rem 0.5rem 0.5rem gray; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding-bottom: 10rem; */
  /* margin-bottom: 10rem; */
  /* margin: 2rem; */
`;


const Portfolio = () => {
  return (
  <Wrapper>
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
