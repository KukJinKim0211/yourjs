import React from 'react'
import { useState, useEffect } from 'react';
import {Container, ContentTitle, ContentSet, Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr,
  ChangeButton, customStyles, ModalForm, ModalTitle, ModalContent, InsertBtnDiv, InsertBtn, ModalContentArea} from '../../common/PorfoStyled';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import Modal from 'react-modal';


Modal.setAppElement('#root');

const PersonalEdit = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [viewData, setViewData] = useState([]);
  const [detailData, setDetailData] = useState([]);

  const openModal = () => {
    setModalOpen(true);
    setModalData(viewData);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const insertBtnClicked = () => {
    axiosInstance
      .put(apis.portfolio, modalData)
      .then(response => {
        if (response.status === 200) {
          setViewData(response.data);
          closeModal();
        }
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    axiosInstance
      .get(apis.portfolio)
      .then(response => {
        setViewData(response.data);
      })
      
    axiosInstance
      .get(apis.getUserDetailInfo)
      .then(response => {
        setDetailData(response.data);
      })
  }, []);

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
          ><br/>
            <ModalForm>
              <ModalTitle>한자 이름</ModalTitle>
              <ModalContent
                type="text"
                value={modalData.cnName || ''}
                onChange={(e) => setModalData({...modalData, cnName: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>영어 이름</ModalTitle>
              <ModalContent
                type="text"
                value={modalData.engName || ''}
                onChange={(e) => setModalData({...modalData, engName: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>기술스택</ModalTitle>
              <ModalContent
                type="text"
                value={modalData.techStacks || ''}
                onChange={(e) => setModalData({...modalData, techStacks: e.target.value})} />
            </ModalForm>
            <ModalForm>
              <ModalTitle>외부 URL</ModalTitle>
              <ModalContentArea
                type="text"
                value={modalData.links || ''}
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
          <Content>
            <LeftBox><ChangeButton onClick={() => openModal()}>수정</ChangeButton></LeftBox>
            <CenterBox></CenterBox>
            <RightBoxes>
              <RightBox>
                <RightBoxTitle>이름</RightBoxTitle>
                <RightBoxContent>{detailData.userName}</RightBoxContent>
              </RightBox>
              <RightBox>
                <RightBoxTitle>이메일</RightBoxTitle>
                <RightBoxContent>{detailData.email}</RightBoxContent>
              </RightBox>
              <RightBox>
                <RightBoxTitle>한자 이름</RightBoxTitle>
                <RightBoxContent>{viewData.cnName}</RightBoxContent>
              </RightBox>
              <RightBox>
                <RightBoxTitle>영어 이름</RightBoxTitle>
                <RightBoxContent>{viewData.engName}</RightBoxContent>
              </RightBox>
              <RightBox>
                <RightBoxTitle>기술스택</RightBoxTitle>
                <RightBoxContent>{viewData.techStacks}</RightBoxContent>
              </RightBox>
              <RightBox>
                <RightBoxTitle>외부 URL</RightBoxTitle>
                <RightBoxContent>{viewData.links?.split("\n").map((e, index) => <div key={index}>{e}</div>)}</RightBoxContent>
              </RightBox>
            </RightBoxes>
          </Content>
        </ContentSet>
      </Container>
    </div>
  )
}


export default PersonalEdit