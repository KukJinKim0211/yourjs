import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../../App.css';
import { useState } from 'react';
import MyNoticeDetail from './MyNoticeDetail';
import { useEffect } from 'react';

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
  padding-top: 50px;
`;

const CreateButton = styled.div`
  border-radius: 10px;
  box-shadow: 0.1rem 0.1rem 0.1rem #5837D0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  background-color: #81C6E8;
  border-radius: 5px;

  :hover {
    background-color: #5DA7DB;
    box-shadow: 0.2rem 0.2rem 0.2rem #5837D0;
  }
`;

const dummyDataBasic = [
  {
    state: '진행중',
    title: '카카오',
    regDate: '2022.09.01',
  },
  {
    state: '면접탈락',
    title: '지우컴퍼니',
    regDate: '2022.09.01',
  },
  {
    state: '서류탈락',
    title: '네이버',
    regDate: '2022.09.01',
  },
  {
    state: '최종합격',
    title: '은행',
    regDate: '2022.09.01',
  },
  {
    state: '최종합격',
    title: '은행',
    regDate: '2022.09.01',
  },
  {
    state: '최종합격',
    title: '은행',
    regDate: '2022.09.01',
  },
];

const MyNoticeList = () => {
  const [detailFlag, setDetailFlag] = useState(false);
  const [dropdownState, setDropdownState] = useState('전체보기');
  const [dummyData, setDummyData] = useState(dummyDataBasic);

  const handleDropdownState = e => {
    setDropdownState(e.target.value);
  };

  const getItems = () => {
    if (dropdownState === '전체보기') {
      setDummyData(dummyDataBasic);
    }

    if (dropdownState === '진행중') {
      setDummyData(
        dummyDataBasic.filter(dummystate => dummystate.state === '진행중'),
      );
    }
    if (dropdownState === '면접탈락') {
      setDummyData(
        dummyDataBasic.filter(dummystate => dummystate.state === '면접탈락'),
      );
    }
    if (dropdownState === '서류탈락') {
      setDummyData(
        dummyDataBasic.filter(dummystate => dummystate.state === '서류탈락'),
      );
    }
    if (dropdownState === '최종합격') {
      setDummyData(
        dummyDataBasic.filter(dummystate => dummystate.state === '최종합격'),
      );
    }
  };

  const ChangeFlag = e => {
    setDetailFlag(!detailFlag);
  };

  useEffect(() => {
    getItems();
  }, [dropdownState]);

  return (
    <Wrapper id="font_test2">
      <br></br>
      <br></br>
      {/*자소서 작성 버튼을 우측 으로 하기위한 div */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link to="/notice/add" style={{ textDecoration: 'none' }}>
          <CreateButton>자소서 작성</CreateButton>
        </Link>
      </div>
      <div>
        <select defaultValue="전체보기" onChange={handleDropdownState}>
          <option  value="전체보기" >
            전체보기
          </option>
          <option value="진행중">진행중</option>
          <option value="서류탈락">서류탈락</option>
          <option value="최종합격">최종합격</option>
          <option value="면접탈락">면접탈락</option>
        </select>
      </div>
      {dummyData.map((dummy, index) => (
        <div key={index}>
          <Link to="/notice/detail" style={{ textDecoration: 'none' }}>
            <ItemList onClick={ChangeFlag}>
              <ItemGrid width="55%" marginLeft="5%">
                {dummy.title}
              </ItemGrid>

              <ItemGrid width="30%">{dummy.state}</ItemGrid>
              <ItemGrid width="15%">작성일 {dummy.regDate}</ItemGrid>
            </ItemList>
          </Link>
        </div>
      ))}
    </Wrapper>
  );
};

export default MyNoticeList;
