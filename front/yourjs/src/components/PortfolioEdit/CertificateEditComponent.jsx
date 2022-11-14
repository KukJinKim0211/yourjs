import React from 'react';
import { useState } from 'react';
import {Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle,
  BoxInput, SaveButton, Essential, EssentialDate} from '../../common/PorfoStyled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';


const CertificateEditComponent = ({getServerData}) => {
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
      acquisitionDate: acquisitionDate === "" ? null : acquisitionDate,
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
            style ={{"z-index" : 999}}
            placeholderText='취득일'
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            autoComplete="off"
            id="contentFont"
            onChange={date => setacquisitionDate(date)}
            selected={acquisitionDate}
        ></DatePicker></LeftBoxContent>
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