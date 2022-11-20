import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MyNoticeAddcomponent from './MyNoticeAddcomponent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import MyNoticeDate from './MyNoticeDate';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../common/color';

const Wrapper = styled.div`
  width: 60%;
  height: 100%;
`;

//제목
const TitleBox = styled.div`
  display: flex;
  align-items: center;
`;

//회사 div
const TitleNoticeBox = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

const TitleNoticeInput = styled.input`
  border: none;

  width: inherit;
  border-bottom: 3px solid gray;
  margin-top: 10px;
  margin-left: 30px;
  :focus {
    outline: none;
  }
`;

const EachTitle = styled.h3`
  width : 200px;
  
`

//회사 div
const CompanyBox = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
`;

const InputBox = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 16px;
  padding: 6px 3px;
  width: 80%;
  height: 20px;
  border-radius: 5px;
  padding-left: 10px;
  

  /* &:hover {
    border: 1px solid ${colors.bsColor4};
  }

  &:focus {
    border: 1px solid ${colors.bsColor4};
    box-shadow: 0 0 10px ${colors.bsColor3};
    outline: none;
  } */
`;

//상태 div
const StateBox = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

const StateSelect = styled.select`
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: 81.3%;
  font-size: 16px;
  height: 32px;
  border-radius: 5px;
  padding-left: 10px;

  &:hover {
    border: 1px solid ${colors.bsColor4};
  }

  &:focus {
    border: 1px solid ${colors.bsColor4};
    box-shadow: 0 0 10px ${colors.bsColor3};
    outline: none;
  }
`;
//url 입력 div
const UrlBox = styled.div`
  align-items: center;
  display: flex;
  height: 50px;
`;

const UrlInput = styled.input`
  border: none;

  width: 12%;
  border-bottom: 3px solid gray;
  margin-top: 10px;
  margin-left: 30px;
  :focus {
    outline: none;
  }
`;
// date 입력 div
const DateBox = styled.div`
  display : flex;
  /* flex-wrap: wrap; */
  width: 100%;
  align-items: center;
`;

const DateTitle = styled.h3`
  width: 20%;
  align-self: flex-start;
`;

const PlusBtn = styled.button`
  width: 30px;
  height: 30px;
  margin-left: 80px;
  background-color: #FBFBFD;
  border-radius: 10px;
  border: 1px solid #c5c1c1;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background-color: white;
    border: 2px solid ${colors.bsColor2};
  }
`

// 일정 보여주는 div
const DateListDiv = styled.div`
  /* display: flex; */
  /* flex-wrap: wrap; */
  width: 70%;
  border-left: 3px solid ${colors.bsColor2};
`

const DateSelectBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
`;

// 항목추가 버튼
const ComponentAddButton = styled.button`
  width: 150px;
  height: 50px;
  background-color: #FBFBFD;
  border-radius: 10px;
  border: 1px solid #F1F1F1;
  cursor: pointer;
  &:hover {
    background-color: white;
    border: 2px solid ${colors.bsColor2};
  }
`;

// 저장 버튼
const SaveCancelButton = styled.button`
  width: 120px;
  height: 60px;
  color: blue;
  background-color: #FBFBFD;
  border-radius: 10px;
  border: 1px solid #F1F1F1;
  font-size: 18px;
  margin-bottom: 70px;
  margin-right: 15px;
  cursor: pointer;
  &:hover {
    background-color: #0078FF;
    color: white;
  }
`;

// 삭제 버튼
const SaveCancelButton2 = styled.button`
  width: 120px;
  height: 60px;
  color: red;
  background-color: #FBFBFD;
  border-radius: 10px;
  border: 1px solid #F1F1F1;
  font-size: 18px;
  margin-left: 15px;
  cursor: pointer;
  &:hover {
    background-color: #FF7878;
    color: white;
  }
`;

const TagInputBox = styled.input`
  border: none;
  border-bottom: 3px solid gray;
  width: 100%;
  height: 40px;
 
  :focus {
    outline: none;
  }
`;

/// 가져온 인풋 
const ModalInput = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 16px;
  padding: 6px 3px;
  width: 96%;
  border-radius: 5px;
  padding-left: 10px;

  &:hover {
    border: 1px solid ${colors.bsColor4};
  }

  &:focus {
    border: 1px solid ${colors.bsColor4};
    box-shadow: 0 0 10px ${colors.bsColor3};
    outline: none;
  }
`;
/// 가져온 인풋

const TagBox = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

const TagBigBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px 0px 20px 200px;
`

const ResultTag = styled.div`
  min-width: 40px;
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 0px 10px 10px 0px;
  font-size: 15px;
  font-weight: 700;
  border-radius: 10px;
  background-color: white;
  border: 2px solid ${colors.bsColor2};
  &:hover {
    border: 2.5px solid ${colors.bsColor3};
  }
`;


const DeleteTagButton = styled.div`
  padding-left: 8px;
  width: 15px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  color: ${colors.bsColor2};
  &:hover {
    color: ${colors.bsColor4};
  }
`

const DeleteButton = styled.button`
  margin-left: 30px;
  width: 10%;
  color: red;
  background-color: white;
  border: none;
  cursor: pointer;
  font-weight: 700;
`

let countList = 1;
let countDate = 1;
const MyNoticeAdd = () => {

  const navigate = useNavigate();
  const [list, setList] = useState(['']);
  const [dateList, setDateList] = useState(['']); // 일정 등록 컴포넌트 생성을 위한 list
  const [selfData, setSelfData] = useState([]);
  const [totalData, setTotalData] = useState({progress:"등록"});
  const [tag, setTag] = useState([]);
  const [tagItem, setTagItem] = useState('');

  const onClick = () => {

    const a = [...list];
    a.push({ index: countList });
    countList = countList + 1;
    setList(a);
  };

  

  //회사이름 입력
  const handleCompanyInput = e => {
    setTotalData({ ...totalData, coName: e.target.value });
  };
  // 공고명 입력
  const handleNoticeInput = e => {
    setTotalData({ ...totalData, noticeName: e.target.value });
  };
  // 진행상황 입력
  const handleProgressInput = e => {
    setTotalData({ ...totalData, progress: e.target.value });
  };

  const handleLinkInput = e => {
    setTotalData({ ...totalData, link: e.target.value });
  };

  const handleTagInput = e => {
    setTagItem(e.target.value);
  };

  /// 할일 모아오는 함수
  const setDateData = (index, dateData) => {
    
    const newArray = [...dateList];
    newArray[index] = dateData;
    setDateList(newArray);
    
    setTotalData({ ...totalData, schedules: dateList });
    
  };
  useEffect(() => { setTotalData({ ...totalData, schedules: dateList });}, [dateList]);

  const settingNoticeData = (index, noticeData) => {
    
    const newArray2 = [...list];
    newArray2[index] = noticeData;
    setList(newArray2);
  };
  useEffect(() => { setSelfData({ ...selfData, noticeData: list });}, [list]);
  
  useEffect(() => {}, [dateList]);
  

  const handleDateClick = () => {
    const b = [...dateList];
    b.push({ index: countDate });
    countDate = countDate + 1;
    setDateList(b);
    
  };
  // 최종 버튼 눌렀을때 post axios
  const handleTotalData = () => {
    var test2 = []
    dateList.map((li)=> test2.push(li))
    const noundefined = test2.filter(data=>data !==undefined)
    

    const orderedtotal = noundefined.sort((a,b)=> new Date(a.scheduleDate)- new Date(b.scheduleDate))
    delete totalData.schedules;
    totalData.schedules = orderedtotal
    
    
    
    //날짜 순서로 post 보내기
  
    axiosInstance
      .post(apis.notice, totalData)
      .then(response => {
        

        if (response.status === 200) {
          
          if (selfData.length === 0 ) {
            navigate('/notice')
          }
          else {
            

          selfData.noticeData.forEach(self => {
            if (self.question==='' && self.contents ===''&& self.introTag==='' ) {
              return
            }
            
            const data = { ...self, noticeSeq: response.data.noticeSeq };
            
            axiosInstance.post(apis.selfIntroduce, data).then(response => {
              
              
            
            });
          });}
          navigate('/notice');
        }
      })
      .catch(error => {console.log(error)
      alert('항목을 입력하세요.')});

  };

  

  const getDateData = data => {
    setTotalData({ ...totalData, schedules: data });
  };

  // 태그값이 변하는거를 쳐다보다가 useeffect
  useEffect(() => {
    if (tag.length === 0) return;
    setTotalData({ ...totalData, noticeTag: tag.join(', ') });
  }, [tag]);

  // 복사 추가
  const keydownHandler = e => {
    if (e.key === 'Enter') {
      if (tag.length >=5 ) {
        alert('태그는 5개까지 입력 가능합니다.')
        setTagItem('')
        return;
      }
      else if (tag.indexOf(tagItem) !==-1){
        setTagItem('')
        return;
      }
      else {
      setTag([...tag, tagItem]);
      setTagItem('');
    }
    }
  };

   // 태그 삭제
  const deleteTag = tag1 => {
    const newArray = tag.filter(d => d !== tag1);
    setTag(newArray);
  };


  const handleDeleteSchedule = (index) => {
    var test = [...dateList]
    delete test[index]
    setDateList(test)
  }

  const onRemove = () => {

    if (window.confirm("저장하지 않으면 작성내용이 사라집니다. 그래도 나가시겠습니까 ??")) {

      navigate('/notice')
      
    } else {
    
      return
    
    } 

  };


  return (
    <Wrapper>
      <br></br>
      <TitleBox>
        <h1 style={{ width: '70%' }}>내 공고 등록</h1>
      </TitleBox>

      <br></br>
      <br></br>

      <CompanyBox id="titleFont">
        <EachTitle >회사명</EachTitle>
        <InputBox
          id="titleFont"
          placeholder="회사를 입력해 주세요"
          onChange={handleCompanyInput}
          autoComplete="off"
        ></InputBox>
      </CompanyBox>
      <TitleNoticeBox id="titleFont">
        <EachTitle>공고명</EachTitle>
        <InputBox
          onChange={handleNoticeInput}
          id="titleFont"
          placeholder="ex) 상반기 IT 채용 "
          autoComplete="off"
        ></InputBox>
      </TitleNoticeBox>
      
      <TagBox id="titleFont">
        <EachTitle>태그명</EachTitle>
        <InputBox
          id="titleFont"
          value={tagItem}
          placeholder="공고 태그를 추가하세요"
          autoComplete="off"
          onKeyDown={keydownHandler}
          onChange={handleTagInput}
        />
      </TagBox>
      <TagBigBox>
        {tag.map((tag, index) => (
          <ResultTag id="titleFont" key={index} onClick={()=>{deleteTag(tag)
          }}># {tag} <DeleteTagButton>X</DeleteTagButton></ResultTag>
        ))}
      </TagBigBox>
      <StateBox id="titleFont">
        <EachTitle>결과를 선택하세요 </EachTitle>
        <StateSelect
          id="titleFont"
          defaultValue="등록"
          onChange={handleProgressInput}
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
        </StateSelect>
      </StateBox>
      <br></br>
      <UrlBox id="titleFont">
        <EachTitle>채용사이트</EachTitle>
        <InputBox
          id="titleFont"
          placeholder="URL을 입력하세요"
          autoComplete="off"
          onChange={handleLinkInput}
        ></InputBox>
      </UrlBox>
      <br></br>
      <DateBox id="titleFont">
        <DateTitle>일정 등록
          <PlusBtn onClick={handleDateClick}>+</PlusBtn>
        </DateTitle>
        <DateListDiv>
          {dateList.map((li, index) => (
            li === undefined
              ? (<div key={index}></div>)
              : (<div key={index} style={{display:"flex", alignItems:"center", margin: '10px'}} >
                  <MyNoticeDate
                    li={li}
                    getDateData={getDateData}
                    index={index}
                    setDateDataee={setDateData}
                  />
                  <DeleteButton id="titleFont" onClick={()=>handleDeleteSchedule(index)}>삭제</DeleteButton>
                </div>)
              ))}
        </DateListDiv>
      </DateBox>
      <br></br>
      <br></br>
      <br></br>

      <div id="box"></div>
      {list?.map((li, index) => (
        
        <MyNoticeAddcomponent
          
          key={index}
          settingNoticeData={settingNoticeData}
          index={index}
        ></MyNoticeAddcomponent>
        
      ))}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '20px',
        }}
      >
        <ComponentAddButton id="contentFont" onClick={onClick}>자소서 항목 추가</ComponentAddButton>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SaveCancelButton
          id="contentFont"
          backgroundColor={colors.bsColor2}
          onClick={handleTotalData}
        >
          저장
        </SaveCancelButton>{' '}
        <SaveCancelButton2
          id="contentFont"
          
          marginLeft="30px"
          onClick={onRemove}
        >
          취소
        </SaveCancelButton2>
      </div>
    </Wrapper>
  );
};

export default MyNoticeAdd;
