import { faBorderNone } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import './style.css';
import Modal from 'react-modal';
import { colors } from '../../common/color';
import { scheduleList } from '../../common/define';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import { getYYMMFormat } from '../../common/date';

const Wrapper = styled.div`
  width: 100%;
  min-height: 120px;
  border: 0.5px solid rgba(0, 0, 0, 0.08);
  border-collapse: collapse;
  display: table;
  /* &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  } */

  background-color: ${props =>
    props.color % 7 === 1 || props.color % 7 === 0
      ? 'rgba(0, 0, 0, 0.03)'
      : 'white'};
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
  padding-right: 5px;
`;

const ContentDiv = styled.div`
  width: 92%;
  margin-left: 4%;
  margin-right: 4%;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  height: 40px;
  font-size: 14px;
  user-select: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const customStyles = {
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

Modal.setAppElement('#root');

const ModalDiv = styled.div`
  width: 90%;
  height: 95%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const ModalTitleDivForm = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 10%;
  cursor: pointer;
`;

const ModalLeftTitleDiv = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${props =>
    props.tabState === 0 ? `2px solid ${colors.bsColor4}` : 'none'};
  color: ${props =>
    props.tabState === 0 ? `${colors.bsColor4}` : 'rgba(0, 0, 0, 0.5)'};
  font-size: 22px;
`;

const ModalRightTitleDiv = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${props =>
    props.tabState === 1 ? `2px solid ${colors.bsColor4}` : 'none'};
  color: ${props =>
    props.tabState === 1 ? `${colors.bsColor4}` : 'rgba(0, 0, 0, 0.5)'};
  font-size: 22px;
`;

const ModalInputLabelDiv = styled.div`
  width: 100%;
  font-family: 'InfinitySans-RegularA1';
  margin-top: 4%;
`;

const ModalLabelDiv = styled.div`
  font-size: 18px;
  margin-bottom: 1%;
`;

const ModalInputDiv = styled.div`
  width: 100%;
`;

const ModalInput = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 16px;
  padding: 6px 3px;
  width: 100%;
  border-radius: 5px;

  &:hover {
    border: 1px solid ${colors.bsColor4};
  }

  &:focus {
    border: 1px solid ${colors.bsColor4};
    box-shadow: 0 0 10px ${colors.bsColor3};
    outline: none;
  }
`;

const ModalTagDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const TagComponentDiv = styled.div`
  background-color: ${colors.bsColor2};
  padding: 5px 8px;
  margin-left: 5px;
  margin-top: 5px;
  border-radius: 10px;
  font-size: 14px;
  display: flex;
`;

const StateSelect = styled.select`
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: 100%;
  font-size: 16px;
  height: 40px;
  border-radius: 5px;

  &:hover {
    border: 1px solid ${colors.bsColor4};
  }

  &:focus {
    border: 1px solid ${colors.bsColor4};
    box-shadow: 0 0 10px ${colors.bsColor3};
    outline: none;
  }
`;

const ModalButtonDivForm = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  margin-top: 3%;
  margin-bottom: 3%;
`;

const ModalButtonDiv = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalButton = styled.button`
  width: 98%;
  height: 50px;
  font-size: 18px;
  background-color: ${props => props.color};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${props =>
      props.type === 0 ? colors.bsColor3 : 'rgba(0, 0, 0, 0.2)'};
  }
`;

const TagComponent = ({ tagName, deleteTag }) => {
  return (
    <TagComponentDiv id="contentFont">
      {`#${tagName}\u00A0\u00A0`}
      <span
        style={{
          color: 'rgba(0, 0, 0, 0.3)',
          cursor: 'pointer',
        }}
        onClick={() => deleteTag(tagName)}
      >
        X
      </span>
    </TagComponentDiv>
  );
};

const DayCalendar = ({ dayData, getNotice, searchDate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tabState, setTabState] = useState(0);
  // 공고등록 관련 State
  const [noticeName, setNoticeName] = useState(''); // 공고명
  const [companyName, setCompanyName] = useState(''); // 회사명
  const [link, setLink] = useState(''); // 지원링크
  const [tagList, setTagList] = useState([]); // 태그 리스트
  const [tagItem, setTagItem] = useState(''); // 태그 입력항목
  const [scheduleIndex, setScheduleIndex] = useState(0); // 일정 인덱스
  const [scheduleName, setScheduleName] = useState(''); // 일정 내용
  const [scheduleDate, setScheduleDate] = useState(
    `${getYYMMFormat(searchDate, dayData.day)} 23:59:59`,
  ); // 일정 날짜

  const hoverOver = e => {
    const button = e.currentTarget.children[0].children[0].children[0];
    button.classList.remove('buttonView');
  };

  const hoverOut = e => {
    const button = e.currentTarget.children[0].children[0].children[0];
    button.classList.add('buttonView');
  };

  const plusButtonClicked = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // 태그등록 enter 키 다운 이벤트
  const enterKeyDownHandler = e => {
    if (e.key === 'Enter') {
      // 태그 제한 5개
      if (tagList.length >= 5) {
        alert('태그는 5개까지 입력 가능합니다');
        return;
      }
      // 현재 태그 리스트에 입력한 태그가 존재할 시
      if (tagList.indexOf(tagItem) !== -1) {
        console.log('있음');
        return;
      }
      setTagItem('');
      setTagList(tagList.concat(tagItem));
    }
  };

  // 태그 삭제
  const deleteTag = tag => {
    const newArray = tagList.filter(d => d !== tag);
    setTagList(newArray);
  };

  // 공고 추가 버튼 클릭
  const noticeAddButtonClicked = () => {
    const data = {
      noticeName,
      link,
      progress: '',
      coName: companyName,
      noticeTag: tagList.join(', '),
      schedules: [
        {
          scheduleName:
            scheduleIndex === 10
              ? scheduleName
              : scheduleList[scheduleIndex - 1],
          scheduleDate: scheduleDate,
        },
      ],
    };
    console.log(data);
    axiosInstance.post(apis.notice, data).then(response => {
      getNotice();
      closeModal();
    });
  };

  return (
    <Wrapper
      onMouseOver={e => hoverOver(e)}
      onMouseOut={e => hoverOut(e)}
      color={dayData.id}
    >
      <TitleDiv>
        <InsertButtonDiv>
          <InsertButton className="buttonView" onClick={plusButtonClicked}>
            <span style={{ color: 'rgba(0, 0, 0, 0.5)', fontSize: '16px' }}>
              +
            </span>
          </InsertButton>
        </InsertButtonDiv>
        <DayDiv id="titleFont">{dayData.day === 0 ? null : dayData.day}</DayDiv>
      </TitleDiv>
      <div style={{ height: '5%' }}></div>
      {dayData.data.map((d, index) => (
        <ContentDiv id="font_pretendard" key={index}>
          {d.coName}
          <br />
          {d.scheduleName}
        </ContentDiv>
      ))}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalDiv>
          <ModalTitleDivForm>
            <ModalLeftTitleDiv
              id="titleFont"
              tabState={tabState}
              onClick={() => setTabState(0)}
            >
              <span style={{}}>공고추가</span>
            </ModalLeftTitleDiv>
            <ModalRightTitleDiv
              id="titleFont"
              tabState={tabState}
              onClick={() => setTabState(1)}
            >
              일정추가
            </ModalRightTitleDiv>
          </ModalTitleDivForm>
          <div style={{ height: '3%' }}></div>
          <ModalInputLabelDiv>
            <ModalLabelDiv>공고명</ModalLabelDiv>
            <ModalInputDiv>
              <ModalInput
                type="text"
                placeholder="삼성 청년 SW 아카데미 9기 모집"
                value={noticeName}
                onChange={e => setNoticeName(e.target.value)}
                maxLength={25}
              ></ModalInput>
            </ModalInputDiv>
          </ModalInputLabelDiv>
          <ModalInputLabelDiv>
            <ModalLabelDiv>회사명</ModalLabelDiv>
            <ModalInputDiv>
              <ModalInput
                type="text"
                placeholder="삼성 청년 SW 아카데미"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                maxLength={25}
              ></ModalInput>
            </ModalInputDiv>
          </ModalInputLabelDiv>
          <ModalInputLabelDiv>
            <ModalLabelDiv>지원링크</ModalLabelDiv>
            <ModalInputDiv>
              <ModalInput
                type="text"
                placeholder="https://www.ssafy.com/ksp/jsp/swp/apply/swpApplyProcess.jsp"
                value={link}
                onChange={e => setLink(e.target.value)}
                maxLength={100}
              ></ModalInput>
            </ModalInputDiv>
          </ModalInputLabelDiv>
          <ModalInputLabelDiv>
            <ModalLabelDiv>연관태그등록</ModalLabelDiv>
            <ModalInputDiv>
              <ModalInput
                type="text"
                value={tagItem}
                onChange={e => setTagItem(e.target.value)}
                maxLength={10}
                onKeyDown={e => enterKeyDownHandler(e)}
              ></ModalInput>
            </ModalInputDiv>
          </ModalInputLabelDiv>
          <ModalTagDiv>
            {tagList.map((tag, index) => (
              <TagComponent key={index} tagName={tag} deleteTag={deleteTag} />
            ))}
          </ModalTagDiv>
          <ModalInputLabelDiv>
            <ModalLabelDiv>일시</ModalLabelDiv>
            <ModalInputDiv>
              <ModalInput
                type="text"
                value={scheduleDate}
                onChange={e => setScheduleDate(e.target.value)}
                maxLength={20}
                onKeyDown={e => enterKeyDownHandler(e)}
              ></ModalInput>
            </ModalInputDiv>
          </ModalInputLabelDiv>

          <ModalInputLabelDiv>
            <ModalLabelDiv>일정</ModalLabelDiv>
            <ModalInputDiv>
              <StateSelect
                id="titleFont"
                defaultValue={0}
                onChange={e => setScheduleIndex(parseInt(e.target.value))}
              >
                <option id="titleFont" value={0}>
                  항목을 선택해주세요.
                </option>
                {scheduleList.map((schedule, index) => (
                  <option key={index + 1} id="titleFont" value={index + 1}>
                    {schedule}
                  </option>
                ))}
              </StateSelect>
              {scheduleIndex === 10 && (
                <ModalInput
                  type="text"
                  value={scheduleName}
                  onChange={e => setScheduleName(e.target.value)}
                  maxLength={20}
                ></ModalInput>
              )}
            </ModalInputDiv>
          </ModalInputLabelDiv>
          <ModalButtonDivForm>
            <ModalButtonDiv>
              <ModalButton
                id="contentFont"
                color={colors.bsColor4}
                type={0}
                onClick={() => noticeAddButtonClicked()}
              >
                추가하기
              </ModalButton>
            </ModalButtonDiv>
            <ModalButtonDiv>
              <ModalButton
                id="contentFont"
                color="rgba(0, 0, 0, 0.3)"
                type={1}
                onClick={() => closeModal()}
              >
                닫기
              </ModalButton>
            </ModalButtonDiv>
          </ModalButtonDivForm>
        </ModalDiv>
      </Modal>
    </Wrapper>
  );
};

export default DayCalendar;
