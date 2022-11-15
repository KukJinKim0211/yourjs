// 유저 카드
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { profileImgList } from '../../common/profileImage';
import Profile00 from '../../img/profile/profile00.png';
import { colors } from '../../common/color';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import { getFullDateFormat } from '../../common/date';
import Modal from 'react-modal';
import Calendar from '../../pages/Calendar';

const UserCardDiv = styled.div`
  width: 28%;
  height: 140px;
  margin: 10px 2%;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  cursor: pointer;
  &:hover {
    width: 29%;
    height: 145px;
  }
`;

const ProfileDiv = styled.div`
  width: 40%;
  height: 100%;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
`;

const ContentDiv = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const NicknameDiv = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const NoticeDiv = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '85%',
    display: 'flex',
    justifyContent: 'center',
  },
};

const UserCard = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [noticeCount, setNoticeCount] = useState(0);

  const getData = () => {
    axiosInstance
      .get(apis.noticeSubject + `/${data.userSeq}`)
      .then(response => {
        if (response.status === 200) {
          let count = 0;
          response.data.forEach(data => {
            data.schedules.forEach(d => {
              if (
                getFullDateFormat(new Date()) < d.scheduleDate &&
                d.scheduleName === '서류제출'
              )
                count++;
            });
          });
          setNoticeCount(count);
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <UserCardDiv onClick={() => setModalOpen(true)}>
        <ProfileDiv>
          <ProfileImg
            src={
              parseInt(data.userImg) > 0 && parseInt(data.userImg) < 30
                ? profileImgList[data.userImg]
                : Profile00
            }
          ></ProfileImg>
        </ProfileDiv>
        <ContentDiv>
          <NicknameDiv id="titleFont">{data.nickname}</NicknameDiv>
          <NoticeDiv id="titleFont">진행중공고 : {noticeCount}</NoticeDiv>
        </ContentDiv>
      </UserCardDiv>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customModalStyles}
        contentLabel="Modal"
      >
        <Calendar userSeq={data.userSeq} readOnly={true}></Calendar>
      </Modal>
    </>
  );
};

export default UserCard;
