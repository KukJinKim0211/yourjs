// 메인 캘린더 > 실시간 타임
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../common/color';

const Wrapper = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: ${colors.bsColor0};
  border-radius: 15px;
  align-items: center;
`;

const TimeText = styled.p`
  font-size: 56px;
  color: ${colors.bsColor4};
`;

const CurrentTime = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const getTime = setInterval(() => {
      const date = new Date();
      const hour =
        date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      const minute =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      const second =
        date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
      setTime(`${hour}:${minute}:${second}`);
    }, 1000);
    return () => clearInterval(getTime);
  }, []);

  return (
    <Wrapper>
      <TimeText id="font_Gmarket">{time}</TimeText>
    </Wrapper>
  );
};

export default CurrentTime;
