import React from 'react'
import { useState } from 'react';
import {Container, ContentTitle, ContentSet, Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr,
  ChangeButton, DelButton, customStyles, ModalForm, ModalTitle, ModalContent, ModalContentArea, ModalContentDate, InsertBtnDiv, InsertBtn, Essential, DateBox} from '../../common/PorfoStyled';
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

const ProjectEdit = ({dataArr, getServerData}) => {
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

  const delButtonClicked = (projectSeq) => {
    axiosInstance
      .delete(apis.project, {
        data: {"projectSeq": projectSeq}
      })
      .then(response => {
        if (response.status === 200) {
          getServerData()
        }
      })
      .catch(error => console.log(error));
  };

  const insertBtnClicked = () => {
    if (modalData.projectName === '' || modalData.startDate === '' || modalData.belongs === '' || modalData.tools === '' || modalData.content === '') {
      alert("필수값을 입력해 주세요.")
    } else {
    axiosInstance
      .put(apis.project, modalData)
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
        <ContentTitle>📜 프로젝트</ContentTitle>
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
                  placeholderText='시작일'
                  dateFormat="yyyy - MM - dd"
                  autoComplete="off"
                  id="contentFont"
                  value={modalData.startDate}
                  onChange={(date) => setModalData({...modalData, startDate: dayjs(date).format('YYYY-MM-DD')})}
                />
              </ModalContentDate>
              <ModalTitle>종료일</ModalTitle>
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
                  placeholderText='종료일'
                  dateFormat="yyyy - MM - dd"
                  autoComplete="off"
                  id="contentFont"
                  value={modalData.endDate}
                  onChange={(date) => setModalData({...modalData, endDate: dayjs(date).format('YYYY-MM-DD')})}
                />
              </ModalContentDate>
            </ModalForm>
            <ModalForm>
              <ModalTitle>프로젝트명 <Essential>(*)</Essential></ModalTitle>
              <ModalContent
                type="text"
                value={modalData.projectName}
                onChange={(e) => setModalData({...modalData, projectName: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>소속명 <Essential>(*)</Essential></ModalTitle>
              <ModalContent
                type="text"
                value={modalData.belongs}
                onChange={(e) => setModalData({...modalData, belongs: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>사용기술 <Essential>(*)</Essential></ModalTitle>
              <ModalContent
                type="text"
                value={modalData.tools}
                onChange={(e) => setModalData({...modalData, tools: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>내용 <Essential>(*)</Essential></ModalTitle>
              <ModalContentArea
                type="text"
                value={modalData.content}
                onChange={(e) => setModalData({...modalData, content: e.target.value})} />
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
              <DelButton onClick={() => delButtonClicked(el.projectSeq)}>삭제</DelButton></LeftBox>
              <CenterBox></CenterBox>
              <RightBoxes>
                <RightBox>
                  <RightBoxTitle>프로젝트명</RightBoxTitle>
                  <RightBoxContent>{el.projectName}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>소속명</RightBoxTitle>
                  <RightBoxContent>{el.belongs}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>사용기술</RightBoxTitle>
                  <RightBoxContent>{el.tools}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>내용</RightBoxTitle>
                  <RightBoxContent>{el.content?.split("\n").map((e, index) => <div key={index}>{e}</div>)}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>파일</RightBoxTitle>
                  <RightBoxContent></RightBoxContent>
                </RightBox>
              </RightBoxes>
            </Content>
            ))}
          </ContentSet>
        </Container>
    </div>
  )
}


export default ProjectEdit