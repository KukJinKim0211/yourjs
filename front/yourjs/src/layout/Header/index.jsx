//header
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';
import React, { useState, useEffect } from 'react';

const Wrapper = styled.div`
  background-color: white;
  width: 100%;
  height: 100px;
  position: fixed;
  display: flex;
  justify-content: center;
`;

const HeaderDiv = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const LogoImage = styled.img`
  height: 100%;
  src: url('../../img/logo.png');
`;

LogoImage.defaultProps = {
  src: logo,
};

const NavBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavDiv = styled.div`
  height: 80px;
  margin-left: 40px;
`;

const NavText = styled.p`
  font-size: ${props => (props.selected ? '21px' : '20px')};
  text-decoration: none;
  color: ${props =>
    props.selected ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)'};
  font-weight: ${props => (props.selected ? 600 : 400)};
  user-select: none;
  &:hover {
    color: rgba(0, 0, 0, 0.8);
    font-weight: 600;
  }
  &:focus {
    border-bottom: 1px solid black;
  }
`;

const Header = () => {
  const [selectedMenu, setSelectedMenu] = useState(
    parseInt(sessionStorage.getItem('selectItem')),
  );
  const [loginState, setLoginState] = useState(true);

  // 선택한 메뉴에 대한 표시 처리
  // 새로고침 후에도 유지하기 위해 Session Storage 사용
  const staySelectedMenu = menuSelectedItem => {
    setSelectedMenu(menuSelectedItem);

    sessionStorage.setItem('selectItem', menuSelectedItem);
  };

  return (
    <Wrapper>
      <HeaderDiv>
        <div>
          <Link to={loginState ? '/maincalendar' : '/'}>
            <LogoImage />
          </Link>
        </div>
        {loginState ? (
          <>
            <NavBar>
              <NavDiv>
                <Link to="/maincalendar" style={{ textDecoration: 'none' }}>
                  <NavText
                    selected={selectedMenu === 1 ? true : false}
                    onClick={e => staySelectedMenu(1)}
                  >
                    캘린더
                  </NavText>
                </Link>
              </NavDiv>
              <NavDiv>
                <Link to="/notice" style={{ textDecoration: 'none' }}>
                  <NavText
                    selected={selectedMenu === 2 ? true : false}
                    onClick={e => staySelectedMenu(2)}
                  >
                    내공고
                  </NavText>
                </Link>
              </NavDiv>
              <NavDiv>
                <Link to="/findnotice" style={{ textDecoration: 'none' }}>
                  <NavText
                    selected={selectedMenu === 3 ? true : false}
                    onClick={e => staySelectedMenu(3)}
                  >
                    공고찾기
                  </NavText>
                </Link>
              </NavDiv>
              <NavDiv>
                <Link
                  to="/portfolio"
                  style={{ textDecoration: 'none' }}
                  value={4}
                >
                  <NavText
                    selected={selectedMenu === 4 ? true : false}
                    onClick={e => staySelectedMenu(4)}
                  >
                    포트폴리오
                  </NavText>
                </Link>
              </NavDiv>
              <NavDiv>
                <Link to="/MyGroup" style={{ textDecoration: 'none' }}>
                  <NavText
                    selected={selectedMenu === 5 ? true : false}
                    onClick={e => staySelectedMenu(5)}
                  >
                    내그룹
                  </NavText>
                </Link>
              </NavDiv>
              <NavDiv>
                <Link to="/MyPage" style={{ textDecoration: 'none' }}>
                  <NavText
                    selected={selectedMenu === 6 ? true : false}
                    onClick={e => staySelectedMenu(6)}
                  >
                    마이페이지
                  </NavText>
                </Link>
              </NavDiv>
              <NavDiv>
                <NavText style={{ cursor: 'pointer' }}>로그아웃</NavText>
              </NavDiv>
            </NavBar>
          </>
        ) : (
          <NavBar>
            <NavDiv>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <NavText>로그인</NavText>
              </Link>
            </NavDiv>
          </NavBar>
        )}
      </HeaderDiv>
    </Wrapper>
  );
};

export default Header;
