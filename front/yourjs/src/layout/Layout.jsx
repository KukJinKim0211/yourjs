import { Outlet } from 'react-router-dom';
import Header from './Header';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../common/color';

const LayoutDiv = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  font-size: 42px;
  z-index: 999;
  @media only screen and (max-width: 1152px) {
    display: flex;
  }
  @media only screen and (min-width: 1153px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  background-color: white;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 3;
  /* @media only screen and (max-width: 1152px) {
    background-color: red;
    display: none;
  } */
`;

const HeaderDiv = styled.div`
  width: 100%;
  height: 108px;
  display: flex;
  justify-content: center;
`;

const OutletDiv = styled.div`
  width: 100%;
  min-height: calc(100vh - 108px);
  display: flex;
  justify-content: center;
`;

const Layout = () => {
  return (
    <>
      <LayoutDiv>
        <Wrapper>
          <HeaderDiv>
            <Header></Header>
          </HeaderDiv>
          <OutletDiv>
            <Outlet></Outlet>
          </OutletDiv>
        </Wrapper>
      </LayoutDiv>
      <ErrorDiv id="titleFont">
        <FontAwesomeIcon icon={faPersonDigging} size="4x" />
        <div style={{ marginTop: '5%' }}></div>
        <span style={{ color: 'orange' }}>SORRY..</span>
        반응형 서비스 개발중
      </ErrorDiv>
    </>
  );
};

export default Layout;
