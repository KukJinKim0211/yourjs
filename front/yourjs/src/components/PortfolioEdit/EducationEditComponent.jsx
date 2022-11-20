import React from 'react';
import { useState } from 'react';
import {Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle,
  BoxInput, BoxArea, SaveButton, Essential, EssentialDate, DateBox} from '../../common/PorfoStyled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import { addDays } from 'date-fns/esm';
import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getMonth';
import range from "lodash/range"


const EducationEditComponent = ({getServerData}) => {
  const years = range(getYear(new Date()), getYear(new Date())-40, -1);
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const [eduName, seteduName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eduContents, seteduContents] = useState('');
  const [eduInstitution, seteduInstitution] = useState('');
  const [eduTime, seteduTime] = useState('');
  const [data, setData] = useState({eduName: '', startDate: '', endDate: '', eduContents: '', eduInstitution: '', eduTime: null});

  const onChangeNameHandler = e => {
    seteduName(e.target.value);
    setData({ ...data, eduName: eduName });
  };

  const onChangeeduContentsHandler = e => {
    seteduContents(e.target.value);
    setData({ ...data, eduContents: eduContents });
  };

  const onChangeeduInstitutionHandler = e => {
    seteduInstitution(e.target.value);
    setData({ ...data, eduInstitution: eduInstitution });
  };

  const onChangeeduTimeHandler = e => {
    seteduTime(e.target.value);
    setData({ ...data, eduTime: eduTime });
  };

  const addButtonClicked = () => {
    const data = {
      eduName: eduName === "" ? null : eduName,
      startDate: startDate === "" ? null : addDays(startDate, 1),
      endDate: endDate === "" ? null : addDays(endDate, 1),
      eduContents: eduContents === "" ? null : eduContents,
      eduInstitution: eduInstitution === "" ? null : eduInstitution,
      eduTime: eduTime === "" ? null : eduTime,
    }

    if (data.eduName === null || data.startDate === null || data.eduContents === null || data.eduInstitution === null || data.eduTime === null) {
      alert("필수값을 입력해 주세요.")
    } else {
    axiosInstance
      .post(apis.education, data)
      .then(response => {
        console.log(response.data)
        if (response.status === 200) {
          getServerData()
          seteduName('')
          setStartDate('')
          setEndDate('')
          seteduContents('')
          seteduInstitution('')
          seteduTime('')
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
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
            }) => (
              <Content>
                <DateBox>
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(Number(value))}
                  >
                    {years.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <span> 년</span>
                </DateBox>
                <DateBox>
                  <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <span> 월</span>
                </DateBox>
              </Content>
            )}
            locale={ko}
            placeholderText='시작일'
            dateFormat="yyyy - MM - dd"
            autoComplete="off"
            id="contentFont"
            selected={startDate}
            onChange={date => setStartDate(date)}
          />
        </LeftBoxContent>
        <LeftBoxContent>~
          <DatePicker
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
            }) => (
              <Content>
                <DateBox>
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(Number(value))}
                  >
                    {years.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <span> 년</span>
                </DateBox>
                <DateBox>
                  <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <span> 월</span>
                </DateBox>
              </Content>
            )}
            locale={ko}
            placeholderText='종료일'
            dateFormat="yyyy - MM - dd"
            autoComplete="off"
            id="contentFont"
            selected={endDate}
            onChange={date => setEndDate(date)}
          />
        </LeftBoxContent>
        <br/><br/>
        <SaveButton
          onClick={addButtonClicked}
        >추가</SaveButton>
      </LeftBox>
      <CenterBox></CenterBox>
      <RightBoxes>
        <RightBox>
          <RightBoxTitle>교육명 <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={eduName}
            onChange={onChangeNameHandler}
            placeholder='교육명을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>주관기관 <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={eduInstitution}
            onChange={onChangeeduInstitutionHandler}
            placeholder='주관기관을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>교육시간 <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={eduTime}
            onChange={onChangeeduTimeHandler}
            placeholder='교육시간을 숫자로 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>교육내용 <Essential>(*)</Essential></RightBoxTitle>
          <BoxArea 
            value={eduContents}
            onChange={onChangeeduContentsHandler}
            placeholder='교육내용을 입력해 주세요'
          ></BoxArea>
        </RightBox>
      </RightBoxes>
    </Content>
  )
}


export default EducationEditComponent;