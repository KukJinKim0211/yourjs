//header
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';

const Wrapper = styled.div`
  background-color: white;
  width: 100%;
  height: 10vh;
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

const Header = () => {
  return (
    <Wrapper>
      <HeaderDiv>
        <div>
          <LogoImage />
        </div>
        <NavBar>
          <Link to="/"> 캘린더 </Link>
          <Link to="/notice"> 내공고 </Link>
          <Link to="/findnotice"> 공고찾기 </Link>
          <Link to="/portfolio"> 포트폴리오 </Link>
          <Link to="/MyGroup"> 내그룹 </Link>
          <Link to="/MyPage"> 마이페이지 </Link>
        </NavBar>
      </HeaderDiv>
    </Wrapper>
  );
};

export default Header;
