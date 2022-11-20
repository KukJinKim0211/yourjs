//FindNotice
import React from 'react';
import FindUser from '../components/FindNotice/FindUser';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 1152px;
`;

const FindNotice = () => {
  return (
    <Wrapper>
      <FindUser></FindUser>
    </Wrapper>
  );
};

export default FindNotice;
