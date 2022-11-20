import styled from 'styled-components';
import React from 'react';
import { colors } from '../../common/color';
import {
  faBuilding,
  faLink,
  faFile,
  faCalendarDays,
  faDownload,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';

const Wrapper = styled.div`
  width: 90%;
  height: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleText = styled.p`
  font-size: 26px;
  border-bottom: 2px solid ${colors.bsColor4};
`;

const ContentSpan = styled.span`
  background-color: ${props => {
    if (props.type === '서류제출') {
      return `${colors.bsColor1}`;
    } else if (props.type === '코딩테스트') {
      return `${colors.bsColor2}`;
    } else if (props.type === '1차면접') {
      return `${colors.bsColor3}`;
    } else if (props.type === '2차면접') {
      return `${colors.bsColor4}`;
    } else {
      return `#4aa8d8`;
    }
  }};
  color: ${props => {
    if (props.type === '서류제출') {
    } else if (props.type === '코딩테스트') {
    } else if (props.type === '1차면접') {
    } else if (props.type === '2차면접') {
    } else {
      return `white`;
    }
  }};
  border-radius: 5px;
  padding: 5px 10px;
  margin-left: 10px;
  /* opacity: 80%; */
`;

// 닫기 버튼
const CloseButton = styled.button`
  width: 15%;
  height: 30px;
  background-color: white;
  border: none;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const ScheduleDiv = styled.div`
  width: 100%;
  margin-top: ${props => props.mt};
`;

const ContentDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: ${props => `${props.mt}%`};
`;

const ContentText = styled.span`
  width: 85%;
  font-size: 20px;
  font-family: 'GmarketSansMedium';
`;

const ButtonDivForm = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 5% 0px;
  margin-top: 3%;
  margin-bottom: 5%;
  justify-content: center;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid ${colors.bsColor3};
  &:hover {
    background-color: ${colors.bsColor2};
  }
`;

const FindNoticeModal = ({ data, closeFindNoticeModal }) => {
  // 남의 공고 추가
  const noticeAddClicked = () => {
    const newData = {
      noticeName: data.noticeName,
      link: data.link,
      progress: '등록',
      coName: data.coName,
      noticeTag: '',
      schedules: data.schedules,
    };
    console.log(newData);
    axiosInstance.post(apis.notice, newData).then(response => {
      if (response.status === 200) {
        alert('공고 가져오기에 성공하셨습니다.');
        closeFindNoticeModal();
      }
    });
  };
  return (
    <Wrapper>
      <TitleDiv>
        <CloseButton style={{ visibility: 'hidden' }} />
        <TitleText id="contentFont">공고 가져오기</TitleText>
        <CloseButton id="contentFont" onClick={() => closeFindNoticeModal()}>
          <FontAwesomeIcon
            icon={faXmark}
            size="xl"
            style={{
              width: '60px',
            }}
          />
        </CloseButton>
      </TitleDiv>
      {/* 공고명 출력 */}
      <ContentDiv mt={0}>
        <div style={{ width: '15%' }}>
          <FontAwesomeIcon
            icon={faFile}
            size="xl"
            style={{
              width: '60px',
            }}
          />
        </div>
        <ContentText>{data.noticeName}</ContentText>
      </ContentDiv>
      {/* 회사명 출력 */}
      <ContentDiv mt={10}>
        <div style={{ width: '15%' }}>
          <FontAwesomeIcon
            icon={faBuilding}
            size="xl"
            style={{
              width: '60px',
            }}
          />
        </div>
        <ContentText>
          {data.coName?.length >= 25
            ? `${data.coName?.slice(0, 24)}....`
            : data.coName}
        </ContentText>
      </ContentDiv>
      {/* 링크 출력 */}
      <ContentDiv mt={10}>
        <div style={{ width: '15%' }}>
          <FontAwesomeIcon
            icon={faLink}
            size="xl"
            style={{
              width: '60px',
            }}
          />
        </div>
        <span
          style={{ color: '#0067A3', cursor: 'pointer', fontSize: '20px' }}
          id="contentFont"
          onClick={() => window.open(`${data.link}`)}
        >
          채용공고 열람
        </span>
      </ContentDiv>
      <ContentDiv mt={10}>
        <div style={{ width: '15%' }}>
          <FontAwesomeIcon
            icon={faCalendarDays}
            size="xl"
            style={{
              width: '60px',
            }}
          />
        </div>
        <ContentText style={{ fontSize: '16px' }}>
          {data.schedules.map((sche, index) => (
            <ScheduleDiv key={index} mt={index === 0 ? '' : '10px'}>
              {sche.scheduleDate}{' '}
              <ContentSpan
                style={{ borderBottom: `1px solid ${colors.bsColor3}` }}
                type={sche.scheduleName}
              >
                {sche.scheduleName}
              </ContentSpan>
              <br></br>
            </ScheduleDiv>
          ))}
        </ContentText>
      </ContentDiv>
      <div style={{ height: '8%' }}></div>
      <ButtonDivForm onClick={() => noticeAddClicked()}>
        <FontAwesomeIcon icon={faDownload} size="2x" color={colors.bsColor4} />
      </ButtonDivForm>
    </Wrapper>
  );
};

export default FindNoticeModal;
