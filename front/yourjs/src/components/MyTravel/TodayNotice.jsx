// 메인 캘린더 > 오늘 마감 공고, 오늘 발표 공고

import React from 'react';
import styled from 'styled-components';
import TodayNoticeItem from './TodayNoticeItem';
import { colors } from '../../common/color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Wrapper = styled.div`
  width: 33%;
  height: 100%;
  background-color: ${colors.bsColor0};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;

const TitleDiv = styled.div`
  margin-top: 5%;
  width: 100%;
  height: 25%;
`;

const ContentDiv = styled.div`
  width: 100%;
  height: 75%;
`;

const EmptyDiv = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyText = styled.p`
  margin-top: -5px;
  font-size: 20px;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
`;

const EmptyButton = styled.button`
  width: 150px;
  height: 40px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: ${colors.bsColor3};
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
  &:hover {
    background-color: ${colors.bsColor4};
    color: rgba(0, 0, 0, 0.8);
  }
`;

const TitleText = styled.span`
  font-size: 20px;
  margin-top: 2%;
  margin-left: 5%;
  color: ${colors.bsColor4};
  user-select: none;
  font-weight: 600;
`;

const TodayNotice = ({ icon, title, data, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const noticeInsertClicked = () => {
    dispatch({ type: 'selected', select: 1 });
    sessionStorage.setItem('selectItem', 1);
    navigate('/calendar');
  };

  return (
    <Wrapper>
      <TitleDiv>
        <FontAwesomeIcon
          icon={icon}
          size="xl"
          className="fa-light"
          style={{ marginLeft: '20px' }}
          color={colors.bsColor4}
        />
        <TitleText id="titleFont">{title}</TitleText>
      </TitleDiv>
      {data.length === 0 ? (
        <EmptyDiv>
          <EmptyText id="contentFont">진행중인 과정이 없습니다.</EmptyText>
          <EmptyButton id="contentFont" onClick={() => noticeInsertClicked()}>
            공고등록
          </EmptyButton>
        </EmptyDiv>
      ) : (
        <ContentDiv>
          {data.map((content, index) => (
            <TodayNoticeItem key={index} content={content} type={type} />
          ))}
        </ContentDiv>
      )}
      {/* <ContentDiv>
        {data.map((content, index) => (
          <TodayNoticeItem key={index} content={content} type={type} />
        ))}
      </ContentDiv> */}
    </Wrapper>
  );
};

export default TodayNotice;
