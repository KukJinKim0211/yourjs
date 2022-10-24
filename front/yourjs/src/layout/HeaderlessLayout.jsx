import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const HeaderlessLayout = () => {
  return (
    <Wrapper>
      <Outlet></Outlet>
    </Wrapper>
  );
};

export default HeaderlessLayout;
