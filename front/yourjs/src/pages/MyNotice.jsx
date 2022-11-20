//Mynotice
import React from 'react';
import MyNoticeList from '../components/MyNotice/MyNoticeList';
import MyNoticeDetail from '../components/MyNotice/MyNoticeDetail';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 60%;
  
  
`;

const MyNotice = () => {

  
  return <Wrapper><MyNoticeList/></Wrapper>;
};

export default MyNotice;
