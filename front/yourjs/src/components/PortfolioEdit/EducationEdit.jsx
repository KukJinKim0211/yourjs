import React from 'react'
import { useState } from 'react';
import {Container, ContentTitle, ContentSet, Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr,
  ChangeButton, DelButton, customStyles, ModalForm, ModalTitle, ModalContent, ModalContentArea, ModalContentDate, InsertBtnDiv, InsertBtn, Essential} from '../../common/PorfoStyled';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import Modal from 'react-modal';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';


Modal.setAppElement('#root');

const EducationEdit = ({dataArr, getServerData}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const openModal = (index) => {
    setModalOpen(true);
    setModalData(dataArr[index]);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const delButtonClicked = (eduSeq) => {
    axiosInstance
      .delete(apis.education, {
        data: {"eduSeq": eduSeq}
      })
      .then(response => {
        if (response.status === 200) {
          getServerData()
        }
      })
      .catch(error => console.log(error));
  };

  const insertBtnClicked = () => {
    if (modalData.eduName === '' || modalData.startDate === '' || modalData.eduContents === '' || modalData.eduInstitution === '' || modalData.eduTime === null) {
      alert("필수값을 입력해 주세요.")
    } else {
    axiosInstance
      .put(apis.education, modalData)
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
        <ContentTitle>🔥 교육사항</ContentTitle>
        <ContentSet>
          <Hr></Hr>
          <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <ModalForm>
              <ModalTitle>시작일 <Essential>(*)</Essential></ModalTitle>
              <ModalContentDate>
                <DatePicker
                  placeholderText='시작일'
                  locale={ko}
                  dateFormat="yyyy-MM-dd"
                  autoComplete="off"
                  id="contentFont"
                  value={modalData.startDate}
                  onChange={(e) => setModalData({...modalData, startDate: dayjs(e).format('YYYY-MM-DD')})}
                  >
                </DatePicker>
              </ModalContentDate>
              <ModalTitle>종료일</ModalTitle>
              <ModalContentDate>
                <DatePicker
                  placeholderText='종료일'
                  locale={ko}
                  dateFormat="yyyy-MM-dd"
                  autoComplete="off"
                  id="contentFont"
                  value={modalData.endDate}
                  onChange={(e) => setModalData({...modalData, endDate: dayjs(e).format('YYYY-MM-DD')})}
                  >
                </DatePicker>
              </ModalContentDate>
            </ModalForm>
            <ModalForm>
              <ModalTitle>교육명 <Essential>(*)</Essential></ModalTitle>
              <ModalContent
                type="text"
                value={modalData.eduName}
                onChange={(e) => setModalData({...modalData, eduName: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>주관기관 <Essential>(*)</Essential></ModalTitle>
              <ModalContent
                type="text"
                value={modalData.eduInstitution}
                onChange={(e) => setModalData({...modalData, eduInstitution: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>교육시간 <Essential>(*)</Essential></ModalTitle>
              <ModalContent
                type="text"
                value={modalData.eduTime}
                onChange={(e) => setModalData({...modalData, eduTime: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>교육내용 <Essential>(*)</Essential></ModalTitle>
              <ModalContentArea
                type="text"
                value={modalData.eduContents}
                onChange={(e) => setModalData({...modalData, eduContents: e.target.value})} />
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
              <LeftBox>{el.startDate}<br/>~ {el.endDate}<br/><br/>
              <ChangeButton onClick={() => openModal(index)}>수정</ChangeButton>
              <DelButton onClick={() => delButtonClicked(el.eduSeq)}>삭제</DelButton></LeftBox>
              <CenterBox></CenterBox>
              <RightBoxes>
                <RightBox>
                  <RightBoxTitle>교육명</RightBoxTitle>
                  <RightBoxContent>{el.eduName}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>주관기관</RightBoxTitle>
                  <RightBoxContent>{el.eduInstitution}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>교육시간</RightBoxTitle>
                  <RightBoxContent>{el.eduTime} 시간</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>교육내용</RightBoxTitle>
                  <RightBoxContent>{el.eduContents?.split("\n").map((e, index) => <div key={index}>{e}</div>)}</RightBoxContent>
                </RightBox>
              </RightBoxes>
            </Content>
            ))}
          </ContentSet>
        </Container>
    </div>
  )
}


export default EducationEdit