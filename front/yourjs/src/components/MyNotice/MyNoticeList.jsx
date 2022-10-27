import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../../App.css';
import { useState } from 'react';

// 아이템 리스트
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
// 아이템 나누기
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

const CreateButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  background-color: red;
  border-radius: 5px;
`;

const MyNoticeList = () => {
  const [detailFlag,setDetailFlag] = useState(false);


  const ChangeFlag = () => {
    setDetailFlag(!detailFlag);
  }
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

  return (
    <Wrapper id="font_test2">
      {/*자소서 작성 버튼을 우측 으로 하기위한 div */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link to="/notice/add" style={{ textDecoration: "none" }} >
          <CreateButton>자소서 작성</CreateButton>
        </Link>
      </div>
      {dummyData.map((dummy, index) => (
        <ItemList onClick={ChangeFlag}>
          <ItemGrid width="70%" marginLeft="5%">
            {dummy.title}
          </ItemGrid>
          <ItemGrid width="30%">{dummy.state}</ItemGrid>
        </ItemList>
        
        
      )
      )}
    </Wrapper>
  );
};

export default MyNoticeList;
