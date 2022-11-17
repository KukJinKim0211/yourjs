//MyPage
import React, { useState } from 'react';
import styled from 'styled-components';
import MyAccountInfo from '../components/MyPage/MyAccountInfo';
import ManageAccount from '../components/MyPage/ManageAccount';
import PasswordChange from '../components/MyPage/PasswordChange';
import InfoLevelSet from '../components/MyPage/InfoLevelSet';
import DeleteAccount from '../components/MyPage/DeleteAccount';
import SetProfile from '../components/MyPage/SetProfile';
import SetPosition from '../components/MyPage/SetPosition';
import { fullWidth } from '../common/size';
import { colors } from '../common/color';
import { useLocation } from 'react-router-dom';

const menuItemList = [
  '내정보보기',
  '관심포지션설정',
  '프로필사진설정',
  '계정관리',
  '비밀번호변경',
  '공개범위설정',
  '계정탈퇴',
];

const Wrapper = styled.div`
  width: ${fullWidth};
  height: 100%;
  display: flex;
`;

const ContentDiv = styled.div`
  width: 75%;
  margin-top: 5%;
`;

const MenuDiv = styled.div`
  width: 20%;
  margin-top: 5%;
`;

const Menu = styled.div`
  margin-left: 5%;
  width: 100%;
  height: 55%;
  display: flex;
  justify-content: space-around;
  align-items: space-between;
  flex-direction: column;
  border-radius: 5px;
  background-color: ${colors.bsColor0};
`;

const MenuItem = styled.div`
  width: 100%;
  height: 14%;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

const MenuFont = styled.p`
  margin-left: 20px;
  color: ${props => (props.select ? 'black' : 'rgba(0, 0, 0, 0.4)')};
`;

const MyPage = () => {
  const location = useLocation();
  const [select, setSelect] = useState(
    location.state.menuItem === null ? 0 : location.state.menuItem,
  );
  return (
    <Wrapper>
      <MenuDiv>
        <Menu id="contentFont">
          {menuItemList.map((item, index) => (
            <MenuItem key={index} onClick={() => setSelect(index)}>
              <MenuFont select={select === index ? true : false}>
                {item}
              </MenuFont>
            </MenuItem>
          ))}
        </Menu>
      </MenuDiv>
      <div style={{ width: '5%' }}></div>

      <ContentDiv>
        {select === 0 && <MyAccountInfo />}
        {select === 1 && <SetPosition />}
        {select === 2 && <SetProfile />}
        {select === 3 && <ManageAccount />}
        {select === 4 && <PasswordChange />}
        {select === 5 && <InfoLevelSet />}
        {select === 6 && <DeleteAccount />}
      </ContentDiv>
    </Wrapper>
  );
};

export default MyPage;
