import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../common/color';
import { getYYMMFormat } from '../../common/date';
import { scheduleList, getScheduleList } from '../../common/define';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Wrapper = styled.div`
  width: 90%;
  height: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const TitleDivForm = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 10%;
  cursor: pointer;
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

const LeftTitleDiv = styled.div`
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

const RightTitleDiv = styled.div`
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

const InputLabelDiv = styled.div`
  width: 100%;
  font-family: 'InfinitySans-RegularA1';
  margin-top: 4%;
`;

const LabelDiv = styled.div`
  font-size: 18px;
  margin-bottom: 1%;
`;

const InputDiv = styled.div`
  width: 100%;
`;

const Input = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 16px;
  padding: 6px 3px;
  width: 96%;
  border-radius: 5px;
  padding-left: 10px;

  &:hover {
    border: 1px solid ${colors.bsColor4};
  }

  &:focus {
    border: 1px solid ${colors.bsColor4};
    box-shadow: 0 0 10px ${colors.bsColor3};
    outline: none;
  }
`;

const TagDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const StateSelect = styled.select`
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: 100%;
  font-size: 16px;
  height: 32px;
  border-radius: 5px;
  padding-left: 10px;

  &:hover {
    border: 1px solid ${colors.bsColor4};
  }

  &:focus {
    border: 1px solid ${colors.bsColor4};
    box-shadow: 0 0 10px ${colors.bsColor3};
    outline: none;
  }
`;

const ButtonDivForm = styled.div`
  width: 90%;
  height: 8%;
  display: flex;
  margin: 5% 0px;
  margin-top: 3%;
  margin-bottom: 3%;
  justify-content: center;
`;

const ButtonDiv = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 98%;
  height: 40px;
  font-size: 16px;
  background-color: ${props => props.color};
  border: ${props =>
    props.type === 0 ? `1px solid ${colors.bsColor3}` : `1px solid red`};
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${props =>
      props.type === 0 ? colors.bsColor3 : 'rgba(0, 0, 0, 0.2)'};
  }
`;

const NoticeModal = ({
  dayData,
  searchDate,
  closeNoticeModal,
  getNotice,
  noticeData,
  noticeList,
}) => {
  const [scheduleIndex, setScheduleIndex] = useState(0);
  const [tabState, setTabState] = useState(0);
  const [tagList, setTagList] = useState([]); // 태그 리스트
  const [tagItem, setTagItem] = useState(''); // 태그 입력항목

  const [noticeName, setNoticeName] = useState(''); // 공고명
  const [companyName, setCompanyName] = useState(''); // 회사명
  const [link, setLink] = useState(''); // 지원링크
  const [scheduleName, setScheduleName] = useState(''); // 일정 내용
  const [scheduleDate, setScheduleDate] = useState(
    `${getYYMMFormat(searchDate, dayData.day)} 23:59:59`,
  ); // 일정 날짜

  // 공고 시퀀스
  const [noticeSeq, setNoticeSeq] = useState(0);

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

  // 공고추가 유효성 체크
  const noticeInvalidCheck = () => {
    if (
      noticeName === '' ||
      companyName === '' ||
      link === '' ||
      scheduleDate === '' ||
      scheduleIndex === 0
    )
      return false;

    return true;
  };

  // 공고 추가 버튼 클릭
  const addButtonClicked = () => {
    if (tabState === 0) {
      if (!noticeInvalidCheck()) {
        alert('필수 사항을 입력 해 주세요.');
        return;
      }

      const data = {
        noticeName,
        link,
        progress: '등록',
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
      axiosInstance.post(apis.notice, data).then(response => {
        closeNoticeModal();
        getNotice();
      });
    } else {
      if (!scheduleInvalidCheck()) {
        alert('필수 사항을 입력 해 주세요.');
        return;
      }

      const notice = noticeData.filter(data => data.noticeSeq === noticeSeq);
      const schedules = notice[0].schedules;
      schedules.push({
        scheduleName: scheduleList[scheduleIndex - 1],
        scheduleDate: scheduleDate,
      });
      schedules.sort(
        (a, b) => new Date(a.scheduleDate) - new Date(b.scheduleDate),
      );
      console.log(notice[0]);
      axiosInstance.patch(apis.notice, notice[0]).then(response => {
        closeNoticeModal();
        getNotice();
      });
    }
  };

  // 일정 추가 유효성 체크
  const scheduleInvalidCheck = () => {
    if (noticeSeq === 0 || scheduleIndex === 0) {
      return false;
    }
    return true;
  };

  const scheduleAddButtonClicked = () => {
    if (!scheduleInvalidCheck()) {
      alert('필수 사항을 입력 해 주세요.');
      return;
    }

    const notice = noticeData.filter(data => data.noticeSeq === noticeSeq);
    const schedules = notice[0].schedules;
    schedules.push({
      scheduleName: scheduleList[scheduleIndex - 1],
      scheduleDate: scheduleDate,
    });
    schedules.sort(
      (a, b) => new Date(a.scheduleDate) - new Date(b.scheduleDate),
    );
    console.log(notice[0]);
    axiosInstance.patch(apis.notice, notice[0]).then(response => {
      closeNoticeModal();
      getNotice();
    });
  };

  return (
    <Wrapper>
      <TitleDivForm>
        <LeftTitleDiv
          id="titleFont"
          tabState={tabState}
          onClick={() => {
            setTabState(0);
            setScheduleIndex(0);
          }}
        >
          <span style={{}}>공고추가</span>
        </LeftTitleDiv>
        <RightTitleDiv
          id="titleFont"
          tabState={tabState}
          onClick={() => {
            setTabState(1);
            setScheduleIndex(0);
          }}
        >
          일정추가
        </RightTitleDiv>
      </TitleDivForm>
      <div
        style={{
          height: '10%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '20px',
        }}
        id="titleFont"
      >
        {tabState === 0
          ? '새로운 공고를 추가합니다.'
          : '이미 등록된 공고에 새로운 일정을 추가합니다.'}
      </div>
      {tabState === 0 ? (
        <>
          <InputLabelDiv style={{ marginTop: '0%' }}>
            <LabelDiv>
              공고명<span style={{ color: 'red' }}> *</span>
            </LabelDiv>
            <InputDiv>
              <Input
                type="text"
                placeholder="삼성 청년 SW 아카데미 9기 모집"
                value={noticeName}
                onChange={e => setNoticeName(e.target.value)}
                maxLength={25}
              ></Input>
            </InputDiv>
          </InputLabelDiv>
          <InputLabelDiv>
            <LabelDiv>
              회사명<span style={{ color: 'red' }}> *</span>
            </LabelDiv>
            <InputDiv>
              <Input
                type="text"
                placeholder="삼성 청년 SW 아카데미"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                maxLength={25}
              ></Input>
            </InputDiv>
          </InputLabelDiv>
          <InputLabelDiv>
            <LabelDiv>
              지원링크<span style={{ color: 'red' }}> *</span>
            </LabelDiv>
            <InputDiv>
              <Input
                type="text"
                placeholder="https://www.ssafy.com/ksp/jsp/swp/apply/swpApplyProcess.jsp"
                value={link}
                onChange={e => setLink(e.target.value)}
                maxLength={100}
              ></Input>
            </InputDiv>
          </InputLabelDiv>
          <InputLabelDiv>
            <LabelDiv>연관태그등록</LabelDiv>
            <InputDiv>
              <Input
                type="text"
                value={tagItem}
                onChange={e => setTagItem(e.target.value)}
                maxLength={10}
                onKeyDown={e => enterKeyDownHandler(e)}
              ></Input>
            </InputDiv>
          </InputLabelDiv>
          <TagDiv>
            {tagList.map((tag, index) => (
              <TagComponent key={index} tagName={tag} deleteTag={deleteTag} />
            ))}
          </TagDiv>
          <InputLabelDiv>
            <LabelDiv>
              일시<span style={{ color: 'red' }}> *</span>
            </LabelDiv>
            <InputDiv>
              <Input
                type="text"
                value={scheduleDate}
                onChange={e => setScheduleDate(e.target.value)}
                maxLength={20}
                onKeyDown={e => enterKeyDownHandler(e)}
              ></Input>
            </InputDiv>
          </InputLabelDiv>

          <InputLabelDiv>
            <LabelDiv>
              일정<span style={{ color: 'red' }}> *</span>
            </LabelDiv>
            <InputDiv>
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
                <Input
                  type="text"
                  value={scheduleName}
                  onChange={e => setScheduleName(e.target.value)}
                  maxLength={20}
                ></Input>
              )}
            </InputDiv>
          </InputLabelDiv>
        </>
      ) : (
        <>
          <InputLabelDiv>
            <LabelDiv>
              공고명<span style={{ color: 'red' }}> *</span>
            </LabelDiv>
            <InputDiv>
              <StateSelect
                id="titleFont"
                defaultValue={noticeSeq}
                onChange={e => setNoticeSeq(parseInt(e.target.value))}
              >
                <option id="titleFont" value={0}>
                  항목을 선택해주세요.
                </option>
                {noticeList?.map((notice, index) => (
                  <option
                    key={index + 1}
                    id="titleFont"
                    value={notice.noticeSeq}
                  >
                    {`${notice.noticeName} - ${notice.companyName}`}
                  </option>
                ))}
              </StateSelect>
            </InputDiv>
          </InputLabelDiv>
          <InputLabelDiv>
            <LabelDiv>
              일시<span style={{ color: 'red' }}> *</span>
            </LabelDiv>
            <InputDiv>
              <Input
                type="text"
                value={scheduleDate}
                onChange={e => setScheduleDate(e.target.value)}
                maxLength={20}
                onKeyDown={e => enterKeyDownHandler(e)}
              ></Input>
            </InputDiv>
          </InputLabelDiv>
          <InputLabelDiv>
            <LabelDiv>
              일정<span style={{ color: 'red' }}> *</span>
            </LabelDiv>
            <InputDiv>
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
                <Input
                  type="text"
                  value={scheduleName}
                  onChange={e => setScheduleName(e.target.value)}
                  maxLength={20}
                ></Input>
              )}
            </InputDiv>
          </InputLabelDiv>
        </>
      )}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px',
        }}
      >
        <ButtonDivForm>
          <ButtonDiv>
            <Button
              id="contentFont"
              color={colors.bsColor2}
              type={0}
              onClick={() => addButtonClicked()}
            >
              저장
            </Button>
          </ButtonDiv>
          <div style={{ width: '5%' }}></div>
          <ButtonDiv>
            <Button
              id="contentFont"
              color="white"
              type={1}
              onClick={() => closeNoticeModal()}
            >
              닫기
            </Button>
          </ButtonDiv>
        </ButtonDivForm>
      </div>
    </Wrapper>
  );
};

export default NoticeModal;
