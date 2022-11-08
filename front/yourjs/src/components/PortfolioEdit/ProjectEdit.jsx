import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import { Container, ContentTitle, ContentSet, Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr} from '../Portfolio/personal';
import axiosInstance from '../../common/customAxios';
import { apis, SERVER_IP } from '../../common/apis';
import Project from '../Portfolio/project';
import axios from 'axios';
import { useEffect } from 'react';
import Modal from 'react-modal';
import { colors } from '../../common/color';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import { Essential } from './ProjectEditComponent';


const ChangeButton = styled.button`
  width: 4rem;
  height: 2rem;
  cursor: pointer;
  margin: 0.5rem;
`

const DelButton = styled.button`
  width: 4rem;
  height: 2rem;
  cursor: pointer;
  margin: 0.5rem;
`

export {ChangeButton, DelButton}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    // height: '50%',
    height: "fit-content"
  },
};

Modal.setAppElement('#root');

const ModalForm = styled.div`
  display: flex;
  margin-bottom: 1rem;
`

const ModalTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 1%;
  font-family: 'InfinitySans-RegularA1';
  width: 35%;
  text-align: center;
`

const ModalContent = styled.input`
  font-size: 1rem;
  margin-bottom: 1%;
  font-family: 'GmarketSansMedium';
  width: 60%;
`

const ModalContentDate = styled.div`
  font-size: 1rem;
  margin-bottom: 3%;
  font-family: 'GmarketSansMedium';
  width: 60%;
`

const InsertBtnDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const InsertBtn = styled.button`
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 1.1rem;
  margin: 1rem;
  padding: 0.5rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const ProjectEdit = ({dataArr, getServerData}) => {
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
              <ModalContent
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

export default ProjectEdit