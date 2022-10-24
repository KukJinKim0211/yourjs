//Mynotice
import React from 'react';
import MyNoticeList from '../components/MyNotice/MyNoticeList';
import styled from 'styled-components';

const MyNotice = () => {

  const Wrapper = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  
`;
  return <Wrapper><MyNoticeList></MyNoticeList></Wrapper>;
};

export default MyNotice;
