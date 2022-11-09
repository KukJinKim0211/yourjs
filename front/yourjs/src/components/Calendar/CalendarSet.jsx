import React from 'react';
import styled from 'styled-components';
import { getYYMMDDFormat } from '../../common/date';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { colors } from '../../common/color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { subMonths, addMonths, startOfMonth, endOfMonth } from 'date-fns';

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

const ImageDiv = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    background-color: ${colors.bsColor1};
  }
`;

const CalendarSet = ({ searchDate, setSearchDate }) => {
  const prevButtonClicked = () => {
    setSearchDate(subMonths(searchDate, 1));
  };

  const nextButtonClicked = () => {
    setSearchDate(addMonths(searchDate, 1));
  };

  return (
    <Wrapper id="navBarFont">
      <ImageDiv
        style={{ marginRight: '30px' }}
        onClick={() => prevButtonClicked()}
      >
        <FontAwesomeIcon icon={faChevronLeft} color={colors.bsColor4} />
      </ImageDiv>
      {`${searchDate.getFullYear()}년 ${searchDate.getMonth() + 1}월`}
      <ImageDiv
        style={{ marginLeft: '30px' }}
        onClick={() => nextButtonClicked()}
      >
        <FontAwesomeIcon icon={faChevronRight} color={colors.bsColor4} />
      </ImageDiv>
    </Wrapper>
  );
};

export default CalendarSet;
