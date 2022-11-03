import React from 'react';
import styled from 'styled-components';
import { colors } from '../../common/color';

const Wrapper = styled.div`
  width: 275px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoticeDiv = styled.div`
  width: 250px;
  height: 140px;
  background-color: aliceblue;
  border: 1px solid rgba(0, 0, 0, 0.2);
  &:hover {
    border: 2px solid rgba(0, 0, 0, 0.5);
  }
`;

const NoticeTitleDiv = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.bsColor2};
  font-size: 18px;
`;

const NoticeContentDiv = styled.div`
  width: 100%;
  height: 80px;
  background-color: ${colors.bsColor1};
  font-size: 14px;
`;

const NoticeDateDiv = styled.div`
  width: 100%;
  height: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
`;

const RecommendNoticeDetail = ({ data }) => {
  return (
    <Wrapper>
      <NoticeDiv>
        <NoticeTitleDiv id="contentFont">{data.title}</NoticeTitleDiv>
        <NoticeContentDiv id="contentFont">
          <div style={{ padding: '5px' }}>{data.content}</div>
        </NoticeContentDiv>
        <NoticeDateDiv id="contentFont">
          <div style={{ paddingLeft: '10px' }}>D-1</div>
          <div style={{ paddingRight: '10px' }}>
            ~{data.date.substring(5, 19)}
          </div>
        </NoticeDateDiv>
      </NoticeDiv>
    </Wrapper>
  );
};

export default RecommendNoticeDetail;
