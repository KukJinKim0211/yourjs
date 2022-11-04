import { faBorderNone } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import './style.css';

const Wrapper = styled.div`
  width: 100%;
  height: 120px;
  border: 0.5px solid rgba(0, 0, 0, 0.08);
  border-collapse: collapse;
  display: table;
  /* &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  } */

  background-color: ${props =>
    props.color % 7 === 1 || props.color % 7 === 0
      ? 'rgba(0, 0, 0, 0.03)'
      : 'white'};
`;

const TitleDiv = styled.div`
  padding-top: 2px;
  height: 25px;
  user-select: none;
  display: flex;
  justify-content: space-between;
`;

const InsertButtonDiv = styled.div`
  padding-left: 5px;
  color: rgba(0, 0, 0, 0.4);
`;

const InsertButton = styled.button`
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const DayDiv = styled.div`
  font-size: 14px;
  padding-right: 5px;
`;

const ContentDiv = styled.div`
  width: 92%;
  margin-left: 4%;
  margin-right: 4%;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  height: 40px;
  font-size: 14px;
  user-select: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const DayCalendar = ({ dayData }) => {
  const hoverOver = e => {
    const button = e.currentTarget.children[0].children[0].children[0];
    button.classList.remove('buttonView');
  };

  const hoverOut = e => {
    const button = e.currentTarget.children[0].children[0].children[0];
    button.classList.add('buttonView');
  };
  return (
    <Wrapper
      onMouseOver={e => hoverOver(e)}
      onMouseOut={e => hoverOut(e)}
      color={dayData.id}
    >
      <TitleDiv>
        <InsertButtonDiv>
          <InsertButton className="buttonView">
            <span style={{ color: 'rgba(0, 0, 0, 0.5)', fontSize: '16px' }}>
              +
            </span>
          </InsertButton>
        </InsertButtonDiv>
        <DayDiv id="titleFont">{dayData.day === 0 ? null : dayData.day}</DayDiv>
      </TitleDiv>
      <div style={{ height: '5%' }}></div>
      <ContentDiv id="font_pretendard">
        {'현대오토에버'}
        <br></br>
        {'서류마감'}
      </ContentDiv>
    </Wrapper>
  );
};

export default DayCalendar;
