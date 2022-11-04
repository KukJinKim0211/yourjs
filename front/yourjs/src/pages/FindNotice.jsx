//FindNotice
import React from 'react';
import FindNoticeIndex from '../components/FindNotice/FindNoticeIndex';
import styled from 'styled-components';



const Wrapper = styled.div`
        width: 1152px;
    `

const FindNotice = () => {
  return <Wrapper><FindNoticeIndex></FindNoticeIndex></Wrapper>;
};

export default FindNotice;
