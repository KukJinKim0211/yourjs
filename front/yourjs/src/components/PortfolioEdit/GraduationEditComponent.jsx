import React from 'react';
import { useState } from 'react';
import {Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle,
  BoxInput, SaveButton, Essential, EssentialDate} from '../../common/PorfoStyled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import { addDays } from 'date-fns/esm';


const GraduationEditComponent = ({getServerData}) => {
  const [schoolName, setschoolName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setlocation] = useState('');
  const [majorName, setmajorName] = useState('');
  const [doubleMajorName, setdoubleMajorName] = useState('');
  const [subMajorName, setsubMajorName] = useState('');
  const [majorCredit, setmajorCredit] = useState('');
  const [totCredit, settotCredit] = useState('');
  const [majorAvgCredit, setmajorAvgCredit] = useState('');
  const [totAvgCredit, settotAvgCredit] = useState('');
  const [file, setFile] = useState('');
  const [data, setData] = useState({schoolName: '', startDate: '', endDate: '', location: '', majorName: '', doubleMajorName: '', subMajorName: '', majorCredit: '', totCredit: '', majorAvgCredit: '', totAvgCredit: '', file: ''});

  const onChangeNameHandler = e => {
    setschoolName(e.target.value);
    setData({ ...data, schoolName: schoolName });
  };

  const onChangelocationHandler = e => {
    setlocation(e.target.value);
    setData({ ...data, location: location });
  };

  const onChangemajorNameHandler = e => {
    setmajorName(e.target.value);
    setData({ ...data, majorName: majorName });
  };

  const onChangedoubleMajorNameHandler = e => {
    setdoubleMajorName(e.target.value);
    setData({ ...data, doubleMajorName: doubleMajorName });
  };

  const onChangesubMajorNameHandler = e => {
    setsubMajorName(e.target.value);
    setData({ ...data, subMajorName: subMajorName });
  };

  const onChangemajorCreditHandler = e => {
    setmajorCredit(e.target.value);
    setData({ ...data, majorCredit: majorCredit });
  };

  const onChangetotCreditHandler = e => {
    settotCredit(e.target.value);
    setData({ ...data, totCredit: totCredit });
  };

  const onChangemajorAvgCreditHandler = e => {
    setmajorAvgCredit(e.target.value);
    setData({ ...data, majorAvgCredit: majorAvgCredit });
  };

  const onChangetotAvgCreditHandler = e => {
    settotAvgCredit(e.target.value);
    setData({ ...data, totAvgCredit: totAvgCredit });
  };

  const onChangeFileHandler = e => {
    setFile(e.target.value);
    setData({ ...data, file: file });
  };

  const addButtonClicked = () => {
    const data = {
      schoolName: schoolName === "" ? null : schoolName,
      startDate: startDate === "" ? null : addDays(startDate, 1),
      endDate: endDate === "" ? null : addDays(endDate, 1),
      location: location === "" ? null : location,
      majorName,
      doubleMajorName,
      subMajorName,
      majorCredit,
      totCredit,
      majorAvgCredit,
      totAvgCredit,
      file,
    }

    if (data.schoolName === null || data.startDate === null || data.location === null) {
      alert("필수값을 입력해 주세요.")
    } else {
    axiosInstance
      .post(apis.graduation, data)
      .then(response => {
        if (response.status === 200) {
          getServerData()
          setschoolName('')
          setStartDate('')
          setEndDate('')
          setlocation('')
          setmajorName('')
          setdoubleMajorName('')
          setsubMajorName('')
          setmajorCredit('')
          settotCredit('')
          setmajorAvgCredit('')
          settotAvgCredit('')
          setFile('')
        }
      })
      .catch(error => console.log(error));}
  };

  return (
    <Content>
      <LeftBox style={{marginLeft: "2rem"}}>
        <br/>
        <LeftBoxTitle>시작일<EssentialDate>(*)</EssentialDate>{"\u00A0"}{"\u00A0"}~{"\u00A0"}{"\u00A0"}종료일</LeftBoxTitle>
        <LeftBoxContent>
        <DatePicker
            style ={{"z-index" : 999}}
            placeholderText='시작일'
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            autoComplete="off"
            id="contentFont"
            onChange={date => setStartDate(date)}
            selected={startDate}
        ></DatePicker></LeftBoxContent>
        ~<LeftBoxContent>
        <DatePicker
            style ={{"z-index" : 999}}
            placeholderText='종료일'
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            autoComplete="off"
            id="contentFont"
            onChange={date => setEndDate(date)}
            selected={endDate}
        ></DatePicker></LeftBoxContent>
        <br/><br/>
        <SaveButton
          onClick={addButtonClicked}
        >추가</SaveButton>
      </LeftBox>
      <CenterBox></CenterBox>
      <RightBoxes>
        <RightBox>
          <RightBoxTitle>학교명 <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={schoolName}
            onChange={onChangeNameHandler}
            placeholder='학교명을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>지역 <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={location}
            onChange={onChangelocationHandler}
            placeholder='지역을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>전공</RightBoxTitle>
          <BoxInput 
            value={majorName}
            onChange={onChangemajorNameHandler}
            placeholder='전공을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>복수전공</RightBoxTitle>
          <BoxInput 
            value={doubleMajorName}
            onChange={onChangedoubleMajorNameHandler}
            placeholder='복수전공을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>부전공</RightBoxTitle>
          <BoxInput 
            value={subMajorName}
            onChange={onChangesubMajorNameHandler}
            placeholder='부전공을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>전공 이수학점</RightBoxTitle>
          <BoxInput 
            value={majorCredit}
            onChange={onChangemajorCreditHandler}
            placeholder='전공 이수학점을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>총 이수학점</RightBoxTitle>
          <BoxInput 
            value={totCredit}
            onChange={onChangetotCreditHandler}
            placeholder='총 이수학점을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>전공 평점</RightBoxTitle>
          <BoxInput 
            value={majorAvgCredit}
            onChange={onChangemajorAvgCreditHandler}
            placeholder='전공 평점을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>총 평점</RightBoxTitle>
          <BoxInput 
            value={totAvgCredit}
            onChange={onChangetotAvgCreditHandler}
            placeholder='총 평점을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>파일</RightBoxTitle>
          <BoxInput 
            value={file}
            onChange={onChangeFileHandler}
            placeholder='파일을 업로드해 주세요'
          ></BoxInput>
        </RightBox>
      </RightBoxes>
    </Content>
  )
}


export default GraduationEditComponent;