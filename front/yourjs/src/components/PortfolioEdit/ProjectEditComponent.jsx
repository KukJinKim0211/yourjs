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



const ProjectEditComponent = ({getServerData}) => {
  const years = range(getYear(new Date()), getYear(new Date())-40, -1);
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [belongs, setBelongs] = useState('');
  const [tools, setTools] = useState('');
  const [content, setContent] = useState('');
  const [data, setData] = useState({projectName: '', startDate: '', endDate: '', belongs: '', tools: '', content: ''});

  const onChangeNameHandler = e => {
    setProjectName(e.target.value);
    setData({ ...data, projectName: projectName });
  };

  const onChangeBelongsHandler = e => {
    setBelongs(e.target.value);
    setData({ ...data, belongs: belongs });
  };

  const onChangeToolsHandler = e => {
    setTools(e.target.value);
    setData({ ...data, tools: tools });
  };

  const onChangeContentHandler = e => {
    setContent(e.target.value);
    setData({ ...data, content: content });
  };

  const addButtonClicked = () => {
    const data = {
      projectName: projectName === "" ? null : projectName,
      startDate: startDate === "" ? null : addDays(startDate, 1),
      endDate: endDate === "" ? null : addDays(endDate, 1),
      belongs: belongs === "" ? null : belongs,
      tools: tools === "" ? null : tools,
      content: content === "" ? null : content,
    }

    if (data.projectName === null || data.startDate === null || data.belongs === null || data.tools === null || data.content === null) {
      alert("필수값을 입력해 주세요.")
    } else {
    axiosInstance
      .post(apis.project, data)
      .then(response => {
        if (response.status === 200) {
          getServerData()
          setProjectName('')
          setStartDate('')
          setEndDate('')
          setBelongs('')
          setTools('')
          setContent('')
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
          <RightBoxTitle>프로젝트명 <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={projectName}
            onChange={onChangeNameHandler}
            placeholder='프로젝트 명을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>소속명 <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={belongs}
            onChange={onChangeBelongsHandler}
            placeholder='프로젝트 소속명을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>사용기술 <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={tools}
            onChange={onChangeToolsHandler}
            placeholder='프로젝트 사용기술을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>내용 <Essential>(*)</Essential></RightBoxTitle>
          <BoxArea 
            value={content}
            onChange={onChangeContentHandler}
            placeholder='프로젝트 내용을 입력해 주세요'
          ></BoxArea>
        </RightBox>
      </RightBoxes>
    </Content>
  )
}


export default ProjectEditComponent;