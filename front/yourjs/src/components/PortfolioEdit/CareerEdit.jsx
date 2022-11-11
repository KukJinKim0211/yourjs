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

const CareerEdit = ({dataArr, getServerData}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const openModal = (index) => {
    setModalOpen(true);
    setModalData(dataArr[index]);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const delButtonClicked = (careerSeq) => {
    axiosInstance
      .delete(apis.career, {
        data: {"careerSeq": careerSeq}
      })
      .then(response => {
        if (response.status === 200) {
          getServerData()
        }
      })
      .catch(error => console.log(error));
  };

  const insertBtnClicked = () => {
    if (modalData.company === '' || modalData.department === '' || modalData.position === '' || modalData.startDate === '') {
      alert("필수값을 입력해 주세요.")
    } else {
    axiosInstance
      .put(apis.career, modalData)
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
        <ContentTitle>📈 커리어</ContentTitle>
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
              <ModalTitle>회사명 <Essential>(*)</Essential></ModalTitle>
              <ModalContent
                type="text"
                value={modalData.company}
                onChange={(e) => setModalData({...modalData, company: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>부서명 <Essential>(*)</Essential></ModalTitle>
              <ModalContent
                type="text"
                value={modalData.department}
                onChange={(e) => setModalData({...modalData, department: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>직위 <Essential>(*)</Essential></ModalTitle>
              <ModalContent
                type="text"
                value={modalData.position}
                onChange={(e) => setModalData({...modalData, position: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>연봉 </ModalTitle>
              <ModalContent
                type="text"
                value={modalData.salary}
                onChange={(e) => setModalData({...modalData, salary: e.target.value})} />
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
              <DelButton onClick={() => delButtonClicked(el.careerSeq)}>삭제</DelButton></LeftBox>
              <CenterBox></CenterBox>
              <RightBoxes>
                <RightBox>
                  <RightBoxTitle>회사명</RightBoxTitle>
                  <RightBoxContent>{el.company}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>부서명</RightBoxTitle>
                  <RightBoxContent>{el.department}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>직위</RightBoxTitle>
                  <RightBoxContent>{el.position}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>연봉</RightBoxTitle>
                  <RightBoxContent>{el.salary}</RightBoxContent>
                </RightBox>
              </RightBoxes>
            </Content>
          ))}
        </ContentSet>
      </Container>
    </div>
  )
}

export default CareerEdit