import styled from 'styled-components';
import { colors } from '../common/color';

const Container = styled.div`
  width: 90%;
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
`

const ContentTitle = styled.div`
  width: 20%;
  font-weight: bold;
  font-size: 1.3rem;
  text-align: center;
  font-family: 'Pretendard-Regular';
`

const ContentSet = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`

const Contents = styled.div`
  
`

const Content = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const LeftBox = styled.div`
  width: 25%;
  text-align: center;
  word-break: break-all;
  font-weight: bold;
  font-family: 'Pretendard-Regular';
`

const LeftBoxTitle = styled.div`
  width: 100%;
  margin: 1rem;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`

const LeftBoxContent = styled.div`
  width: 100%;
  margin-left: 1rem;
  text-align: center;
`

const CenterBox = styled.div`
  width: 5%;
`

const RightBoxes = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`

const RightBox = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  font-family: 'InfinitySans-RegularA1';
  font-weight: 200;
  color: rgba(0, 0, 0, 0.55);
`

const RightBoxTitle = styled.div`
  width: 20%;
`

const RightBoxContent = styled.div`
  width: 80%;
  word-break: break-all;
`

const Hr = styled.hr`
  width: 100%;
  height: 0.1rem;
  background-color: ${colors.bsColor3};
`

const ChangeButton = styled.button`
  width: 4rem;
  height: 2rem;
  cursor: pointer;
  margin: 0.5rem;
  background-color: ${colors.bsColor1};
  border: 0;
  border-radius: 10%;
  font-family: 'InfinitySans-RegularA1';
  &:hover {
    background-color: ${colors.bsColor2};
  }
`

const DelButton = styled.button`
  width: 4rem;
  height: 2rem;
  cursor: pointer;
  margin: 0.5rem;
  background-color: ${colors.bsColor1};
  border: 0;
  border-radius: 10%;
  font-family: 'InfinitySans-RegularA1';
  color: #e43f3f;
  &:hover {
    background-color: ${colors.bsColor2};
  }
`

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: "fit-content"
  },
};

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

const ModalContentArea = styled.textarea`
  font-size: 1rem;
  margin-bottom: 1%;
  font-family: 'GmarketSansMedium';
  width: 60%;
  height: 8rem;
  resize: none;
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

const BoxInput = styled.input`
  border: none;
  width: 70%;
  border-bottom: 2px solid ${colors.bsColor2};
  :focus {
    outline: none;
  }
  padding: 0.5rem;
  font-family: 'InfinitySans-RegularA1';
`

const BoxArea = styled.textarea`
  border: none;
  width: 70%;
  border-bottom: 2px solid ${colors.bsColor2};
  resize: none;
  height: 10rem;
  :focus {
    outline: none;
  }
  padding: 0.5rem;
  font-family: 'InfinitySans-RegularA1';
`

const SaveButton = styled.button`
  width: 4rem;
  height: 3rem;
  margin-left: 2rem;
  cursor: pointer;
  background-color: ${colors.bsColor1};
  border: 0;
  border-radius: 10%;
  font-family: 'InfinitySans-RegularA1';
  &:hover {
    background-color: ${colors.bsColor2};
  }
`

const Essential = styled.p`
  color: red;
`

const EssentialDate = styled.p`
  color: red;
  display: flex;
`

export {Container, ContentTitle, ContentSet, Contents, Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr,
  ChangeButton, DelButton, customStyles, ModalForm, ModalTitle, ModalContent, ModalContentArea, ModalContentDate, InsertBtnDiv, InsertBtn, BoxInput, BoxArea, SaveButton, Essential, EssentialDate}
