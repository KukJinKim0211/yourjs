import React from 'react';
import styled from 'styled-components';
import { colors } from '../../common/color';

const Wrapper = styled.div`
  width: 275px;
  height: 150px;
  display: flex;
  margin-bottom: 5%;
  justify-content: center;
  align-items: center;
`;

const NoticeDiv = styled.div`
  width: 250px;
  height: 140px;
  background-color: white;
  border: 1px solid ${colors.bsColor2};
  border-radius: 10px;
  &:hover {
    border: 2px solid ${colors.bsColor3};
    cursor: pointer;
  }
`;

const NoticeTitleDiv = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border-bottom: 1px solid ${colors.bsColor2};
`;

const NoticeContentDiv = styled.div`
  width: 100%;
  height: 75px;
  font-size: 15px;
`;

const NoticeDateDiv = styled.div`
  width: 100%;
  height: 25px;
  border-top: 1px solid ${colors.bsColor2};
  color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
`;

const RecommendNoticeDetail = ({ data }) => {
  return (
    <Wrapper>
      <NoticeDiv onClick={() => window.open(`${data.link}`)}>
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
