import React from 'react'
import { useState } from 'react';
import {Container, ContentTitle, ContentSet, Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr,
  ChangeButton, DelButton, customStyles, ModalForm, ModalTitle, ModalContent, ModalContentDate, InsertBtnDiv, InsertBtn, Essential, DateBox} from '../../common/PorfoStyled';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import Modal from 'react-modal';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getMonth';
import range from "lodash/range";


Modal.setAppElement('#root');

const CertificateEdit = ({dataArr, getServerData}) => {
  const years = range(getYear(new Date()), getYear(new Date())-40, -1);
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const openModal = (index) => {
    setModalOpen(true);
    setModalData(dataArr[index]);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const delButtonClicked = (certSeq) => {
    axiosInstance
      .delete(apis.certificate, {
        data: {"certSeq": certSeq}
      })
      .then(response => {
        console.log('A')
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
          <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <ModalForm>
              <ModalTitle>취득일 <Essential>(*)</Essential></ModalTitle>
              <ModalContentDate>
              <DatePicker
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                  }) => (
                    <Content>
                      <DateBox>
                        <select
                          value={getYear(date)}
                          onChange={({ target: { value } }) => changeYear(Number(value))}
                        >
                          {years.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <span> 년</span>
                      </DateBox>
                      <DateBox>
                        <select
                          value={months[getMonth(date)]}
                          onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                          }
                        >
                          {months.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <span> 월</span>
                      </DateBox>
                    </Content>
                  )}
                  locale={ko}
                  placeholderText='취득일'
                  dateFormat="yyyy - MM - dd"
                  autoComplete="off"
                  id="contentFont"
                  value={modalData.acquisitionDate}
                  onChange={(date) => setModalData({...modalData, acquisitionDate: dayjs(date).format('YYYY-MM-DD')})}
                />
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
              <LeftBox>{el.acquisitionDate}<br/><br/>
              <ChangeButton onClick={() => openModal(index)}>수정</ChangeButton>
              <DelButton onClick={() => delButtonClicked(el.certSeq)}>삭제</DelButton></LeftBox>
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
              </RightBoxes>
            </Content>
            ))}
          </ContentSet>
        </Container>
    </div>
  )
}


export default CertificateEdit