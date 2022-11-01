import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../../App.css';
import { useState } from 'react';
import MyNoticeDetail from './MyNoticeDetail';
import { useEffect } from 'react';

// 아이템 리스트
const ItemList = styled.div`
  width: 250px;
  display: flex;

  flex-direction: column;
  color: black;
  height: 300px;
  background-color: #f8ede3;
  margin-top: 30px;
  border-radius: 10%;
  box-shadow: 0.5rem 0.5rem 0.5rem gray;
  .state {
    justify-content: center;
    padding-left: 30%;
  }
  .regdate {
    justify-content: center;
    padding-left: 25%;
    padding-top: 3%;
  }

  &:hover {
    box-shadow: 0.5rem 0.5rem 0.5rem #b2b2b2;
  }

  cursor: pointer;
`;
// 아이템 나누기
const ItemGrid = styled.div`
  font-weight: 600;
  width: ${props => props.width};
  height: ${props => props.height};
  display: flex;
  justify-content: center;
  margin-left: ${props => props.marginLeft};
  margin-top: ${props => props.marginTop};
  font-size: 20px;
  background-color: ${props => props.backgrounColor};
`;

const ItemGrid2 = styled.div`
  width: 100px;
  height: 200px;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const ListTotal = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  margin-bottom: 10%;
  row-gap: 100px;
  column-gap: 100px;
  grid: '. . .';
  justify-content: space-between;
`;

const CreateButton = styled.div`
  border-radius: 10px;
  box-shadow: 0.1rem 0.1rem 0.1rem #5837d0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  background-color: #81c6e8;
  border-radius: 5px;

  :hover {
    background-color: #5da7db;
    box-shadow: 0.2rem 0.2rem 0.2rem #5837d0;
  }
`;

const dummyDataBasic = [
  {
    state: '진행중',
    title: '카카오',
    regDate: '2022.09.01',
  },
  {
    state: '진행중',
    title: '카카오',
    regDate: '2022.09.01',
  },
  {
    state: '진행중',
    title: '카카오',
    regDate: '2022.09.01',
  },
  {
    state: '진행중',
    title: '카카오',
    regDate: '2022.09.01',
  },
  {
    state: '진행중',
    title: '카카오',
    regDate: '2022.09.01',
  },
  {
    state: '진행중',
    title: '카카오',
    regDate: '2022.09.01',
  },
  {
    state: '진행중',
    title: '카카오',
    regDate: '2022.09.01',
  },
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
  {
    state: '면접탈락',
    title: '지우컴퍼니',
    regDate: '2022.09.01',
  },
  {
    state: '면접탈락',
    title: '지우컴퍼니',
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
    <Wrapper>
      <br></br>
      <br></br>
      {/*자소서 작성 버튼을 우측 으로 하기위한 div */}
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
      >
        <Link to="/notice/add" style={{ textDecoration: 'none' }}>
          <CreateButton id="contentFont">자소서 작성</CreateButton>
        </Link>
      </div>
      <div>
        <select
          id="contentFont"
          defaultValue="전체보기"
          onChange={handleDropdownState}
        >
          <option value="전체보기">전체보기</option>
          <option value="진행중">진행중</option>
          <option value="서류탈락">서류탈락</option>
          <option value="최종합격">최종합격</option>
          <option value="면접탈락">면접탈락</option>
        </select>
      </div>
      <ListTotal>
        {dummyData.map((dummy, index) => (
          <div key={index}>
            <Link to="/notice/detail" style={{ textDecoration: 'none' }}>
              <ItemList onClick={ChangeFlag}>
                <ItemGrid className="regdate" id="titleFont" width="100%">
                  {dummy.regDate}
                </ItemGrid>
                <ItemGrid id="contentFont" width="100%" marginTop="40px">
                  {dummy.title}
                </ItemGrid>
                <br></br>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <ItemGrid className="state" id="titleFont" width="100%">
                  {dummy.state}
                </ItemGrid>
                <br></br>
              </ItemList>
            </Link>
          </div>
        ))}
      </ListTotal>
    </Wrapper>
  );
};

export default MyNoticeList;
