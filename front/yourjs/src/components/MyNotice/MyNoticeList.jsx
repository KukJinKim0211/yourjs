import React from 'react';
import styled from 'styled-components';

const MyNoticeList = () => {
  const dummyData = [
    {
      state: '진행중',
      title: '카카오',
    },
    {
      state: '진행중',
      title: '지우컴퍼니',
    },
  ];

  const ItemList = styled.div`
    display: flex;
    width: 100%;
    height: 100px;
    background-color: aquamarine;
    margin-top: 30px;
    border-radius: 15px;
    box-shadow: 0.5rem 0.5rem 0.5rem gray;
    &:hover {
      
      border-bottom: 3px solid black;
    }
    
    cursor: pointer;
  `;

  const ItemGrid = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
    display: flex;
    align-items: center;
    margin-left: ${props => props.marginLeft};
    font-size: 20px;
    background-color: ${props => props.color};
  `;

  const Wrapper = styled.div`
    width: 100%;
  `;

  console.log(dummyData);

  return (
    <Wrapper>
      <div>
        {dummyData.map((dummy, index) => (
          <ItemList>
            <ItemGrid width="70%" marginLeft="5%">
              {dummy.title}
            </ItemGrid>
            <ItemGrid width="30%">{dummy.state}</ItemGrid>
          </ItemList>
        ))}
      </div>
    </Wrapper>
  );
};

export default MyNoticeList;
