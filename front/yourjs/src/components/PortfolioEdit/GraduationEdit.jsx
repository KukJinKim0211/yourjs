import React from 'react'
import { useState } from 'react';
import {Container, ContentTitle, ContentSet, Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr,
  ChangeButton, DelButton, customStyles, ModalForm, ModalTitle, ModalContent, ModalContentDate, InsertBtnDiv, InsertBtn, Essential} from '../../common/PorfoStyled';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import Modal from 'react-modal';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';


Modal.setAppElement('#root');

const GraduationEdit = ({dataArr, getServerData}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const openModal = (index) => {
    setModalOpen(true);
    setModalData(dataArr[index]);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const delButtonClicked = (graduateSeq) => {
    axiosInstance
      .delete(apis.graduation, {
        data: {"graduateSeq": graduateSeq}
      })
      .then(response => {
        if (response.status === 200) {
          getServerData()
        }
      })
      .catch(error => console.log(error));
  };

  const insertBtnClicked = () => {
    if (modalData.schoolName === '' || modalData.startDate === '' || modalData.location === '') {
      alert("필수값을 입력해 주세요.")
    } else {
    axiosInstance
      .put(apis.graduation, modalData)
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
        <ContentTitle>🎓 학력사항</ContentTitle>
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
              <ModalTitle>학교명 <Essential>(*)</Essential></ModalTitle>
              <ModalContent
                type="text"
                value={modalData.schoolName}
                onChange={(e) => setModalData({...modalData, schoolName: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>지역 <Essential>(*)</Essential></ModalTitle>
              <ModalContent
                type="text"
                value={modalData.location}
                onChange={(e) => setModalData({...modalData, location: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>전공</ModalTitle>
              <ModalContent
                type="text"
                value={modalData.majorName}
                onChange={(e) => setModalData({...modalData, majorName: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>복수전공</ModalTitle>
              <ModalContent
                type="text"
                value={modalData.doubleMajorName}
                onChange={(e) => setModalData({...modalData, doubleMajorName: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>부전공</ModalTitle>
              <ModalContent
                type="text"
                value={modalData.subMajorName}
                onChange={(e) => setModalData({...modalData, subMajorName: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>전공 이수학점</ModalTitle>
              <ModalContent
                type="text"
                value={modalData.majorCredit}
                onChange={(e) => setModalData({...modalData, majorCredit: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>총 이수학점</ModalTitle>
              <ModalContent
                type="text"
                value={modalData.totCredit}
                onChange={(e) => setModalData({...modalData, totCredit: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>전공 평점</ModalTitle>
              <ModalContent
                type="text"
                value={modalData.majorAvgCredit}
                onChange={(e) => setModalData({...modalData, majorAvgCredit: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>총 평점</ModalTitle>
              <ModalContent
                type="text"
                value={modalData.totAvgCredit}
                onChange={(e) => setModalData({...modalData, totAvgCredit: e.target.value})} />
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
              <DelButton onClick={() => delButtonClicked(el.graduateSeq)}>삭제</DelButton></LeftBox>
              <CenterBox></CenterBox>
              <RightBoxes>
                <RightBox>
                  <RightBoxTitle>학교명</RightBoxTitle>
                  <RightBoxContent>{el.schoolName}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>지역</RightBoxTitle>
                  <RightBoxContent>{el.location}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>전공</RightBoxTitle>
                  <RightBoxContent>{el.majorName}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>복수전공</RightBoxTitle>
                  <RightBoxContent>{el.doubleMajorName}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>부전공</RightBoxTitle>
                  <RightBoxContent>{el.subMajorName}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>전공 이수학점</RightBoxTitle>
                  <RightBoxContent>{el.majorCredit}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>총 이수학점</RightBoxTitle>
                  <RightBoxContent>{el.totCredit}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>전공 평점</RightBoxTitle>
                  <RightBoxContent>{el.majorAvgCredit}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>총 평점</RightBoxTitle>
                  <RightBoxContent>{el.totAvgCredit}</RightBoxContent>
                </RightBox>
              </RightBoxes>
            </Content>
            ))}
          </ContentSet>
        </Container>
    </div>
  )
}


export default GraduationEdit