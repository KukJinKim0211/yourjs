import React from 'react';
import styled from 'styled-components';
import user from '../../img/user.png';

const Wrapper = styled.div`
  width: 100%;
`;

const dummyData = [
  { name: '배지우', state: '진행중 공고' },
  { name: '김국진', state: '진행중 공고' },
  { name: '금동운', state: '진행중 공고' },
  { name: '배지우', state: '진행중 공고' },
  { name: '김국진', state: '진행중 공고' },
  { name: '금동운', state: '진행중 공고' },
  { name: '배지우', state: '진행중 공고' },
  { name: '김국진', state: '진행중 공고' },
  { name: '금동운', state: '진행중 공고' },
];

//제목 적히는 box
const TitleBox = styled.div`
  margin-top: 50px;
`;
// gird로 card 뿌리는 전체 div
const ListBox = styled.div`
  display: grid;
  grid: '. . .';
  row-gap: 50px;
  justify-content: space-between;
`;
// 카드 모형 style
const Card = styled.div`
  width: 250px;
  height: 100px;
  background-color: #bad1c2;
  border-radius: 10px;
  display: flex;
  cursor: pointer;
`;
//프로필 사진
const UserImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

UserImg.defaultProps = {
  src: user,
};

// 좌측 영역
const Gird1Box = styled.div`
  width: 30%;
`;
// 우측 아래위로 나누기 위한 큰 박스
const Grid2Box = styled.div`
  width: 70%;

  display: flex;
  flex-direction: column;
`;
// 우상단 영역
const Grid3Box = styled.div`
  height: 60%;
  font-size: 25px;
  line-height: 60px; // 위 박스의 높이와 동일하게 줘서 수직중앙정렬 
  text-align: center;
`;

// 우 하단 영역
const Grid4Box = styled.div`
  text-align: center;
  height: 40%;
  line-height: 40px;
`;

const FindNoticeItemList = () => {
  return (
    <Wrapper>
      <TitleBox>
        <h1>웹 프론트를 관심있는 사람</h1>
      </TitleBox>
      <ListBox>
        {dummyData.map((card, index) => (
          <Card key={index}>
            <Gird1Box>
              <UserImg></UserImg>
            </Gird1Box>
            <Grid2Box>
              <Grid3Box id="titleFont">배지우</Grid3Box>
              <Grid4Box id="titleFont">진행중 공고 : 0</Grid4Box> 
            </Grid2Box>
          </Card>
        ))}
      </ListBox>
    </Wrapper>
  );
};

export default FindNoticeItemList;
