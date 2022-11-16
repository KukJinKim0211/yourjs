import styled from 'styled-components';
import React, { useState } from 'react';
import { colors } from '../../common/color';
import {
  faBuilding,
  faFile,
  faCalendarDays,
  faSpinner,
  faMinus,
  faPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from '../../common/customAxios';
import { scheduleList, getScheduleList } from '../../common/define';
import { apis } from '../../common/apis';

const Wrapper = styled.div`
  width: 90%;
  height: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TitleText = styled.p`
  font-size: 26px;
  border-bottom: 2px solid ${colors.bsColor4};
`;

const ScheduleDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: ${props => `${props.mt}%`};
`;

const ScheduleTitle = styled.span`
  width: 85%;
  font-size: 22px;
  font-family: 'GmarketSansMedium';
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
  height: 200px;
  display: flex;
  margin: 10% 0px;
  justify-content: center;
`;

const ButtonDiv = styled.div`
  width: 50%;
  height: 100%;
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
    props.type === 0 ? `1px solid ${colors.bsColor2}` : `1px solid red`};
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${props =>
      props.type === 0 ? colors.bsColor3 : 'rgba(0, 0, 0, 0.2)'};
  }
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
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const ScheduleModal = ({ data, closeScheduleModal, getNotice }) => {
  const [scheduleIndex, setScheduleIndex] = useState(0);

  // 일정 수정
  const updateSchedule = () => {
    axiosInstance
      .patch(apis.schedule, {
        scheduleSeq: data.scheduleSeq,
        noticeSeq: data.noticeSeq,
        scheduleName: scheduleList[scheduleIndex - 1],
        scheduleDate: data.scheduleDate,
      })
      .then(response => {
        if (response.status === 200) {
          alert('일정 수정이 완료되었습니다.');
          closeScheduleModal();
          getNotice();
        }
      });
  };

  // 일정 삭제
  const deleteSchedule = () => {
    console.log(data.scheduleSeq);
    axiosInstance
      .delete(apis.schedule, {
        data: {
          scheduleSeq: data.scheduleSeq,
        },
      })
      .then(response => {
        if (response.status === 200) {
          alert('일정 삭제가 완료되었습니다.');
          getNotice();
          closeScheduleModal();
        }
      });
  };
  return (
    <Wrapper>
      <TitleDiv>
        <CloseButton style={{ visibility: 'hidden' }} />
        <TitleText id="contentFont">일정 변경</TitleText>
        <CloseButton id="contentFont" onClick={() => closeScheduleModal()}>
          <FontAwesomeIcon
            icon={faXmark}
            size="xl"
            style={{
              width: '60px',
            }}
          />
        </CloseButton>
      </TitleDiv>
      <ScheduleDiv mt={10}>
        <FontAwesomeIcon
          icon={faFile}
          size="xl"
          style={{
            width: '60px',
          }}
        />
        <ScheduleTitle>
          {data.noticeName?.length >= 25
            ? `${data.noticeName?.slice(0, 24)}....`
            : data.noticeName}
        </ScheduleTitle>
      </ScheduleDiv>
      <ScheduleDiv mt={10}>
        <FontAwesomeIcon
          icon={faBuilding}
          size="xl"
          style={{
            width: '60px',
          }}
        />
        <ScheduleTitle>
          {data.coName?.length >= 25
            ? `${data.coName?.slice(0, 24)}....`
            : data.coName}
        </ScheduleTitle>
      </ScheduleDiv>
      <ScheduleDiv mt={10}>
        <FontAwesomeIcon
          icon={faCalendarDays}
          size="xl"
          style={{
            width: '60px',
          }}
        />
        <ScheduleTitle>{data.scheduleDate}</ScheduleTitle>
      </ScheduleDiv>
      <ScheduleDiv mt={10}>
        <FontAwesomeIcon
          icon={faSpinner}
          size="xl"
          style={{
            width: '60px',
          }}
        />

        <ScheduleTitle>
          <StateSelect
            id="titleFont"
            defaultValue={getScheduleList(data.scheduleName)}
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
        </ScheduleTitle>
      </ScheduleDiv>
      <div style={{ height: '10%' }}></div>
      <ButtonDivForm>
        <ButtonDiv>
          <Button
            id="contentFont"
            color={colors.bsColor2}
            type={0}
            onClick={() => updateSchedule()}
          >
            <FontAwesomeIcon
              icon={faPlus}
              size="xl"
              style={{
                width: '60px',
              }}
            />
          </Button>
        </ButtonDiv>
        <div style={{ width: '5%' }}></div>
        <ButtonDiv>
          <Button
            id="contentFont"
            color="white"
            style={{ border: '1px solid red', color: 'red' }}
            type={1}
            onClick={() => deleteSchedule()}
          >
            <FontAwesomeIcon
              icon={faMinus}
              size="xl"
              style={{
                width: '60px',
              }}
            />
          </Button>
        </ButtonDiv>
      </ButtonDivForm>
    </Wrapper>
  );
};

export default ScheduleModal;
