//header
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../img/logo.png';
import React, { useState, useEffect } from 'react';
import { setCookie } from '../../common/cookie';
import { fullWidth } from '../../common/size';
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';

const Wrapper = styled.div`
  background-color: white;
  width: 100%;
  height: 108px;
  display: flex;
  justify-content: center;
`;

const HeaderDiv = styled.div`
  width: ${fullWidth};
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const LogoImage = styled.img`
  height: 100%;
  user-select: none;
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
  height: 70px;
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const select = useSelector(state => state.select);
  const [selectedMenu, setSelectedMenu] = useState(
    select === -1 ? parseInt(sessionStorage.getItem('selectItem')) : select,
  );
  const [refreshFlag, setRefreshFlag] = useState(false);

  const [loginState, setLoginState] = useState(
    JSON.parse(sessionStorage.getItem('loginState')),
  );

  useEffect(() => {
    setSelectedMenu(select);
  }, [select]);

  useEffect(() => {
    setLoginState(
      sessionStorage.getItem('loginState') === 'true' ? true : false,
    );
  }, [refreshFlag]);
  // 선택한 메뉴에 대한 표시 처리
  // 새로고침 후에도 유지하기 위해 Session Storage 사용
  const staySelectedMenu = menuSelectedItem => {
    setSelectedMenu(menuSelectedItem);
    dispatch({ type: 'selected', select: menuSelectedItem });
    sessionStorage.setItem('selectItem', menuSelectedItem);
  };

  const logoutButtonClicked = () => {
    setCookie('refresh_Token', '');

    localStorage.removeItem('autoLogin');

    sessionStorage.setItem('loginState', false);
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('nickname');

    setRefreshFlag(!refreshFlag);

    navigate('/');
  };

  return (
    <Wrapper>
      <HeaderDiv>
        <div>
          <Link to={loginState ? '/main' : '/'}>
            <LogoImage />
          </Link>
        </div>
        {loginState ? (
          <>
            <NavBar>
              <NavDiv>
                <Link to="/main" style={{ textDecoration: 'none' }}>
                  <NavText
                    selected={selectedMenu === 0 ? true : false}
                    onClick={e => staySelectedMenu(0)}
                    id="navBarFont"
                  >
                    나의여정
                  </NavText>
                </Link>
              </NavDiv>
              <NavDiv>
                <Link to="/calendar" style={{ textDecoration: 'none' }}>
                  <NavText
                    selected={selectedMenu === 1 ? true : false}
                    onClick={e => staySelectedMenu(1)}
                    id="navBarFont"
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
                    id="navBarFont"
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
                    id="navBarFont"
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
                    id="navBarFont"
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
                    id="navBarFont"
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
                    id="navBarFont"
                  >
                    마이페이지
                  </NavText>
                </Link>
              </NavDiv>
              <NavDiv>
                <NavText
                  style={{ cursor: 'pointer' }}
                  id="navBarFont"
                  onClick={() => logoutButtonClicked()}
                >
                  로그아웃
                </NavText>
              </NavDiv>
            </NavBar>
          </>
        ) : (
          <NavBar>
            <NavDiv>
              <Link
                to="/login"
                style={{ textDecoration: 'none' }}
                id="navBarFont"
              >
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
