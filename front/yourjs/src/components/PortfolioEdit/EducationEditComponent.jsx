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
      alert("???????????? ????????? ?????????.")
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
        <LeftBoxTitle>?????????<EssentialDate>(*)</EssentialDate>{"\u00A0"}{"\u00A0"}~{"\u00A0"}{"\u00A0"}?????????</LeftBoxTitle>
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
                  <span> ???</span>
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
                  <span> ???</span>
                </DateBox>
              </Content>
            )}
            locale={ko}
            placeholderText='?????????'
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
                  <span> ???</span>
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
                  <span> ???</span>
                </DateBox>
              </Content>
            )}
            locale={ko}
            placeholderText='?????????'
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
        >??????</SaveButton>
      </LeftBox>
      <CenterBox></CenterBox>
      <RightBoxes>
        <RightBox>
          <RightBoxTitle>????????? <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={eduName}
            onChange={onChangeNameHandler}
            placeholder='???????????? ????????? ?????????'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>???????????? <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={eduInstitution}
            onChange={onChangeeduInstitutionHandler}
            placeholder='??????????????? ????????? ?????????'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>???????????? <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={eduTime}
            onChange={onChangeeduTimeHandler}
            placeholder='??????????????? ????????? ????????? ?????????'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>???????????? <Essential>(*)</Essential></RightBoxTitle>
          <BoxArea 
            value={eduContents}
            onChange={onChangeeduContentsHandler}
            placeholder='??????????????? ????????? ?????????'
          ></BoxArea>
        </RightBox>
      </RightBoxes>
    </Content>
  )
}


export default EducationEditComponent;