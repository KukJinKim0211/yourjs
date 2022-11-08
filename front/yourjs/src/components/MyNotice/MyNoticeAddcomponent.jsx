import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';


const Wrapper = styled.div``;
//태그 부분 전체 div
const TagBox = styled.div`
  display: flex;
`;

//태그 입력창
const TagInputBox = styled.input`
  border: none;
  border-bottom: 3px solid gray;
  width: 100%;
  height: 40px;
  :focus {
    outline: none;
  }
`;
//태그 추가 버튼
const TagAddButton = styled.button`
  width: 10%;
`;
// 태그 완성시 표시되는 부분
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
//제목 쓰는 인풋박스
const ContentTitle = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border: none;
  border-bottom: 3px solid gray;
  background-color: whitesmoke;
  :focus {
    outline: none;
  }
`;
// content 담는 박스
const ContentBox = styled.div`
  background-color: whitesmoke;
  width: 100%;
  height: 420px;
  border-radius: 15px;
  box-shadow: 0.5rem 0.5rem 0.5rem gray;
  margin-top: 10px;
`;

// 내용 적는 textarea
const ContentContent = styled.textarea`
  box-sizing: border-box;
  background-color: whitesmoke;
  border: none;
  width: 100%;
  min-height: 300px;

  :focus {
    outline: none;
  }
`;

//글자수 세는 div
const CountBox = styled.div`
  margin-right: 1%;
`;

const MyNoticeAddcomponent = ({ settingNoticeData,index}) => {
  const [tag, setTag] = useState([]);
  const [tagItem, setTagItem] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pushData, setPushData] = useState({ question: '', introTag: '', contents: '' });

  
  useEffect(() => {
    settingNoticeData(index, {
      question: pushData.question,
      contents: pushData.contents,
      introTag : pushData.introTag
    });
  }, [pushData]);

  // push data 값이 변할때 부모에게 값주는 effect
  // useEffect(() => {
  //   getChildData(pushData);
  // }, [pushData]);

  // 태그 값이 변하는걸쳐다봄
  useEffect(() => {
    if (tag.length === 0) return;
    setPushData({ ...pushData, introTag: tag.join(', ') }); // ,로 구분하기 위한 과정
    
  }, [tag]);



  const keydownHandler = e => {
    if (e.key === 'Enter') {
      console.log('성공');
      setTag([...tag, tagItem]);
      setTagItem('');
      
    }
  };


  const onChangeTagHandler = e => {
    setTagItem(e.target.value);
  };

  useEffect(() => {
    setPushData({ ...pushData, question: title });
  }, [title]);

  useEffect(() => {
    setPushData({ ...pushData, contents: content });
  }, [content]);

  const onChangeTitleHandler = e => {
    setTitle(e.target.value);
    
  };

  const onChangeContentHandler = e => {
    setContent(e.target.value);
    
  };

  return (
    <Wrapper>
      <br></br>
      <br></br>
      <TagBox>
        <TagInputBox
          id="contentFont"
          value={tagItem}
          placeholder="태그를 추가하세요 "
          onKeyDown={keydownHandler}
          onChange={onChangeTagHandler}
        />
        {/* <TagAddButton onClick={tagAdd}>추가</TagAddButton> */}
      </TagBox>
      <br></br>
      <div style={{ display: 'flex' }}>
        {tag.map((tag, index) => (
          <ResultTag key={index}># {tag}</ResultTag>
        ))}
      </div>

      <br></br>
      <div>
        <ContentBox id="font_test2">
          <ContentTitle
            id="contentFont"
            value={title}
            onChange={onChangeTitleHandler}
            placeholder="제목을 입력하세요"
          ></ContentTitle>
          <br></br>
          <br />
          <ContentContent
            value={content}
            id="contentFont"
            onChange={onChangeContentHandler}
            placeholder="내용을 입력하세요"
          ></ContentContent>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CountBox id="contentFont">
              {' '}
              현재 글자수 : {content.replace(/<br\s*\/?>/gm, '\n').length}{' '}
            </CountBox>
          </div>
        </ContentBox>
        
        <br></br>
      </div>
    </Wrapper>
  );
};

export default MyNoticeAddcomponent;
