import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';



//태그 부분 전체 div
const TagBox = styled.div`
  display: flex;
`;

//태그 입력창
const TagInputBox = styled.input`
  border: none;
  border-bottom: 3px solid gray;
  width: 90%;
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
  box-shadow: 0.1rem 0.1rem 0.1rem gray;;
  
`;

const ContentTitle = styled.input`
  padding-top: 5px;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border: none;
`;
const ContentBox = styled.div`
  background-color: whitesmoke;
  width: 100%;
  height: 400px;
  border-radius: 15px;
  box-shadow: 0.5rem 0.5rem 0.5rem gray;
  margin-bottom: 50px;
  margin-top: 10px;
`;
const ContentContent = styled.input`
  box-sizing: border-box;
  width: 100%;
  min-height: 300px;
`;

const MyNoticeAddcomponent = ({}) => {
  const [tag, setTag] = useState([]);
  const [tagItem, setTagItem] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pushData, setPushData] = useState({ title: '', tag: '', content: '' });

  const keydownHandler = e => {
    if (e.key === 'Enter') {
      console.log('성공');
      setTag([...tag, tagItem]);
      setTagItem('');
      console.log(tag);
    }
  };

  const tagAdd = () => {
    setTag([...tag, tagItem]);
    setTagItem('');
  };

  const onChangeTagHandler = e => {
    setTagItem(e.target.value);
    setPushData({ ...pushData, tag: tagItem });
  };

  const onChangeTitleHandler = e => {
    setTitle(e.target.value);
    setPushData({ ...pushData, title: title });
  };

  const onChangeContentHandler = e => {
    setContent(e.target.value);
    setPushData({ ...pushData, content: content });
  };

  return (
    <div>
      <TagBox>
        <TagInputBox
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
            value={title}
            onChange={onChangeTitleHandler}
            placeholder="제목을 입력하세요"
          ></ContentTitle>
          <br></br>
          <br />
          <ContentContent
            value={content}
            onChange={onChangeContentHandler}
            placeholder="내용을 입력하세요"
          ></ContentContent>
        </ContentBox>
      </div>
    </div>
  );
};

export default MyNoticeAddcomponent;
