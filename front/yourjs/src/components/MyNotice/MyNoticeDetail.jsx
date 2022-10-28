import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import MyNoticeAdd from './MyNoticeAdd.jsx';
import '../../App.css'
import MyNoticeAddcomponent from './MyNoticeAddcomponent.jsx';


const Wrapper = styled.div`
    height : fit-content;
    padding-bottom: 100px;
    width :60%;
`
const TitleBox = styled.div`
    
  display: flex;
  align-items: center;
`;

//회사 정보 전달 박스
const CompanyBox = styled.div`
    
`

//자기소개서 작성 버튼
const CreateButton = styled.button`
    width:150px;
    height: 60px;
    background-color: aqua;
    border-radius: 10px;
    cursor: pointer;

    

`
// 컨텐츠 박스
const ContentBox = styled.div`
  
  
  background-color: whitesmoke;
  width: 100%;
  height: 300px;
  border-radius: 15px;
  box-shadow: 0.5rem 0.5rem 0.5rem gray;
  margin-bottom: 50px;
  margin-top: 10px;
`;
//컨텐츠 박스 속 태그 박스
const TagBox = styled.div`
  background-color: yellowgreen;
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
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: dashed grey;
`;
//컨텐츠 박스 내용
const ContentContent = styled.div`
  padding: 15px;
`;

const dummyData = {
    regdate: '2022-09-01',
    company : '지우컴퍼니',
    link : "www.naver.com",
    
  };

  const dummy = [
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

    const [addFlag,setAddFlag] = useState(false);




    const handleChangeAddFlag = () => {
        setAddFlag(!addFlag);
    }


    
    
  return (
    // 제목을 두개로 나누는 div
    <Wrapper>
      <TitleBox>
        
        <h1 style={{ width: '70%' }}>내 공고</h1>
        <div style={{ width: '30%', display: 'flex', alignItems: 'center' }}>
          <h3>{dummyData.regdate} </h3>
        </div>
      </TitleBox>
      <CompanyBox >
        <h1>지우컴퍼니</h1>
      </CompanyBox>
      <div style={{display:"flex",justifyContent:"flex-end"}}>
      <CreateButton onClick={handleChangeAddFlag} > {addFlag ? "항목 닫기" : "항목 추가" } </CreateButton>
      </div>
      {addFlag && (
    <MyNoticeAddcomponent/>
    )}
      {dummy.map((dummy, index) => (
        <div key={index}>
          <TagBox># 지우컴퍼니</TagBox>
          <ContentBox id="font_test2">
            <ContentTitle>{dummy.title}</ContentTitle>
            <ContentContent>{dummy.content}</ContentContent>
          </ContentBox>
        </div>
      ))}
    </Wrapper>
  );
};

export default MyNoticeDetail;
