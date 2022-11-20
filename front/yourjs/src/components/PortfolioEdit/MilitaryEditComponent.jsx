import React, { useState } from 'react';
import {Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle,
  BoxInput, SaveButton, Essential, EssentialDate, DateBox} from '../../common/PorfoStyled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import { addDays } from 'date-fns/esm';
import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getMonth';
import range from "lodash/range"


const MilitaryEditComponent = ({getServerData}) => {
  const years = range(getYear(new Date()), getYear(new Date())-40, -1);
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const [militaryType, setmilitaryType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [specialityType, setspecialityType] = useState('');
  const [discharge, setdischarge] = useState('');
  const [data, setData] = useState({militaryType: '', startDate: '', endDate: '', specialityType: '', discharge: ''});

  const onChangeNameHandler = e => {
    setmilitaryType(e.target.value);
    setData({ ...data, militaryType: militaryType });
  };

  const onChangespecialityTypeHandler = e => {
    setspecialityType(e.target.value);
    setData({ ...data, specialityType: specialityType });
  };

  const onChangedischargeHandler = e => {
    setdischarge(e.target.value);
    setData({ ...data, discharge: discharge });
  };

  const addButtonClicked = () => {
    const data = {
      militaryType: militaryType === "" ? null : militaryType,
      startDate: startDate === "" ? null : addDays(startDate, 1),
      endDate: endDate === "" ? null : addDays(endDate, 1),
      specialityType: specialityType === "" ? null : specialityType,
      discharge: discharge === "" ? null : discharge,
    }

    if (data.militaryType === null || data.startDate === null || data.specialityType === null || data.discharge === null) {
      alert("필수값을 입력해 주세요.")
    } else {
    
    axiosInstance
      .post(apis.military, data)
      .then(response => {
        if (response.status === 200) {
          getServerData()
          setmilitaryType('')
          setStartDate('')
          setEndDate('')
          setspecialityType('')
          setdischarge('')
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
          <RightBoxTitle>군별 <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={militaryType}
            onChange={onChangeNameHandler}
            placeholder='군별을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>병과 <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={specialityType}
            onChange={onChangespecialityTypeHandler}
            placeholder='병과를 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>전역사유 <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={discharge}
            onChange={onChangedischargeHandler}
            placeholder='전역사유를 입력해 주세요'
          ></BoxInput>
        </RightBox>
      </RightBoxes>
    </Content>
  )
}


export default MilitaryEditComponent;