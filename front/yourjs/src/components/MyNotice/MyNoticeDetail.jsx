import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import MyNoticeAdd from './MyNoticeAdd.jsx';
import '../../App.css';
import MyNoticeAddcomponent from './MyNoticeAddcomponent.jsx';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import MyNoticePlus from './MyNoticePlus.jsx';
import MyNoticeSchedule from './MyNoticeSchedule.jsx';
import { colors } from '../../common/color.js';
import MyNoticeDate from './MyNoticeDate.jsx';

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
    color: ${colors.bsColor4};
  }

  h3 {
    color: #3c4048;
  }
`;

//태그 입력 창
const TagInput = styled.input`
  border: none;
  border-bottom: 3px solid gray;
  width: 80%;
  height: 40px;
  :focus {
    outline: none;
  }
`;

// 큰 태그 박스

const TagBigBox = styled.div`
  display: flex;
`;

//자기소개서 작성창 여는 버튼
const CreateButton = styled.button`
  width: 150px;
  height: 60px;
  background-color: ${colors.bsColor2};
  border-radius: 10px;
  border: 1px solid ${colors.bsColor3};
  color: rgba(0, 0, 0, 0.9);
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
  height: 400px;
  border-radius: 15px;
  box-shadow: 0.5rem 0.5rem 0.5rem gray;
  margin-bottom: 50px;
  margin-top: 10px;
`;
//컨텐츠 박스 속 태그 박스
const TagBox = styled.div`
  background-color: #81c6e8;
  border-radius: 15px;
  height: 40px;
  width: fit-content;
  padding-left: 25px;
  padding-right: 30px;
  display: flex;
  align-items: center;
  font-weight: 700;
  margin-right: 10px;
  margin-top: 10px;
`;
//컨텐츠 박스 제목
const ContentTitle = styled.div`
  border-bottom: 3px solid gray;

  padding-top: 5px;
  margin-left: 25px;
  width: 95%;
  height: 50px;
  display: flex;
  align-items: center;
`;
//컨텐츠 박스 내용
const ContentContent = styled.div`
  margin-left: 10px;
  padding: 15px;
  overflow: auto;
  height: 200px;
  width: 95%;

  // 스크롤바 없애기
  /* ::-webkit-scrollbar {
    display: none;
  } */
`;

//컨텐츠 박스 제목 텍스트필드
const ContentTitle2 = styled.input`
  padding-top: 5px;
  margin-left: 25px;
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
  margin-left: 10px;
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

const DeleteButton = styled.div`
  margin-left: 5px;
`;

//컨텐츠 박스내에 현재 글자수 box
const ContentCountBox = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 80%;
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
// 태그 결과 값 나열
const ResultTag = styled.div`
  min-width: 40px;
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 0px 5px 0px 5px;
  margin-right: 10px;
  height: 30px;
  background-color: ${colors.bsColor2};
  font-weight: 700;
  box-shadow: 0.1rem 0.1rem 0.1rem gray; ;
`;

const UrlInput = styled.input`
  margin-left: 50px;
  width: 150px;
  height: 40px;
  border: none;
`;

const Select = styled.select`
  border: none;

  /* border-bottom: 3px solid gray; */

  option {
  }
`;

let countDate = 1;
const MyNoticeDetail = () => {
  const location = useLocation();
  // 이부분에서 get 받았을떄 , 값 게시글 개수에 따라 true false 배열이 필요하다.
  const [editFlag, setEditFlag] = useState([false, false, false]);
  const [addFlag, setAddFlag] = useState(false);
  const [noticeData, setNoticeData] = useState([]);
  const [tagItem, setTagItem] = useState('');
  const [totalData, setTotalData] = useState([]);
  const [contentList, setContentList] = useState([]);
  const [firstSelfData, setFirstSelfData] = useState([]); // 첫값 저장해놓는곳
  const [dateList, setDateList] =useState(['']);


  // 수정 글자수 count
  // const [editCount, setEditCount] = useState('');

  useEffect(() => {
    getDetailData();
    
  }, []);
  // +플러스 버튼 눌렀을때
  const handleDateClick = () => {
    const b = [...dateList];
    b.push({ index: countDate });
    countDate = countDate + 1;
    setDateList(b);
    
    console.log(totalData,"토탈데이터")
    console.log(dateList,"데이터리스트")
    
  };


  // 화면 렌더링시 get 실행
  const getDetailData = () => {
    axiosInstance
      .get(apis.notice + `/${location.state.noticeSeq}`)
      .then(response => {
        console.log(response.data, '디테일 값 받아오기');
        console.log(response.data.intros.length);
        var arr1 = Array.apply(
          null,
          new Array(response.data.intros.length),
        ).map(Number.prototype.valueOf, 0); // 0으로 만듬 배열
        arr1.fill(false); // false 로 0을 바꿈
        setContentList(arr1);
        setFirstSelfData(response.data.intros);
        setDateList(response.data.schedules)
        setNoticeData(response.data);
        
        
      });
  };

  // useEffect(() => {
  //   console.log(noticeData,23423)
  // }, [noticeData]);



  const getDateData = data => {
    setTotalData({ ...totalData, schedules: data });
  };


    /// 할일 모아오는 함수
    const setDateData = (index, dateData) => {
    
      const newArray = [...dateList];
      newArray[index] = dateData;
      setDateList(newArray);
      
      setTotalData({ ...totalData, schedules: dateList });
      
    };
    useEffect(() => { setTotalData({ ...totalData, schedules: dateList });}, [dateList]);
    
  
  const handleChangeAddFlag = () => {
    setAddFlag(!addFlag);
  };

  // 수정 변경 함수

  const handleChangeEditFlag = index => {
    const newFlag = [...contentList];
    newFlag[index] = !newFlag[index];
    setContentList(newFlag);
  };

  

  // 결과 선택

  // const handleChangeEditText = (e) => {
  //   setEditCount(e.target.value)

  // }

  const handleTagChange = e => {
    setTagItem(e.target.value);
  };

  const handleProgressChange = e => {
    setNoticeData({ ...noticeData, progress: e.target.value });
  };

  const onKeyDownHandler = e => {
    if (e.key === 'Enter') {
      // 추가해서 바꾼다
      console.log(noticeData.noticeTag + `, ${e.target.value}`, '체크용');

      setNoticeData({
        ...noticeData,
        noticeTag: noticeData.noticeTag + `, ${e.target.value}`,
      });
      setTagItem('');
    }
  };

  const handleLinkChange = e => {
    setNoticeData({ ...noticeData, link: e.target.value });
  };

  // // 태그 삭제
  // const deleteTag = tag => {
  //   const newArray = tagList.filter(d => d !== tag);
  //   setTagList(newArray);
  // };

  return (
    // 제목을 두개로 나누는 div
    <Wrapper>
      <CompanyBox id="titleFont">
        <br></br>
        <br></br>
        <h1>{noticeData.coName}</h1>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <h2 style={{ width: '100%' }}> {noticeData.noticeName} </h2>
        </div>

        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <h3 style={{ width: '15%' }}>결과를 선택하세요 : </h3>
          <Select
            key={noticeData.progress}
            onChange={handleProgressChange}
            defaultValue={noticeData.progress}
          >
          <option id="titleFont" value="등록">
            등록
          </option>
          <option id="titleFont" value="진행중">
            진행중
          </option>
          <option id="titleFont" value="서류탈락">
            서류탈락
          </option>
          <option id="titleFont" value="코딩테스트탈락">
            코딩테스트탈락
          </option>
          <option id="titleFont" value="면접탈락">
            면접탈락
          </option>
          <option id="titleFont" value="최종합격">
            최종합격
          </option>
          
          </Select>
        </div>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <h3 style={{ width: '100%' }}>
            채용사이트 :{' '}
            <UrlInput
              id="titleFont"
              onChange={handleLinkChange}
              defaultValue={noticeData.link}
            ></UrlInput>
          </h3>
        </div>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <h3 style={{ width: '10%' }}>
            일정등록 :
          </h3>
          <button onClick={handleDateClick}>+</button>
        </div>
        
        {dateList.map((li,index) => (
            <MyNoticeSchedule pushData={li}key={index} li={li} index={index} getDateData={getDateData} setDateDataee={setDateData} ></MyNoticeSchedule>
          ))}
          <br></br>
          
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <TagInput
            id="titleFont"
            placeholder="태그를 추가하세요"
            value={tagItem}
            onKeyDown={onKeyDownHandler}
            onChange={handleTagChange}
          ></TagInput>
        </div>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <TagBigBox>
            {noticeData?.noticeTag?.split(', ').map((tag, index) => (
              <ResultTag key={index}>#{tag} </ResultTag>
            ))}
          </TagBigBox>
        </div>
      </CompanyBox>
      
      <br></br>
      <br></br>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CreateButton id="contentFont" onClick={handleChangeAddFlag}>
          {addFlag ? '항목 닫기' : '항목 추가'}
        </CreateButton>
      </div>
      {/* 항목추가 눌를때 항목이 생성 */}
      {/* {addFlag && (
        <div>
          <MyNoticePlus></MyNoticePlus>
          <br></br>
          <div style={{ display: 'flex', justifyContent: 'flex-end ' }}>
            <CreateButton2 id="contentFont">저장</CreateButton2>
          </div>
        </div>
      )} */}
      {noticeData?.intros?.map((intros, index) => (
        <div key={index}>
          <div style={{ display: 'flex' }}>
            {intros?.introTag?.split(', ').map((tag, index) => (
              <ResultTag key={index} id="contentFont">
                {tag}
              </ResultTag>
            ))}
          </div>
              
          
          <ContentBox id="contentFont">
            {contentList[index] ? (
              <div>
                <ContentTitle2
                  id="contentFont"
                  defaultValue={intros?.question}
                  onChange={(e) => {
                    setFirstSelfData(
                      firstSelfData.map((self, index2) =>
                        index2 === index
                          ? { ...self, question: e.target.value }
                          : self,
                      ),
                    );
                    
                  }}
                ></ContentTitle2>
                <div></div>
                <br></br>
                <ContentContent2
                  id="contentFont"
                  defaultValue={intros?.contents}
                  onChange={(e) => {
                    setFirstSelfData(
                      firstSelfData.map((self, index2) =>
                        index2 === index
                          ? { ...self, contents: e.target.value }
                          : self,
                      ),
                    );
                    
                  }}
                  // onChange = {handleChangeEditText}
                ></ContentContent2>
              </div>
            ) : (
              <div>
                <ContentTitle id="font_test2">{intros?.question}</ContentTitle>
                <br></br>
                <ContentContent id="font_test2">
                  {intros?.contents}
                </ContentContent>
              </div>
            )}
            <ContentCountBox>
              {/* <div> 현재 글자수 : { editFlag[index] ? `${editCount.replace(/<br\s*\/?>/gm, '\n').length}` : `${dummy.content.replace(/<br\s*\/?>/gm, '\n').length}`}</div> */}
              <div>
                현재 글자수 :{' '}
                {intros?.contents.replace(/<br\s*\/?>/gm, '\n').length}
              </div>
            </ContentCountBox>
            
            {contentList[index] ? (
              <ContentEditBox>
                <SaveCancelButton
                  id="contentFont"
                  onClick={() => handleChangeEditFlag(index)}
                  backgroundColor="#F6F6C9"
                >
                  저장
                </SaveCancelButton>
                <SaveCancelButton
                  id="contentFont"
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
                  id="contentFont"
                  onClick={() => handleChangeEditFlag(index)}
                  marginRight="20px"
                  backgroundColor="#FFD8A9"
                >
                  수정하기
                </SaveCancelButton>
              </ContentEditBox>
            )}
          </ContentBox>
          
      
          <br></br>
        </div>
      ))}
      
      <button onClick={()=>console.log(firstSelfData,"최종확인")}>저장하기</button>
    </Wrapper>
  );
};

export default MyNoticeDetail;
