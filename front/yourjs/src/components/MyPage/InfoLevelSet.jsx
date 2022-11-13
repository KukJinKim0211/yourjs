// 공개범위설정
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../common/color';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';

const Wrapper = styled.div`
  background-color: ${colors.bsColor0};
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding-left: 5%;
`;

const TitleFont = styled.p`
  color: black;
  font-size: 24px;
  width: 94%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 15px;
`;

const SaveButton = styled.button`
  width: 200px;
  height: 40px;
  font-size: 18px;
  margin-bottom: 4%;
  background-color: ${props => props.color};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${props =>
      props.type === 0 ? colors.bsColor3 : 'rgba(0, 0, 0, 0.2)'};
  }
`;

const RadioDiv = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  font-size: 18px;
`;

const RadioButton = styled.input`
  background-color: red;
  display: inline;
  margin-right: 20px;
`;

const InfoLevelSet = () => {
  const [infoLevel, setInfoLevel] = useState('0');

  // 공개 범위 변경
  const changeInfoLevel = () => {
    axiosInstance
      .patch(apis.levelChange, { type: infoLevel })
      .then(response => {
        if (response.status === 200) alert('공개 범위가 변경되었습니다.');
      });
  };
  return (
    <Wrapper>
      <TitleFont>공개 범위 설정</TitleFont>
      <RadioDiv>
        <div style={{ display: 'flex' }}>
          <RadioButton
            type="radio"
            value="1"
            onChange={e => setInfoLevel(e.target.value)}
            checked={infoLevel === '1'}
          />
          전체 공개
        </div>
        <div style={{ display: 'flex', marginTop: '20px' }}>
          <RadioButton
            type="radio"
            value="2"
            onChange={e => setInfoLevel(e.target.value)}
            checked={infoLevel === '2'}
          />
          캘린더만 공개
        </div>
        <div style={{ display: 'flex', margin: '20px 0px' }}>
          <RadioButton
            type="radio"
            value="3"
            onChange={e => setInfoLevel(e.target.value)}
            checked={infoLevel === '3'}
          />
          전체 비공개
        </div>
      </RadioDiv>
      <SaveButton
        type={0}
        color={colors.bsColor4}
        id="contentFont"
        onClick={() => changeInfoLevel()}
      >
        저장하기
      </SaveButton>
    </Wrapper>
  );
};

export default InfoLevelSet;
