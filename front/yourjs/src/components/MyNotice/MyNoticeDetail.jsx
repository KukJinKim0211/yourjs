import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import MyNoticeAdd from './MyNoticeAdd.jsx';
import '../../App.css';
import MyNoticeAddcomponent from './MyNoticeAddcomponent.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
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
  border-bottom: 3px solid ${colors.bsColor2};
  width: 100%;
  margin-bottom: 5px;
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
  border : 3px solid ${colors.bsColor2};
  /* box-shadow: 0.2rem 0.2rem 0.2rem ${colors.bsColor2}; */
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
  border-bottom: 3px solid ${colors.bsColor2};
  
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
  border-bottom: 3px solid ${colors.bsColor2};
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

const DeleteButton = styled.button`
  margin-left: 30px;
  width: 5%;
  color: red;
  background-color: white;
  border: none;
  cursor: pointer;
  font-weight: 700;
  

`;

const NoticeNameInput = styled.input`
  border : none;
  width : 100%;
  height :40px;
  font-size: 24px;
  color : #3c4048;
  font-weight: 700;
`


const NoticeCompanyInput = styled.input`
  border : none;
  width : 100%;
  height :40px;
  font-size: 32px;
  color : ${colors.bsColor4};
  font-weight: 700;
  margin-bottom: 1%;
`

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
  padding: 0px 5px 0px 8px;
  margin-right: 10px;
  height: 30px;
  
  background-color: ${colors.bsColor2};
  font-weight: 700;
  box-shadow: 0.1rem 0.1rem 0.1rem gray; ;
`;

const UrlInput = styled.input`  
  
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  margin-left: 110px;
  width: 46%;
  height: 40px;
  font-size: 18px;
  
`;

const Select = styled.select`
  border: none;
   border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  height: 50px;
  font-size: 18px;
  width: 46.5%;
  /* border-bottom: 3px solid gray; */
  margin-left: 2%;
  option {
  }
  /* border-bottom: 3px solid gray; */

  option {
  }
`;

const DeleteTagButton = styled.div`
  padding-left: 8px;
  cursor: pointer;

  color: ${colors.bsColor4};
`;

const LastSaveCancelButton = styled.button`
  background-color: ${props => props.backgroundColor};
  margin-left: ${props => props.marginLeft};
  border: none;
  /* box-shadow: 0.5rem 0.5rem 0.5rem ${colors.bsColor3}; */
  width: 15%;
  height: 60px;
  cursor: pointer;
  margin-bottom: 10%;
  border-radius: 15px;

  &:hover {
    background-color: ${colors.bsColor2};
  }
`;



let countDate = 1;
const MyNoticeDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // 이부분에서 get 받았을떄 , 값 게시글 개수에 따라 true false 배열이 필요하다.
  const [editFlag, setEditFlag] = useState([false, false, false]);
  const [addFlag, setAddFlag] = useState(false);
  const [noticeData, setNoticeData] = useState([]);
  const [noticeTagItem, setNoticeTagItem] = useState('');
  const [tagItem, setTagItem] = useState([]);
  const [tagItem2, setTagItem2] = useState('');
  const [totalData, setTotalData] = useState([]);
  const [contentList, setContentList] = useState([]);
  const [firstSelfData, setFirstSelfData] = useState([]); // 첫값 저장해놓는곳
  const [dateList, setDateList] = useState(['']);

  const [addSelfList, setAddSelfList] = useState(['']);
  const [addSelfIndex, setAddSelfIndex] = useState([]);

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

    // console.log(totalData, '토탈데이터');
    // console.log(dateList, '데이터리스트');
  };

  useEffect(() => {
    setNoticeData({ ...noticeData, intros: firstSelfData });
  }, [firstSelfData]);

  // 화면 렌더링시 get 실행
  const getDetailData = () => {
    axiosInstance
      .get(apis.notice + `/${location.state.noticeSeq}`)
      .then(response => {
        // console.log(response.data, '디테일 값 받아오기');
        // console.log(response.data.intros.length);
        var arr1 = Array.apply(
          null,
          new Array(response.data.intros.length),
        ).map(Number.prototype.valueOf, 0); // 0으로 만듬 배열
        arr1.fill(false); // false 로 0을 바꿈
        var arr2 = Array.apply(
          null,
          new Array(response.data.intros.length),
        ).map(Number.prototype.valueOf, 0); // 0으로 만듬 배열
        arr2.fill({ value: '' });
        setTagItem(arr2);
        setContentList(arr1);
        setFirstSelfData(response.data.intros);
        setDateList(response.data.schedules);
        if (!response.data.progress ) {response.data.progress ="등록"
        setNoticeData(response.data);}
        
        
        else {
          setNoticeData(response.data);
        }
        
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
  useEffect(() => {
    setTotalData({ ...totalData, schedules: dateList });
  }, [dateList]);

  useEffect(() => {}, [addSelfIndex]);

  const handleChangeAddFlag = () => {
    const a = [...addSelfIndex];
    a.push('');
    setAddSelfIndex(a);
   
  };

  // 수정 변경 함수

  const handleChangeEditFlag = index => {
    const newFlag = [...contentList];
    newFlag[index] = !newFlag[index];
    setContentList(newFlag);
  };

  const handleChangeNoticeName = (e) => {
    setNoticeData({...noticeData,noticeName:e.target.value})
  }

  const handleChangeCoName = (e) => {
    setNoticeData({...noticeData,coName:e.target.value})
  }

  const handleTagChange = e => {
    setTagItem(e.target.value);
    // setTagItem(e.target.value);
  };

  const handleProgressChange = e => {
    setNoticeData({ ...noticeData, progress: e.target.value });
  };

  const onKeyDownHandler = e => {
    if (e.key === 'Enter') {
      if (noticeData.noticeTag===null) {
        setNoticeData({
          ...noticeData,
          
          noticeTag:  noticeData.noticeTag!==null ?  noticeData.noticeTag + `, ${e.target.value}` : `${e.target.value}`,
        });
        setNoticeTagItem('');
        return
      }
      if (noticeData.noticeTag.split(',').length-1 === 4 ) {
        alert('5개까지 입력 가능합니다.')
        setNoticeTagItem('');
        return
      }
      else if (noticeData.noticeTag.indexOf(e.target.value) !== -1) {
        setNoticeTagItem('')
      }
      else {

      setNoticeData({
        ...noticeData,
        
        noticeTag:  noticeData.noticeTag!==null ?  noticeData.noticeTag + `, ${e.target.value}` : `${e.target.value}`,
      });
      
      setNoticeTagItem('');
    }
  }
  };


  const handleLinkChange = e => {
    setNoticeData({ ...noticeData, link: e.target.value });
  };



  const settingNoticeData = (index, noticeData) => {
    const newArray2 = [...addSelfIndex];
    newArray2[index] = noticeData;
    setAddSelfIndex(newArray2);
  };

  const deleteTag = tag1 => {
    const newTag = noticeData.noticeTag.replace(`${tag1}, `, '');

    const newTag2 = newTag.replace(`, ${tag1}`, '');
    const newTag3 = newTag2.replace(`${tag1}`, '');
    if (newTag3 === '') {
      const newTag3 = null;
      setNoticeData({ ...noticeData, noticeTag: newTag3 }); // 태그 마지막 잔챙이 처리 위함
    } else {
      setNoticeData({ ...noticeData, noticeTag: newTag3 });
    }
  };

  const deleteDetailTag = (tag1,index) => {
    var newNotice =[...noticeData.intros]
    const newTag = noticeData.intros[index].introTag.replace(`${tag1}, `, '')
    const newTag2 = newTag.replace(`, ${tag1}`, '');
    const newTag3 = newTag2.replace(`${tag1}`, '');
   
    
      if (newTag3==='') {
      const newTag3 ='';
      newNotice.map((detailTag,index2) => index2 === index ? delete detailTag.introTag : detailTag )
      setNoticeData({...noticeData,intros:newNotice})
    }
    else {
      newNotice.map((detailTag,index2) => index2 === index ? detailTag.introTag=newTag3 : detailTag )
      setNoticeData({...noticeData,intros:newNotice})
    }
  }

  //최종적으로 데이터 종합
  const handleTotalPushData = () => {
    addSelfIndex.forEach(self => self===undefined ? console.log("실패") : noticeData.intros.push(self)) // 자소서 추가한 것도 하나로 모으기
    
    
    var test2=[]
    
    dateList.map((li) => {test2.push(li)
      
    })
    const noundefined = test2.filter(data => data !==undefined)
    
    
    
    
    
    noticeData.schedules = noundefined.sort(
      (a, b) => new Date(a.scheduleDate) - new Date(b.scheduleDate),
    );

    

    // noticeData.schedules = totalData.schedules.sort(
    //   (a, b) => new Date(a.scheduleDate) - new Date(b.scheduleDate),
    // );

    noticeData.intros.forEach(
      intro => (intro.noticeSeq = noticeData.noticeSeq),
    );  
    noticeData.schedules.forEach(schedule => delete schedule.scheduleSeq); // 스케줄 시퀀스 제거
    const notice2 = { ...noticeData };
    delete noticeData.intros; // 노티스 데이터 자소서 부분 뺸 것 수정하기

    console.log(noticeData, '수정전 최종본');
    // console.log(notice2, '최종값');
    // console.log(notice2.intros, '자소서 기본 목록');
    // console.log(addSelfIndex, '자소서 추가 목록');
    

    axiosInstance
      .patch(apis.notice, noticeData)
      .then(response => {
        console.log(response, '1단계 성공');
      })
      .catch(error => console.log(error));

    notice2.intros.forEach(intro =>
      axiosInstance
        .patch(apis.selfIntroduce, intro)
        .then(response => console.log(response, '2단계 성공'))
        .catch(error => console.log(error)),
    );

    addSelfIndex.forEach(self => (self.noticeSeq = noticeData.noticeSeq));

    addSelfIndex.forEach(self =>
      axiosInstance
        .post(apis.selfIntroduce, self)
        .then(response => console.log(response, '3단계성공'))
        .catch(error => console.log(error)),
    );

    navigate('/notice');
  };


  const handleDeleteSchedule = (index) =>   {
    if (window.confirm("삭제하시겠습니까?")) {

      var test =[...dateList]
      delete test[index]
      
      setDateList(test)
    } else {

      return

    }
    
    
  }

  // const confirmCancel = () => {
  //   const msg = "화면을 나가면 작성데이터가 사라집니다."
  //   if (confirm(msg)!=0) {
  //     console.log("컨펌확인")
  //   } else {
  //     console.log("컨펌취소확인")
  //   }
  // }
  const onRemove = () => {

    if (window.confirm("저장하지 않으면 작성내용이 사라집니다. 그래도 나가시겠습니까 ??")) {

      navigate('/notice')

    } else {

      return

    }

  };

  

  return (
    // 제목을 두개로 나누는 div
    <Wrapper>
      <CompanyBox id="titleFont">
        <br></br>
        <br></br>
        <NoticeCompanyInput id="titleFont" value={noticeData.coName} onChange={handleChangeCoName}></NoticeCompanyInput>
        
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <NoticeNameInput id="titleFont" value={noticeData.noticeName} onChange={handleChangeNoticeName}>
          {/* <h2 style={{ width: '100%' }}> {noticeData.noticeName} </h2> */}
          </NoticeNameInput>
        </div>
        <br></br>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <TagInput
            id="titleFont"
            placeholder="공고 태그를 추가하세요"
            autoComplete="off"
            value={noticeTagItem}
            onChange={e => setNoticeTagItem(e.target.value)}
            onKeyDown={onKeyDownHandler}
            // onChange={(e)=> {
            //   setTagItem(
            //     tagItem.map((tag,index2) =>
            //     index2 === 0 ? {...tag, value : e.target.value} : tag )
            //   )
            // }}
          ></TagInput>
          
        </div>
        
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          
          <TagBigBox>
            {noticeData?.noticeTag?.split(', ').map((tag, index) => (
              <ResultTag key={index}>
                # {tag}{' '}
                <DeleteTagButton onClick={() => deleteTag(tag)}>
                  X
                </DeleteTagButton>
              </ResultTag>
            ))}
          </TagBigBox>
        </div>
        <br></br>
        <br></br>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          
          <h3 style={{ width: '15%' }}>결과를 선택하세요  </h3>
          <Select
            id ="titleFont"
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
            채용사이트 {' '}
            <UrlInput
              placeholder='채용사이트 URL을 입력하세요'
              autoComplete="off"
              id="titleFont"
              onChange={handleLinkChange}
              defaultValue={noticeData.link}
            ></UrlInput>
          </h3>
        </div>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <h3 style={{ width: '10%' }}>일정등록 </h3>
          <button onClick={handleDateClick}>➕</button>
        </div>

        {dateList?.map((li, index) => (
            li === undefined ? ( <div key={index}></div>) : (<div key={index} style={{display:"flex" ,alignItems:"center"}}>
            <MyNoticeSchedule
              pushData={li}
              
              li={li}
              index={index}
              getDateData={getDateData}
              setDateDataee={setDateData}
            >
              
            </MyNoticeSchedule>
            <DeleteButton id="titleFont" onClick={()=>{handleDeleteSchedule(index)}}>삭제</DeleteButton>
            </div>)
          
        ))}
        <br></br>

        {/* <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <TagInput
            id="titleFont"
            placeholder="공고 태그를 추가하세요"
            value={noticeTagItem}
            onChange={e => setNoticeTagItem(e.target.value)}
            onKeyDown={onKeyDownHandler}
            // onChange={(e)=> {
            //   setTagItem(
            //     tagItem.map((tag,index2) =>
            //     index2 === 0 ? {...tag, value : e.target.value} : tag )
            //   )
            // }}
          ></TagInput>
          
        </div>
        
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          
          <TagBigBox>
            {noticeData?.noticeTag?.split(', ').map((tag, index) => (
              <ResultTag key={index}>
                #{tag}{' '}
                <DeleteTagButton onClick={() => deleteTag(tag)}>
                  X
                </DeleteTagButton>
              </ResultTag>
            ))}
          </TagBigBox>
        </div> */}
      </CompanyBox>
      <br></br>
      <br></br>
      {noticeData?.intros?.map((intros, index) => (
        <div key={index}>
          <div style={{ display: 'flex' }}>
            {contentList[index] ? (
              <div style={{ width: '100%' }}>
                <TagInput
                  className="edittag"
                  id="titleFont"
                  placeholder="해당 자소서에 알맞은 태그를 입력하세요"
                  autoComplete="off"
                  value={tagItem[index].value}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      if (firstSelfData[index].introTag === undefined) {
                        setFirstSelfData(
                          firstSelfData.map((self, index2) =>
                            
                            index2 === index
                            
                              ? {
                                  ...self,
                                  introTag: self.introTag ? `${self.introTag}, ${e.target.value}` : `${e.target.value}`,
                                }
                              : self,
                          ),
                        );
  
                        setTagItem(
                          tagItem.map((tag, index3) =>
                            index3 === index ? { value: '' } : tag,
                          ),
                        );
                        return
                      }
                      if (firstSelfData[index].introTag.split(',').length-1 === 4) {
                        alert("5개까지 입력 가능합니다.")
                        return
                      }
                      
                      else if (firstSelfData[index].introTag.indexOf(e.target.value) !== -1){
                        return
                      }
                      else {
                      setFirstSelfData(
                        firstSelfData.map((self, index2) =>
                          
                          index2 === index
                          
                            ? {
                                ...self,
                                introTag: self.introTag ? `${self.introTag}, ${e.target.value}` : `${e.target.value}`,
                              }
                            : self,
                        ),
                      );

                      setTagItem(
                        tagItem.map((tag, index3) =>
                          index3 === index ? { value: '' } : tag,
                        ),
                      );
                    }
                    }
                  }}

                  onChange={e => {
                    setTagItem(
                      tagItem.map((tag, index4) =>
                        index4 === index
                          ? { ...tag, value: e.target.value }
                          : tag,
                      ),
                    );
                  }}
                ></TagInput>
                <div style={{ display: 'flex' }}>
                  {intros?.introTag?.split(', ').map((tag, index4) => (
                    <ResultTag key={index4} id="contentFont">
                      # {tag}
                      <DeleteTagButton
                        onClick={() => deleteDetailTag(tag,index)}
                      >
                        X
                      </DeleteTagButton>
                    </ResultTag>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex' }}>
                {intros?.introTag?.split(', ').map((tag, index) => (
                  <ResultTag key={index} id="contentFont">
                    # {tag}
                  </ResultTag>
                ))}
              </div>
            )}
          </div>

          <ContentBox id="contentFont">
            {contentList[index] ? (
              <div>
                <ContentTitle2
                  autoComplete="off"
                  id="contentFont"
                  defaultValue={intros?.question}
                  onChange={e => {
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
                  autoComplete="off"
                  id="contentFont"
                  defaultValue={intros?.contents}
                  onChange={e => {
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
                <ContentTitle id="contentFont">{intros?.question}</ContentTitle>
                <br></br>
                <ContentContent id="contentFont">
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
                  backgroundColor="#FFD8A9"
                  marginRight="15px"
                >
                  완료
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

      {addSelfIndex.map((li, index2) => (
        <MyNoticeAddcomponent
          key={index2}
          settingNoticeData={settingNoticeData}
          index={index2}
        ></MyNoticeAddcomponent>
      ))}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CreateButton id="contentFont" onClick={handleChangeAddFlag}>
          자소서 항목 추가
        </CreateButton>
      </div>
      <br></br>
      <br></br>
      <div style={{display:"flex", justifyContent:"center"}}>
      <LastSaveCancelButton id="titleFont"   onClick={handleTotalPushData}>저장</LastSaveCancelButton>
      <LastSaveCancelButton onClick ={onRemove} id="titleFont" backgroundColor="#FFE15D" marginLeft="30px">취소</LastSaveCancelButton>
      </div>
    </Wrapper>
  );
};

export default MyNoticeDetail;
