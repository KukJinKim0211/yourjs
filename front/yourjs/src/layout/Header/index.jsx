//header
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderDiv = styled.div`
  background-color: white;
  width: 100%;
  height: 10vh;
  position: fixed;
`;

const H1Text = styled.h1`
  color: blue;
`;

const Header = () => {
  return (
    <HeaderDiv>
      <Link to="/"> 캘린더 </Link>
      <Link to="/notice"> 내공고 </Link>
      <Link to="/findnotice"> 공고찾기 </Link>
      <Link to="/portfolio"> 포트폴리오 </Link>
      <Link to="/MyGroup"> 내그룹 </Link>
      <Link to="/MyPage"> 마이페이지 </Link>
    </HeaderDiv>
  );
};

export default Header;
