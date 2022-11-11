import React from 'react'
import { useState } from 'react';
import {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr,
  ChangeButton, DelButton, customStyles, ModalForm, ModalTitle, ModalContent, ModalContentDate, InsertBtnDiv, InsertBtn,
  BoxInput, BoxArea, SaveButton, Essential, EssentialDate} from '../../common/PorfoStyled';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import Modal from 'react-modal';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';


Modal.setAppElement('#root');

const CertificateEdit = ({dataArr, getServerData}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const openModal = (index) => {
    setModalOpen(true);
    setModalData(dataArr[index]);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const delButtonClicked = (certificateSeq) => {
    axiosInstance
      .delete(apis.certificate, {
        data: {"certificateSeq": certificateSeq}
      })
      .then(response => {
        if (response.status === 200) {
          getServerData()
        }
      })
      .catch(error => console.log(error));
  };

  const insertBtnClicked = () => {
    if (modalData.certName === '' || modalData.acquisitionDate === '' || modalData.certNum === '' || modalData.certInstitution === '') {
      alert("필수값을 입력해 주세요.")
    } else {
    axiosInstance
      .put(apis.certificate, modalData)
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
        <ContentTitle>📖 자격증/어학</ContentTitle>
        <ContentSet>
          <Hr></Hr>
          {dataArr.map((el, index) => (
            <Content key={index}>
              <LeftBox>{el.acquisitionDate}<br/><br/>
              <ChangeButton>수정</ChangeButton>
              <DelButton>삭제</DelButton></LeftBox>
              <CenterBox></CenterBox>
              <RightBoxes>
                <RightBox>
                  <RightBoxTitle>자격증명</RightBoxTitle>
                  <RightBoxContent>{el.certName}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>자격번호</RightBoxTitle>
                  <RightBoxContent>{el.certNum}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>발급기관</RightBoxTitle>
                  <RightBoxContent>{el.certInstitution}</RightBoxContent>
                </RightBox>
                <RightBox>파일</RightBox>
              </RightBoxes>
            </Content>
            ))}
          </ContentSet>
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
                  value={modalData.acquisitionDate}
                  onChange={(e) => setModalData({...modalData, acquisitionDate: dayjs(e).format('YYYY-MM-DD')})}
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
              <ModalTitle>자격증명 <Essential>(*)</Essential></ModalTitle>
              <ModalContent
                type="text"
                value={modalData.certName}
                onChange={(e) => setModalData({...modalData, certName: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>자격번호 <Essential>(*)</Essential></ModalTitle>
              <ModalContent
                type="text"
                value={modalData.certNum}
                onChange={(e) => setModalData({...modalData, certNum: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>발급기관 <Essential>(*)</Essential></ModalTitle>
              <ModalContent
                type="text"
                value={modalData.certInstitution}
                onChange={(e) => setModalData({...modalData, certInstitution: e.target.value})} />
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
              <LeftBox>{el.acquisitionDate}<br/>~ {el.endDate}<br/><br/>
              <ChangeButton onClick={() => openModal(index)}>수정</ChangeButton>
              <DelButton onClick={() => delButtonClicked(el.certificateSeq)}>삭제</DelButton></LeftBox>
              <CenterBox></CenterBox>
              <RightBoxes>
                <RightBox>
                  <RightBoxTitle>프로젝트명</RightBoxTitle>
                  <RightBoxContent>{el.certName}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>소속명</RightBoxTitle>
                  <RightBoxContent>{el.certNum}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>사용기술</RightBoxTitle>
                  <RightBoxContent>{el.certInstitution}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>내용</RightBoxTitle>
                  <RightBoxContent>{el.content}</RightBoxContent>
                </RightBox>
                <RightBox>파일</RightBox>
              </RightBoxes>
            </Content>
            ))}
          </ContentSet>
        </Container>
    </div>
  )
}

export default CertificateEdit