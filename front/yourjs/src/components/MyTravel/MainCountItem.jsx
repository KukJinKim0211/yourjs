// 취업여정 > 컴포넌트

import React from 'react';
import styled from 'styled-components';
import { colors } from '../../common/color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Wrapper = styled.div`
  width: 23.5%;
  height: 100%;
  background-color: ${props => props.backColor};
  border-radius: 15px;
  display: flex;
`;

const TitleContentDiv = styled.div`
  width: 50%;
  height: 100%;
  padding-left: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageDiv = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleDiv = styled.div`
  height: 45%;
`;

const ContentDiv = styled.div`
  height: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.p`
  font-size: 20px;
  color: ${props => props.color};
  font-weight: 600;
  opacity: 100%;
`;

const ContentText = styled.p`
  height: 50%;
  width: 100%;
  font-size: 17px;
  color: black;
  cursor: pointer;
  font-weight: 500;
`;

const MainCountItem = ({ data, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 항목 클릭 이벤트
  const contentClicked = () => {
    if (type === 0) {
      dispatch({ type: 'selected', select: 2 });
      sessionStorage.setItem('selectItem', 6);
      navigate('/notice', {
        state: {
          type: 0,
        },
      });
    } else if (type === 1) {
      dispatch({ type: 'selected', select: 2 });
      sessionStorage.setItem('selectItem', 6);
      navigate('/notice', {
        state: {
          type: 1,
        },
      });
    } else if (type === 2) {
      dispatch({ type: 'selected', select: 2 });
      sessionStorage.setItem('selectItem', 6);
      navigate('/notice', {
        state: {
          type: 2,
        },
      });
    } else {
      dispatch({ type: 'selected', select: 6 });
      sessionStorage.setItem('selectItem', 6);
      navigator('/MyPage');
    }
  };
  return (
    <Wrapper backColor={colors.bsColor0}>
      <TitleContentDiv>
        <TitleDiv>
          <TitleText color={colors.bsColor4} id="titleFont">
            {data?.title}
          </TitleText>
        </TitleDiv>
        <ContentDiv>
          <ContentText
            color={colors.bsColor4}
            id="contentFont"
            onClick={() => contentClicked()}
          >
            {data?.content}
          </ContentText>
        </ContentDiv>
      </TitleContentDiv>
      {data?.icon !== null && (
        <ImageDiv>
          <FontAwesomeIcon
            icon={data?.icon}
            size="3x"
            color={colors.bsColor4}
          />
        </ImageDiv>
      )}
    </Wrapper>
  );
};

export default MainCountItem;
