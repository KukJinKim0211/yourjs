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

//회사 div
const CompanyBox = styled.div`
  display: flex;
  height: 50px;
`;

const CompanyInput = styled.input`
  border: none;

  width: inherit;
  border-bottom: 3px solid gray;
  margin-top: 10px;
  margin-left: 30px;
  :focus {
    outline: none;
  }
`;

//상태 div
const StateBox = styled.div`
  display: flex;
  height: 50px;
`;

const StateSelect = styled.select`
  border: none;

  width: inherit;
  border-bottom: 3px solid gray;
  margin-top: 10px;
  margin-left: 30px;
  option {
  }
`;
//url 입력 div
const UrlBox = styled.div`
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
  width: 40%;
`;

const DateTitle = styled.div`
  font-size: 1.17em;
  font-weight: 700;
`;

const DateSelectBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
`;

const ComponentAddButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: antiquewhite;
  border-radius: 10px;
  border: none;
  box-shadow: 0.5rem 0.5rem 0.5rem gray;
  cursor: pointer;
  font-weight: 700;
`;

const SaveCancelButton = styled.button`
  background-color: ${props => props.backgroundColor};
  margin-left: ${props => props.marginLeft};
  border: none;
  box-shadow: 0.5rem 0.5rem 0.5rem gray;
  width: 10%;
  height: 30px;
  cursor: pointer;
  margin-bottom: 10%;
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

const TagBox = styled.div`
  display: flex;
`;

const ResultTag = styled.div`
  min-width: 40px;
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  margin-right: 20px;
  height: 30px;
  background-color: aliceblue;
  font-weight: 700;
  box-shadow: 0.1rem 0.1rem 0.1rem gray; ;
`;

let countList = 1;
let countDate = 1;
const MyNoticeAdd = () => {
  const [list, setList] = useState([]);
  const [dateList, setDateList] = useState([]); // 일정 등록 컴포넌트 생성을 위한 list
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [companyInput, setCompanyInput] = useState('');
  const [schedule, setSchedule] = useState({
    scheduleName: '',
    scheduleDate: '',
  });
  // const [formData,setFormData] = useState([])

  const [totalData, setTotalData] = useState({});
  const [tag, setTag] = useState([]);
  const [tagItem, setTagItem] = useState('');

  const onClick = () => {
    // 수정 필요 ( 자식 값 안가져옴 - > 헛짓중 )
    const a = [...list];

    a.push({ index: countList });

    countList = countList + 1;

    setList(a);
  };

  useEffect(() => {
    console.log(list);
  }, [list]);

  useEffect(() => {}, [totalData]);

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
    console.log(dateList, '123epelel3');
    setTotalData({ ...totalData, schedules: dateList });
  };

  const settingNoticeData = (index, noticeData) => {
    const newArray2 = [...list];
    newArray2[index] = noticeData;
    setList(newArray2);
    console.log(list);
    setTotalData({ ...totalData, noticeData: list });
  };
  // datelist useeffect
  useEffect(() => {}, [dateList]);

  const handleDateClick = () => {
    const b = [...dateList];
    b.push({ index: countDate });
    countDate = countDate + 1;
    setDateList(b);
    console.log('123123');
  };

  const handleTotalData = () => {
    console.log(totalData, '최종값');

    // await  axiosInstance
    //   .post(apis.notice, totalData)
    //   .then((response) => {console.log(response.data)})

    // const handlePushTotalData = () => {

    //   await axiosInstance

    // }
  };

  const getChildData = data => {
    
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
      console.log('성공');
      setTag([...tag, tagItem]);
      setTagItem('');
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
        <h3>회사명</h3>
        <CompanyInput
          id="titleFont"
          placeholder="회사를 입력해 주세요"
          onChange={handleCompanyInput}
        ></CompanyInput>
      </CompanyBox>
      <TitleNoticeBox id="titleFont">
        <h3>공고명</h3>
        <TitleNoticeInput
          onChange={handleNoticeInput}
          id="titleFont"
          placeholder="ex) 상반기 IT 채용 "
        ></TitleNoticeInput>
      </TitleNoticeBox>
      <br></br>
      <TagBox>
        <TagInputBox
          id="contentFont"
          value={tagItem}
          placeholder="태그를 추가하세요 "
          onKeyDown={keydownHandler}
          onChange={handleTagInput}
        />
        {/* <TagAddButton onClick={tagAdd}>추가</TagAddButton> */}
      </TagBox>
      <br></br>
      <div style={{ display: 'flex' }}>
        {tag.map((tag, index) => (
          <ResultTag key={index}># {tag}</ResultTag>
        ))}
      </div>

      <StateBox id="titleFont">
        <h3>결과를 선택하세요 </h3>
        <StateSelect
          id="titleFont"
          defaultValue="진행중"
          onChange={handleProgressInput}
        >
          <option id="titleFont" value="진행중">
            진행중
          </option>
          <option id="titleFont" value="서류탈락">
            서류탈락
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
        <h3>채용사이트</h3>
        <UrlInput
          placeholder="URL을 입력하세요"
          onChange={handleLinkInput}
        ></UrlInput>
      </UrlBox>
      <br></br>
      <DateBox id="titleFont">
        <DateTitle>일정 등록</DateTitle>
        <button style={{ marginLeft: '83%' }} onClick={handleDateClick}>
          ➕
        </button>
        {dateList.map((li, index) => (
          <MyNoticeDate
            li={li}
            getDateData={getDateData}
            key={index}
            index={index}
            setDateDataee={setDateData}
          ></MyNoticeDate>
        ))}
      </DateBox>
      <br></br>

      {/* <DateBox id="titleFont">
        <h3>시작일</h3>
        <DateSelectBox>
          <DatePicker
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            autoComplete='off'
            id="contentFont"
            onChange={date => setStartDate(date)}
            selected={startDate}
          ></DatePicker>
        </DateSelectBox>

          <h3>마감일</h3>
          <DateSelectBox>
          <DatePicker
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            autoComplete='off'
            id="contentFont"
            onChange={date => setEndDate(date)}
            selected={endDate}
          ></DatePicker>
        </DateSelectBox>
      </DateBox> */}

      <br></br>
      <br></br>

      <div id="box"></div>
      {list.map((li, index) => (
        <MyNoticeAddcomponent
          getChildData={getChildData}
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
        <ComponentAddButton onClick={onClick}>항목추가</ComponentAddButton>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SaveCancelButton
          id="contentFont"
          backgroundColor="#81C6E8"
          onClick={handleTotalData}
        >
          저장
        </SaveCancelButton>{' '}
        <SaveCancelButton
          id="contentFont"
          backgroundColor="#FF6464"
          marginLeft="30px"
        >
          취소
        </SaveCancelButton>
      </div>
    </Wrapper>
  );
};

export default MyNoticeAdd;
