import React from 'react';
import { useState } from 'react';
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


const CertificateEditComponent = ({getServerData}) => {
  const years = range(getYear(new Date()), getYear(new Date())-40, -1);
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const [certName, setcertName] = useState('');
  const [acquisitionDate, setacquisitionDate] = useState('');
  const [certNum, setcertNum] = useState('');
  const [certInstitution, setcertInstitution] = useState('');
  const [data, setData] = useState({certName: '', acquisitionDate: '', certNum: '', certInstitution: ''});

  const onChangeNameHandler = e => {
    setcertName(e.target.value);
    setData({ ...data, certName: certName });
  };

  const onChangecertNumHandler = e => {
    setcertNum(e.target.value);
    setData({ ...data, certNum: certNum });
  };

  const onChangecertInstitutionHandler = e => {
    setcertInstitution(e.target.value);
    setData({ ...data, certInstitution: certInstitution });
  };

  const addButtonClicked = () => {
    const data = {
      certName: certName === "" ? null : certName,
      acquisitionDate: acquisitionDate === "" ? null : addDays(acquisitionDate, 1),
      certNum: certNum === "" ? null : certNum,
      certInstitution: certInstitution === "" ? null : certInstitution,
    }

    if (data.certName === null || data.acquisitionDate === null || data.certNum === null || data.certInstitution === null) {
      alert("필수값을 입력해 주세요.")
    } else {
    axiosInstance
      .post(apis.certificate, data)
      .then(response => {
        if (response.status === 200) {
          getServerData()
          setcertName('')
          setacquisitionDate('')
          setcertNum('')
          setcertInstitution('')
        }
      })
      .catch(error => console.log(error));}
  };

  return (
    <Content>
      <LeftBox style={{marginLeft: "2rem"}}>
        <br/>
        <LeftBoxTitle>취득일<EssentialDate>(*)</EssentialDate></LeftBoxTitle>
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
            placeholderText='취득일'
            dateFormat="yyyy - MM - dd"
            autoComplete="off"
            id="contentFont"
            selected={acquisitionDate}
            onChange={date => setacquisitionDate(date)}
          /></LeftBoxContent>
        <br/><br/>
        <SaveButton
          onClick={addButtonClicked}
        >추가</SaveButton>
      </LeftBox>
      <CenterBox></CenterBox>
      <RightBoxes>
        <RightBox>
          <RightBoxTitle>자격증명 <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={certName}
            onChange={onChangeNameHandler}
            placeholder='자격증명을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>자격번호 <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={certNum}
            onChange={onChangecertNumHandler}
            placeholder='자격번호를 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>발급기관 <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={certInstitution}
            onChange={onChangecertInstitutionHandler}
            placeholder='발급기관을 입력해 주세요'
          ></BoxInput>
        </RightBox>
      </RightBoxes>
    </Content>
  )
}


export default CertificateEditComponent;