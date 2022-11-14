import React from 'react'
import { useState } from 'react';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr,
  ChangeButton, DelButton, customStyles, ModalForm, ModalTitle, ModalContent, ModalContentArea, ModalContentDate, InsertBtnDiv, InsertBtn,
  BoxInput, BoxArea, SaveButton, Essential, EssentialDate} from '../../common/PorfoStyled';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import Modal from 'react-modal';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';


Modal.setAppElement('#root');

const AwardEdit = ({dataArr, getServerData}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const openModal = (index) => {
    setModalOpen(true);
    setModalData(dataArr[index]);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const delButtonClicked = (awardSeq) => {
    axiosInstance
      .delete(apis.award, {
        data: {"awardSeq": awardSeq}
      })
      .then(response => {
        if (response.status === 200) {
          getServerData()
        }
      })
      .catch(error => console.log(error));
  };

  const insertBtnClicked = () => {
    if (modalData.awardName === '' || modalData.winDate === '' || modalData.awardContents === '' || modalData.awardInstitution === '') {
      alert("필수값을 입력해 주세요.")
    } else {
    axiosInstance
      .put(apis.award, modalData)
      .then(response => {
        if (response.status === 200) {
          getServerData()
          closeModal()
        }
      })
      .catch(error => console.log(error));}
  }

  return (
    <div>
      <Container>
        <ContentTitle>🥇 수상내역</ContentTitle>
        <ContentSet>
          <Hr></Hr>
          <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <ModalForm>
              <ModalTitle>수상일 <Essential>(*)</Essential></ModalTitle>
              <ModalContentDate>
                <DatePicker
                  placeholderText='수상일'
                  locale={ko}
                  dateFormat="yyyy-MM-dd"
                  autoComplete="off"
                  id="contentFont"
                  value={modalData.winDate}
                  onChange={(e) => setModalData({...modalData, winDate: dayjs(e).format('YYYY-MM-DD')})}
                  >
                </DatePicker>
              </ModalContentDate>
            </ModalForm>
            <ModalForm>
              <ModalTitle>수상명 <Essential>(*)</Essential></ModalTitle>
              <ModalContent
                type="text"
                value={modalData.awardName}
                onChange={(e) => setModalData({...modalData, awardName: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>수상내용 <Essential>(*)</Essential></ModalTitle>
              <ModalContentArea
                type="text"
                value={modalData.awardContents}
                onChange={(e) => setModalData({...modalData, awardContents: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>수상기관 <Essential>(*)</Essential></ModalTitle>
              <ModalContent
                type="text"
                value={modalData.awardInstitution}
                onChange={(e) => setModalData({...modalData, awardInstitution: e.target.value})} />
            </ModalForm>
            <InsertBtnDiv>
              <InsertBtn
                id="contentFont"
                onClick={insertBtnClicked}
              >수정</InsertBtn>
              <InsertBtn
                id="contentFont"
                onClick={() => closeModal()}
              >취소</InsertBtn>
            </InsertBtnDiv>
          </Modal>

          {dataArr?.map((el, index) => (
            <Content key={index}>
              <LeftBox>{el.winDate}<br/><br/>
              <ChangeButton onClick={() => openModal(index)}>수정</ChangeButton>
              <DelButton onClick={() => delButtonClicked(el.awardSeq)}>삭제</DelButton></LeftBox>
              <CenterBox></CenterBox>
              <RightBoxes>
                <RightBox>
                  <RightBoxTitle>수상명</RightBoxTitle>
                  <RightBoxContent>{el.awardName}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>수상내용</RightBoxTitle>
                  <RightBoxContent>{el.awardContents?.split("\n").map((e, index) => <div key={index}>{e}</div>)}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>수상기관</RightBoxTitle>
                  <RightBoxContent>{el.awardInstitution}</RightBoxContent>
                </RightBox>
              </RightBoxes>
            </Content>
            ))}
          </ContentSet>
        </Container>
    </div>
  )
}

export default AwardEdit