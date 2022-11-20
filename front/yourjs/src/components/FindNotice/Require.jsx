import React from 'react';
import styled from 'styled-components';
import { colors } from '../../common/color';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleDiv = styled.div`
  width: 60%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const TitleText = styled.p`
  font-size: 22px;
`;

const TitleSpan = styled.span`
  color: ${props => props.color};
`;

const ContentDiv = styled.div`
  width: 60%;
  height: 200px;
  display: flex;
  align-items: center;
`;

const ContentDiv2 = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 0px 30px;
`;

const ContentButton = styled.button`
  font-size: 20px;
  height: 50px;

  background-color: ${colors.bsColor3};
  border: 1px solid ${colors.bsColor3};
  border-radius: 10px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${colors.bsColor4};
    color: black;
  }
`;

const Require = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const linkButtonClicked = type => {
    dispatch({ type: 'selected', select: 6 });
    sessionStorage.setItem('selectItem', 6);
    if (type === 1) {
      navigator('/mypage', {
        state: {
          menuItem: 1,
        },
      });
    } else {
      navigator('/mypage', {
        state: {
          menuItem: 5,
        },
      });
    }
  };
  return (
    <Wrapper>
      <TitleDiv>
        <TitleText id="titleFont">
          이 서비스를 이용하기 위해서는{' '}
          <TitleSpan color={colors.bsColor3}>관심분야 설정</TitleSpan>과{' '}
          <TitleSpan color={colors.bsColor3}>정보공개 동의</TitleSpan>가
          필요합니다.
        </TitleText>
      </TitleDiv>
      <ContentDiv>
        <ContentDiv2>
          <ContentButton onClick={() => linkButtonClicked(1)}>
            관심분야설정
          </ContentButton>
        </ContentDiv2>
        <ContentDiv2>
          <ContentButton onClick={() => linkButtonClicked(2)}>
            정보공개동의
          </ContentButton>
        </ContentDiv2>
      </ContentDiv>
    </Wrapper>
  );
};

export default Require;
