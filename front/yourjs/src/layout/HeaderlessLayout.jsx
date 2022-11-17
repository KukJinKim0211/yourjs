import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../common/color';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: ${colors.bsColor0};
  @media only screen and (max-width: 1152px) {
    display: none;
  }
`;

const ErrorDiv = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.bsColor0};
  font-size: 42px;
  z-index: 999;
  @media only screen and (max-width: 1152px) {
    display: flex;
  }
  @media only screen and (min-width: 1153px) {
    display: none;
  }
`;

const HeaderlessLayout = () => {
  return (
    <>
      <Wrapper>
        <Outlet></Outlet>
      </Wrapper>
      <ErrorDiv id="titleFont">
        <FontAwesomeIcon icon={faPersonDigging} size="4x" />
        <div style={{ marginTop: '5%' }}></div>
        <span style={{ color: 'orange' }}>SORRY..</span>
        반응형 서비스 개발중
      </ErrorDiv>
    </>
  );
};

export default HeaderlessLayout;
