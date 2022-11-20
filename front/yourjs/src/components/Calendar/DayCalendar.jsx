import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import './style.css';
import Modal from 'react-modal';
import { colors } from '../../common/color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FindNoticeModal from './FindNoticeModal';
import ScheduleModal from './ScheduleModal';
import NoticeModal from './NoticeModal';

const Wrapper = styled.div`
  width: 100%;
  min-height: 120px;
  border: 0.5px solid rgba(0, 0, 0, 0.08);
  border-collapse: collapse;
  display: table;

  background-color: ${props =>
    props.color % 7 === 1 || props.color % 7 === 0
      ? `${colors.bsColor1}`
      : `${colors.bsColor0}`};
`;

const TitleDiv = styled.div`
  padding-top: 2px;
  height: 25px;
  user-select: none;
  display: flex;
  justify-content: space-between;
`;

const InsertButtonDiv = styled.div`
  padding-left: 5px;
  color: rgba(0, 0, 0, 0.4);
`;

const InsertButton = styled.button`
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const DayDiv = styled.div`
  font-size: 14px;
  padding: 5px 6px;
  background-color: ${props =>
    props.curr.getFullYear() === props.searchDate.getFullYear() &&
    props.curr.getMonth() === props.searchDate.getMonth() &&
    props.curr.getDate() === props.date
      ? '#DB4455'
      : ``};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 50%;
`;

const ContentDiv = styled.div`
  margin-left: 2%;
  margin-right: 2%;
  margin-bottom: 1px;
  border-radius: 5px;
  padding: 2px 0px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  height: 40px;
  font-size: 13px;
  user-select: none;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
  padding-left: 8px;
  background-color: white;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const customNoticeStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    height: '75%',
    display: 'flex',
    justifyContent: 'center',
  },
};

const customScheduleStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '25%',
    height: '55%',
    display: 'flex',
    justifyContent: 'center',
  },
};

const customFindNoticeStyled = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '25%',
    height: '50%',
    display: 'flex',
    justifyContent: 'center',
  },
};

Modal.setAppElement('#root');

const TagSpan = styled.span`
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
  padding-left: 5px;
  padding-right: 5px;
  /* opacity: 80%; */
`;

const DayCalendar = ({
  dayData,
  getNotice,
  searchDate,
  noticeList,
  noticeData,
  guest,
}) => {
  // 공고/일정 추가 모달 관리
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  // 일정 수정/삭제 모달 관리
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  // 공고 가져오기 모달 관리
  const [findNoticeModal, setFindNoticeModal] = useState(false);

  // 선택한 일정 데이터
  const [selectedData, setSelectedData] = useState([]);

  const hoverOver = e => {
    // 캘린더 게스트 권한일 시, 편집 불가
    if (guest) return;
    if (dayData.day === 0) return;
    const button = e.currentTarget.children[0].children[0].children[0];
    button.classList.remove('buttonView');
  };

  const hoverOut = e => {
    // 캘린더 게스트 권한일 시, 편집 불가
    if (guest) return;
    if (dayData.day === 0) return;
    const button = e.currentTarget.children[0].children[0].children[0];
    button.classList.add('buttonView');
  };

  const contentClicked = d => {
    setSelectedData(d);
    if (guest) setFindNoticeModal(true);
    else setScheduleModalOpen(true);
  };

  const plusButtonClicked = () => {
    setNoticeModalOpen(true);
  };

  const closeNoticeModal = () => {
    setNoticeModalOpen(false);
  };

  const closeScheduleModal = () => {
    setScheduleModalOpen(false);
  };

  const closeFindNoticeModal = () => {
    setFindNoticeModal(false);
  };

  return (
    <Wrapper
      onMouseOver={e => hoverOver(e)}
      onMouseOut={e => hoverOut(e)}
      color={dayData.id}
    >
      <TitleDiv>
        <InsertButtonDiv>
          <InsertButton
            className="buttonView"
            onClick={e => {
              plusButtonClicked();
            }}
          >
            <span style={{ color: 'rgba(0, 0, 0, 0.5)', fontSize: '16px' }}>
              +
            </span>
          </InsertButton>
        </InsertButtonDiv>
        <DayDiv
          id="titleFont"
          curr={new Date()}
          searchDate={searchDate}
          date={dayData.day}
        >
          {dayData.day === 0 ? null : dayData.day}
        </DayDiv>
      </TitleDiv>
      <div style={{ height: '5%' }}></div>
      {dayData.data.map((d, index) => (
        <ContentDiv
          id="font_pretendard"
          key={index}
          onClick={() => contentClicked(d)}
        >
          <FontAwesomeIcon
            icon={faBuilding}
            className="fa-light"
            style={{ width: '20px', height: '13px' }}
          />
          <span>
            {d.coName.length >= 8 ? `${d.coName.slice(0, 7)}....` : d.coName}
          </span>
          <div style={{ height: '3px' }} />
          <TagSpan type={d.scheduleName}>{d.scheduleName}</TagSpan>
        </ContentDiv>
      ))}
      <Modal
        isOpen={noticeModalOpen}
        onRequestClose={closeNoticeModal}
        style={customNoticeStyles}
        contentLabel="Notice Modal"
      >
        <NoticeModal
          dayData={dayData}
          searchDate={searchDate}
          closeNoticeModal={closeNoticeModal}
          getNotice={getNotice}
          noticeData={noticeData}
          noticeList={noticeList}
        />
      </Modal>
      <Modal
        isOpen={scheduleModalOpen}
        onRequestClose={closeScheduleModal}
        style={customScheduleStyles}
        contentLabel="Schedule Modal"
      >
        <ScheduleModal
          data={selectedData}
          closeScheduleModal={closeScheduleModal}
          getNotice={getNotice}
        />
      </Modal>
      <Modal
        isOpen={findNoticeModal}
        onRequestClose={closeFindNoticeModal}
        style={customFindNoticeStyled}
        contentLabel="Schedule Modal"
      >
        <FindNoticeModal
          data={selectedData}
          closeFindNoticeModal={closeFindNoticeModal}
        />
      </Modal>
    </Wrapper>
  );
};

export default DayCalendar;
