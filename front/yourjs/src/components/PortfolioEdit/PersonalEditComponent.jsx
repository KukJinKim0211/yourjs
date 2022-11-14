import React from 'react';
import { useState } from 'react';
import {Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, BoxInput, SaveButton} from '../../common/PorfoStyled';
import 'react-datepicker/dist/react-datepicker.css';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';


const PersonalEditComponent = ({getServerData}) => {
  const [cnName, setcnName] = useState('');
  const [engName, setengName] = useState('');
  const [techStacks, settechStacks] = useState('');
  const [links, setlinks] = useState('');
  const [data, setData] = useState({cnName: '', engName: '', techStacks: '', links: ''});

  const onChangecnNameHandler = e => {
    setcnName(e.target.value);
    setData({ ...data, cnName: cnName });
  };

  const onChangeengNameHandler = e => {
    setengName(e.target.value);
    setData({ ...data, engName: engName });
  };

  const onChangetechStacksHandler = e => {
    settechStacks(e.target.value);
    setData({ ...data, techStacks: techStacks });
  };

  const onChangelinksHandler = e => {
    setlinks(e.target.value);
    setData({ ...data, links: links });
  };

  const addButtonClicked = () => {
    const data = {
      cnName,
      engName,
      techStacks,
      links,
    }

    // if ()
    axiosInstance
      .post(apis.military, data)
      .then(response => {
        if (response.status === 200) {
          getServerData()
          setcnName('')
          setengName('')
          settechStacks('')
          setlinks('')
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <Content>
      <LeftBox style={{marginLeft: "2rem"}}>
        <SaveButton
          onClick={addButtonClicked}
        >추가</SaveButton>
      </LeftBox>
      <CenterBox></CenterBox>
      <RightBoxes>
        <RightBox>
          <RightBoxTitle>한자 이름</RightBoxTitle>
          <BoxInput 
            value={cnName}
            onChange={onChangecnNameHandler}
            placeholder='한자 이름을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>영어 이름</RightBoxTitle>
          <BoxInput 
            value={engName}
            onChange={onChangeengNameHandler}
            placeholder='영어 이름을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>기술스택</RightBoxTitle>
          <BoxInput 
            value={techStacks}
            onChange={onChangetechStacksHandler}
            placeholder='기술스택을 입력해 주세요'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>외부 URL</RightBoxTitle>
          <BoxInput 
            value={links}
            onChange={onChangelinksHandler}
            placeholder='기술스택을 입력해 주세요'
          ></BoxInput>
        </RightBox>
      </RightBoxes>
    </Content>
  )
}


export default PersonalEditComponent;