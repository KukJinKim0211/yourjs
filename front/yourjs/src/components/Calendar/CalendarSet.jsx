import React from 'react';
import styled from 'styled-components';
import { getYYMMDDFormat } from '../../common/date';
import { colors } from '../../common/color';

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  color: ${colors.bsColor4};
  user-select: none;
`;

const CalendarSet = ({ searchDate }) => {
  return (
    <Wrapper id="navBarFont">{`${searchDate.getFullYear()}년 ${
      searchDate.getMonth() + 1
    }월`}</Wrapper>
  );
};

export default CalendarSet;
