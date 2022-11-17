import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { colors } from '../../common/color';


const Wrapper = styled.div``;
//태그 부분 전체 div
const TagBox = styled.div`
  display: flex;
`;

//태그 입력창
const TagInputBox = styled.input`
  border: none;
  border-bottom: 3px solid ${colors.bsColor2};
  width: 100%;
  height: 40px;
  padding-left: 10px;
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
  padding: 0px 7px 0px 7px;
  margin-right: 10px;
  height: 30px;
  background-color: ${colors.bsColor1};
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
  padding-left: 10px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border: none;
  border-bottom: 3px solid ${colors.bsColor2};
  background-color: #F9F9F9;
  :focus {
    outline: none;
  }
`;
// content 담는 박스
const ContentBox = styled.div`
  background-color: #F9F9F9;
  width: 100%;
  height: 420px;
  border-radius: 15px;
  box-shadow: 0rem 0.1rem 0.2rem gray;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    background-color: #F5F5F5;
    box-shadow: 0rem 0.2rem 0.4rem ${colors.bsColor4};
  }
`;

const DeleteTagButton = styled.div`
  padding-left: 8px;
  cursor: pointer;
  
  color: ${colors.bsColor4};
`


// 내용 적는 textarea
const ContentContent = styled.textarea`
  box-sizing: border-box;
  background-color: #F9F9F9;
  border: none;
  width: 100%;
  height: 320px;
  padding-left: 10px;

  :focus {
    outline: none;
  }
  &:hover {
    background-color: #F5F5F5;
  }
`;

//글자수 세는 div
const CountBox = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  height: 40px;
  text-align: end;
  align-items: flex-end;
  justify-content: end;
  margin-right: 50px;
`;

const MyNoticeAddcomponent = ({ settingNoticeData,index}) => {
  const [tag, setTag] = useState([]);
  const [tagItem, setTagItem] = useState('');
  const [pushData, setPushData] = useState({ question: '', introTag: '', contents: '' });

  
  useEffect(() => {
    
    settingNoticeData(index, {
      question: pushData.question,
      contents: pushData.contents,
      introTag : pushData.introTag
    });
  }, [pushData]);



  // 태그 값이 변하는걸쳐다봄
  useEffect(() => {
    if (tag.length === 0) return;
    setPushData({ ...pushData, introTag: tag.join(', ') }); // ,로 구분하기 위한 과정
    
  }, [tag]);



  const keydownHandler = e => {
    if (e.key === 'Enter') {
      if (tag.length >=5) {
        alert('태그는 5개까지 입력 가능합니다.')
        setTagItem('')
        return
      }
      else if (tag.indexOf(tagItem) !== -1) {
        setTagItem('')
        return
      }
      else {
      
      setTag([...tag, tagItem]);
      setTagItem('');
    }
    }
  };
  const onChangeTitleHandler = e => {
    setPushData({...pushData, question : e.target.value})
    
  };

  const onChangeContentHandler = e => {
    setPushData({...pushData, contents : e.target.value})
    
  };


  const onChangeTagHandler = e => {
    setTagItem(e.target.value);
  };

     // 태그 삭제
     const deleteTag = tag1 => {
      const newArray = tag.filter(d => d !== tag1);
      setTag(newArray);
    };

 
  return (
    <Wrapper>
      <br></br>
      <br></br>
      <TagBox>
        <TagInputBox
          id="contentFont"
          value={tagItem || ""}
          placeholder="태그를 추가하세요 "
          onKeyDown={keydownHandler}
          onChange={onChangeTagHandler}
        />
        
      </TagBox>
      <br></br>
      <div style={{ display: 'flex' }}>
        {tag.map((tag, index) => (
          <ResultTag id="contentFont" key={index}># {tag} <DeleteTagButton onClick={()=>deleteTag(tag) }>X</DeleteTagButton></ResultTag>
        ))}
      </div>

      <br></br>
      <div>
        <ContentBox id="font_test2">
          <ContentTitle
            id="contentFont"
            value={pushData.title}
            onChange={onChangeTitleHandler}
            placeholder="제목을 입력하세요"
          ></ContentTitle>
          <ContentContent
            value={pushData.contents}
            id="contentFont"
            onChange={onChangeContentHandler}
            placeholder="내용을 입력하세요"
          ></ContentContent>
          <CountBox id="contentFont">
            현재 글자수 : {pushData.contents.replace(/<br\s*\/?>/gm, '\n').length || 0}{' '}
          </CountBox>
        </ContentBox>
        <br></br>
      </div>
    </Wrapper>
  );
};

export default MyNoticeAddcomponent;