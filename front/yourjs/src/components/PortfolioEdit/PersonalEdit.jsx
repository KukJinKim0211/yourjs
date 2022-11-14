import React from 'react'
import { useState } from 'react';
import {Container, ContentTitle, ContentSet, Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr,
  ChangeButton, DelButton, customStyles, ModalForm, ModalTitle, ModalContent, InsertBtnDiv, InsertBtn} from '../../common/PorfoStyled';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import Modal from 'react-modal';


Modal.setAppElement('#root');

const PersonalEdit = ({dataArr, getServerData}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const openModal = (index) => {
    setModalOpen(true);
    setModalData(dataArr[index]);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const delButtonClicked = (portfolioSeq) => {
    axiosInstance
      .delete(apis.portfolio, {
        data: {"portfolioSeq": portfolioSeq}
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
    axiosInstance
      .put(apis.portfolio, modalData)
      .then(response => {
        if (response.status === 200) {
          getServerData()
          closeModal()
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <div>
      <Container>
        <ContentTitle>🔖 인적사항</ContentTitle>
        <ContentSet>
          <Hr></Hr>
          <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <ModalForm>
              <ModalTitle>한자 이름</ModalTitle>
              <ModalContent
                type="text"
                value={modalData.cnName}
                onChange={(e) => setModalData({...modalData, cnName: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>영어 이름</ModalTitle>
              <ModalContent
                type="text"
                value={modalData.engName}
                onChange={(e) => setModalData({...modalData, engName: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>기술스택</ModalTitle>
              <ModalContent
                type="text"
                value={modalData.techStacks}
                onChange={(e) => setModalData({...modalData, techStacks: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>외부 URL</ModalTitle>
              <ModalContent
                type="text"
                value={modalData.links}
                onChange={(e) => setModalData({...modalData, links: e.target.value})} />
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
              <LeftBox>
              <ChangeButton onClick={() => openModal(index)}>수정</ChangeButton>
              <DelButton onClick={() => delButtonClicked(el.portfolioSeq)}>삭제</DelButton></LeftBox>
              <CenterBox></CenterBox>
              <RightBoxes>
                <RightBox>
                  <RightBoxTitle>한자 이름</RightBoxTitle>
                  <RightBoxContent>{el.cnName}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>영어 이름</RightBoxTitle>
                  <RightBoxContent>{el.engName}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>기술스택</RightBoxTitle>
                  <RightBoxContent>{el.techStacks}</RightBoxContent>
                </RightBox>
                <RightBox>
                  <RightBoxTitle>외부 URL</RightBoxTitle>
                  <RightBoxContent>{el.links}</RightBoxContent>
                </RightBox>
              </RightBoxes>
            </Content>
            ))}
          </ContentSet>
        </Container>
    </div>
  )
}


export default PersonalEdit