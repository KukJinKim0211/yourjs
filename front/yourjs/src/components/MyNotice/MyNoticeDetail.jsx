import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import MyNoticeAdd from './MyNoticeAdd.jsx';
import '../../App.css';
import MyNoticeAddcomponent from './MyNoticeAddcomponent.jsx';

const Wrapper = styled.div`
  height: fit-content;
  padding-bottom: 100px;
  width: 60%;
`;
const TitleBox = styled.div`
  display: flex;
  align-items: center;
`;

//회사 정보 전달 박스
const CompanyBox = styled.div`
  h1 {
    color: blue;
  }

  h3 {
    color: #3c4048;
  }
`;

//자기소개서 작성창 여는 버튼
const CreateButton = styled.button`
  width: 150px;
  height: 60px;
  background-color: aqua;
  border-radius: 10px;
  cursor: pointer;
`;

// 자기소개서 작성창 안에서 최종 작성 버튼.
const CreateButton2 = styled.button`
  width: 100px;
  height: 40px;
  background-color: #fdfdbd;
  cursor: pointer;
`;
// 컨텐츠 박스
const ContentBox = styled.div`
  background-color: whitesmoke;
  width: 100%;
  height: 350px;
  border-radius: 15px;
  box-shadow: 0.5rem 0.5rem 0.5rem gray;
  margin-bottom: 50px;
  margin-top: 10px;
`;
//컨텐츠 박스 속 태그 박스
const TagBox = styled.div`
  background-color: #81C6E8;
  border-radius: 15px;
  height: 40px;
  width: fit-content;
  padding-left: 25px;
  padding-right: 30px;
  display: flex;
  align-items: center;
  font-weight: 700;
`;
//컨텐츠 박스 제목
const ContentTitle = styled.div`
  padding-left: 15px;
  padding-top: 5px;
  margin-left: 10px;
  width: 95%;
  height: 50px;
  display: flex;
  align-items: center;
  
`;
//컨텐츠 박스 내용
const ContentContent = styled.div`
  padding: 15px;
  overflow: auto;
  height: 200px;
  width: 95%;

  // 스크롤바 없애기
  ::-webkit-scrollbar {
    display: none;
  }
`;

//컨텐츠 박스 제목 텍스트필드
const ContentTitle2 = styled.input`
  padding-left: 15px;
  padding-top: 5px;
  margin-left: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  border: none;
  font-size: 16px;
  border-bottom: 3px solid gray;
  background-color: whitesmoke;
  width: 95%;
  :focus {
    outline: none;
  }
`;
//컨텐츠 박스 내용 텍스트필드
const ContentContent2 = styled.textarea`
  padding: 15px;
  overflow: auto;
  height: 192px;
  font-size: 16px;
  width: 70%;
  border: none;
  width: 95%;
  background-color: whitesmoke;
  :focus {
    outline: none;
  }
`;

//컨텐츠 박스내에 수정 취소 넣기 위한 box
const ContentEditBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  height: 40px;
  width: 100%;
`;

// 수정 취소를 위한 버튼 style
const SaveCancelButton = styled.button`
  background-color: ${props => props.backgroundColor};
  margin-left: ${props => props.marginLeft};
  margin-right: ${props => props.marginRight};
  border: none;
  border-radius: 10px;
  box-shadow: 0.5rem 0.5rem 0.5rem gray;
  width: 10%;
  height: 30px;
  cursor: pointer;
  margin-bottom: 10%;
`;

const dummyData = {
  regdate: '2022-09-01',
  company: '지우컴퍼니',
  link: 'www.naver.com',
  state : "진행중"
};

const dummy = [
  {
    title: '지우 컴퍼니에 지원하게 된 동기가 무엇입니까 ??',
    content: `차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
    뽑아만 주십시오! 충. 성 ^^7 차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
    뽑아만 주십시오! 충. 성 ^^7 차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
    뽑아만 주십시오! 충. 성 ^^7 차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
    뽑아만 주십시오! 충. 성 ^^7 차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
    뽑아만 주십시오! 충. 성 ^^7 차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
    뽑아만차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
    뽑아만 주십시오! 충. 성 ^^7 차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
    뽑아만 주십시오! 충. 성 ^^7 차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
    뽑아만 주십시오! 충. 성 ^^7 차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
    뽑아만 주십시오! 충. 성 ^^7 차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
    뽑아만 주십시오! 충. 성 ^^7 차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
    뽑아만차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
    뽑아만 주십시오! 충. 성 ^^7 차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
    뽑아만 주십시오! 충. 성 ^^7 차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
    뽑아만 주십시오! 충. 성 ^^7 차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
    뽑아만 주십시오! 충. 성 ^^7 차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
    뽑아만 주십시오! 충. 성 ^^7 차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
    뽑아만`,
    
  },
  {
    title: '지우 컴퍼니에 지원하게 된 동기가 무엇입니까 ??',
    content: `차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
      뽑아만 주십시오! 충. 성 ^^7 차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
      뽑아만 주십시오! 충. 성 ^^7 차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
      뽑아만 주십시오! 충. 성 ^^7 차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
      뽑아만 주십시오! 충. 성 ^^7`,
  },
  {
    title: '지우 컴퍼니에 지원하게 된 동기가 무엇입니까 ??',
    content: `차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
        뽑아만 주십시오! 충. 성 ^^7 차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
        뽑아만 주십시오! 충. 성 ^^7 차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
        뽑아만 주십시오! 충. 성 ^^7 차세대 신흥회사로 떠오르고 있는 지우컴퍼니에서 몸을 바치고 싶습니다. 야근 자신있고 주말근무 가능합니다. 
        뽑아만 주십시오! 충. 성 ^^7`,
  },
];

const MyNoticeDetail = () => {
  // 이부분에서 get 받았을떄 , 값 게시글 개수에 따라 true false 배열이 필요하다.
  const [editFlag, setEditFlag] = useState([false, false, false]);
  const [addFlag, setAddFlag] = useState(false);

  // 항목추가 변경 함수

  const handleChangeAddFlag = () => {
    setAddFlag(!addFlag);
  };

  // 수정 변경 함수

  const handleChangeEditFlag = index => {
    const newFlag = [...editFlag];
    newFlag[index] = !newFlag[index];
    setEditFlag(newFlag);
  };

  return (
    // 제목을 두개로 나누는 div
    <Wrapper>
      <CompanyBox>
        <br></br>
        <br></br>
        <h1>{dummyData.company} ({dummyData.state}) </h1>

        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <h3 style ={{ width:'100%'}}>작성일 : {dummyData.regdate} </h3>
          
          
        </div>
      </CompanyBox>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CreateButton onClick={handleChangeAddFlag}>
          {addFlag ? '항목 닫기' : '항목 추가'}
        </CreateButton>
      </div>
      {/* 항목추가 눌를때 항목이 생성 */}
      {addFlag && (
        <div>
          <MyNoticeAddcomponent></MyNoticeAddcomponent>
          <br></br>
          <div style={{ display: 'flex', justifyContent: 'flex-end ' }}>
            <CreateButton2>저장</CreateButton2>
          </div>
        </div>
      )}
      <br></br>
      <br></br>

      {dummy.map((dummy, index) => (
        <div key={index}>
          <TagBox># 지우컴퍼니</TagBox>
          <br></br>
          <ContentBox id="font_test2">
            {editFlag[index] ? (
              <div>
                <ContentTitle2
                  id="font_test2"
                  defaultValue={dummy.title}
                ></ContentTitle2>
                <ContentContent2
                  id="font_test2"
                  defaultValue={dummy.content}
                ></ContentContent2>
              </div>
            ) : (
              <div>
                <ContentTitle id="font_test2">{dummy.title}</ContentTitle>
                <ContentContent id="font_test2">{dummy.content}</ContentContent>
              </div>
            )}

            {editFlag[index] ? (
              <ContentEditBox>
                <SaveCancelButton
                  onClick={() => handleChangeEditFlag(index)}
                  backgroundColor="#F6F6C9"
                >
                  저장
                </SaveCancelButton>
                <SaveCancelButton
                  backgroundColor="#A3C7D6"
                  marginLeft="40px"
                  marginRight="20px"
                  onClick={() => handleChangeEditFlag(index)}
                >
                  취소
                </SaveCancelButton>
              </ContentEditBox>
            ) : (
              <ContentEditBox>
                <SaveCancelButton
                  onClick={() => handleChangeEditFlag(index)}
                  marginRight="20px"
                  backgroundColor="#A3C7D6"
                >
                  수정하기
                </SaveCancelButton>
              </ContentEditBox>
            )}
          </ContentBox>
          <br></br>
        </div>
      ))}
    </Wrapper>
  );
};

export default MyNoticeDetail;
