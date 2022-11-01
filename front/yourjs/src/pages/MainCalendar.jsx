//MainCalendar
import styled from 'styled-components';
import MainCount from '../components/MainCalendar/MainCount';
import CurrentTime from '../components/MainCalendar/CurrentTime';
import TodayNotice from '../components/MainCalendar/TodayNotice';
import { colors } from '../common/color';

const Wrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const TodayDiv = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 180px;
  display: flex;
`;

const RecommendDiv = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  background-color: ${colors.bsColor1};
  border-radius: 15px;
`;

const RecommendTitleDiv = styled.div`
  width: 100%;
  height: 30%;
  margin-left: 2%;
`;

const RecommendContentDiv = styled.div`
  width: 96%;
  margin-left: 2%;
  margin-right: 2%;
  background-color: ${colors.bsColor2};
  height: 60%;
`;

const RecommendTitleText = styled.p`
  color: ${colors.bsColor4};
  font-size: 20px;
  font-weight: 600;
`;

const todayContent = [
  {
    title: '마감 임박 공고',
    content: [
      { company: '신세계 I&C', date: '2022-11-01 17:00:00' },
      { company: '신한은행', date: '2022-11-03 23:59:59' },
      { company: '지우컴퍼니', date: '2022-11-04 17:00:00' },
    ],
  },
  {
    title: '발표 임박 공고',
    content: [{ company: 'Pasoo', date: '2022-11-03' }],
  },
];

const MainCalendar = () => {
  return (
    <Wrapper>
      <MainCount />
      <TodayDiv>
        <CurrentTime />
        <div style={{ width: '2%' }} />
        <TodayNotice data={todayContent[0]} type={1} />
        <div style={{ width: '2%' }} />
        <TodayNotice data={todayContent[1]} type={2} />
      </TodayDiv>
      <RecommendDiv>
        <RecommendTitleDiv>
          <RecommendTitleText id="titleFont">
            관심 분야의 놓친 공고
          </RecommendTitleText>
        </RecommendTitleDiv>
        <RecommendContentDiv>HELO</RecommendContentDiv>
      </RecommendDiv>
    </Wrapper>
  );
};

export default MainCalendar;
