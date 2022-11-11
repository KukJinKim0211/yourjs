// 사용자 Main
import styled, { useEffect } from 'styled-components';
import { colors } from '../common/color';
import { FullPage, Slide } from 'react-full-page';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Wrapper = styled.div`
  background-color: ${colors.bsColor0};
  width: 100%;
  height: 400%;
`;

const TitleDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 60%;
  width: 500px;
  height: 50px;
  color: ${colors.bsColor4};
  font-size: 36px;
  user-select: none;
`;

const SecondTitleDiv = styled.div`
  position: absolute;
  top: 20%;
  left: 60%;
  width: 500px;
  height: 36px;
  color: black;
  font-size: 44px;
  user-select: none;
`;

const ThirdTitleDiv = styled.div`
  position: absolute;
  top: 20%;
  left: 15%;
  width: 500px;
  height: 36px;
  color: black;
  font-size: 44px;
  user-select: none;
`;

const SecondContentDiv = styled.div`
  position: absolute;
  top: 60%;
  left: 60%;
  width: 500px;
  height: 36px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 28px;
  user-select: none;
`;

const ThirdContentDiv = styled.div`
  position: absolute;
  top: 60%;
  left: 15%;
  width: 500px;
  height: 36px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 28px;
  user-select: none;
`;

const CalendarDiv = styled.div`
  position: absolute;
  top: 20%;
  left: 15%;
  width: 600px;
  height: 500px;
  background-color: #ccd6dd;
  border-radius: 40px;
`;

const PortfolioDiv = styled.div`
  position: absolute;
  top: 15%;
  left: 60%;
  width: 600px;
  height: 600px;
  background-color: #ccd6dd;
  border-radius: 40px;
`;

const CalendarHeadDiv = styled.div`
  position: relative;
  height: 20%;
  background-color: red;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`;

const CalendarHeadCircleDiv = styled.div`
  position: absolute;
  left: calc(${props => props.no} * 19%);
  top: 30%;
  width: 30px;
  height: 30px;
  background-color: black;
  border-radius: 50%;
`;

const CalendarContentDiv = styled.div`
  position: relative;
  height: 80%;
`;

const CalendarContentDayDiv = styled.div`
  position: absolute;
  top: calc(${props => props.top} * 18%);
  left: calc(${props => props.left} * 13%);
  width: 60px;
  height: 60px;
  background-color: ${props => (props.color === 0 ? 'white' : 'skyblue')};
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.6);
  user-select: none;
`;

const FirstPage = () => {
  return (
    <TitleDiv>
      <p>
        나만의 취업 다이어리
        <span style={{ textAlign: 'right' }}>your.js</span>
      </p>
    </TitleDiv>
  );
};

const SecondPage = () => {
  return (
    <>
      <CalendarDiv data-aos="zoom-in" data-aos-delay="500">
        <CalendarHeadDiv>
          <CalendarHeadCircleDiv no={1} />
          <CalendarHeadCircleDiv no={2} />
          <CalendarHeadCircleDiv no={3} />
          <CalendarHeadCircleDiv no={4} />
        </CalendarHeadDiv>
        <CalendarContentDiv>
          <CalendarContentDayDiv top={1} left={3} color={0} />
          <CalendarContentDayDiv top={1} left={4} color={0} />
          <CalendarContentDayDiv
            top={1}
            left={5}
            color={1}
          ></CalendarContentDayDiv>
          <CalendarContentDayDiv top={1} left={6} color={0} />
          <CalendarContentDayDiv top={2} left={1} color={0} />
          <CalendarContentDayDiv top={2} left={2} color={0} />
          <CalendarContentDayDiv top={2} left={3} color={0} />
          <CalendarContentDayDiv
            top={2}
            left={4}
            color={1}
          ></CalendarContentDayDiv>
          <CalendarContentDayDiv top={2} left={5} color={0} />
          <CalendarContentDayDiv top={2} left={6} color={0} />
          <CalendarContentDayDiv top={3} left={1} color={0} />
          <CalendarContentDayDiv top={3} left={2} color={0} />
          <CalendarContentDayDiv top={3} left={3} color={0} />
          <CalendarContentDayDiv top={3} left={4} color={0} />
          <CalendarContentDayDiv top={3} left={5} color={0} />
          <CalendarContentDayDiv top={3} left={6} color={1} />
          <CalendarContentDayDiv top={4} left={1} color={0} />
          <CalendarContentDayDiv top={4} left={2} color={1} />
          <CalendarContentDayDiv top={4} left={3} color={0} />
          <CalendarContentDayDiv top={4} left={4} color={0} />
        </CalendarContentDiv>
      </CalendarDiv>
      <SecondTitleDiv data-aos="zoom-in" data-aos-delay="300" id="titleFont">
        <span style={{ color: 'skyblue' }}>캘린더</span>를 통한
        <br />
        개인 공고 일정 관리
      </SecondTitleDiv>
      <SecondContentDiv
        data-aos="zoom-in"
        data-aos-delay="300"
        id="contentFont"
      >
        취업 일정들을 한 눈에 파악할 수 있어요
      </SecondContentDiv>
    </>
  );
};

const ThirdPage = () => {
  return (
    <>
      <ThirdTitleDiv data-aos="zoom-in" data-aos-delay="300" id="titleFont">
        내 <span style={{ color: 'skyblue' }}>포트폴리오</span> 관리
      </ThirdTitleDiv>
      <ThirdContentDiv data-aos="zoom-in" data-aos-delay="300" id="contentFont">
        공통으로 작성될 내용을 정리할 수 있어요
      </ThirdContentDiv>
      <PortfolioDiv data-aos="zoom-in" data-aos-delay="700"></PortfolioDiv>
    </>
  );
};

const FourthPage = () => {
  return (
    <>
      <SecondTitleDiv data-aos="zoom-in" data-aos-delay="300" id="titleFont">
        내 <span style={{ color: 'skyblue' }}>포트폴리오</span> 관리
      </SecondTitleDiv>
      <SecondContentDiv
        data-aos="zoom-in"
        data-aos-delay="300"
        id="contentFont"
      >
        공통으로 작성될 내용을 정리할 수 있어요
      </SecondContentDiv>
      <PortfolioDiv data-aos="zoom-in" data-aos-delay="700"></PortfolioDiv>
    </>
  );
};

const Main = () => {
  const handleScroll = e => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const myScroll = e.srcElement.scrollingElement.scrollTop;
  };
  window.addEventListener('scroll', handleScroll);
  AOS.init();
  return (
    <Wrapper>
      <FullPage duration={1000}>
        <Slide style={{ position: 'relative' }}>
          <FirstPage />
        </Slide>
        <Slide style={{ position: 'relative' }}>
          <SecondPage />
        </Slide>
        <Slide style={{ position: 'relative' }}>
          <ThirdPage />
        </Slide>
        <Slide style={{ position: 'relative' }}>
          <FourthPage />
        </Slide>
      </FullPage>
    </Wrapper>
  );
};

export default Main;
