import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { colors } from '../../common/color';


const Wrapper = styled.div`
  border: 1px solid #F1F1F1;
  border-radius: 10px;
  background-color: #FBFBFD;
  margin-bottom: 30px;
  padding: 20px 0px 20px 0px;
`

// 제목 name, input 포함하는 div + 태그 결과 폼도 같이 사용
const TitleDiv = styled.div`
  display: flex;
  margin-bottom: 30px;
  width: 95%;
`

// name
const Name = styled.div`
  width: 20%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
`

// 제목 쓰는 input
const TitleInput = styled.input`
  box-sizing: border-box;
  width: 80%;
  border: 1px solid #F1F1F1;
  border-radius: 10px;
  padding: 10px;
  font-size: 15px;
  :focus {
    outline: 0.1px solid ${colors.bsColor2};
  }
  &:hover {
    border: 2px solid ${colors.bsColor2};
  }
`

// 태그 추가 input
const TagInput = styled.input`
  box-sizing: border-box;
  width: 80%;
  border: 1px solid #F1F1F1;
  border-radius: 10px;
  padding: 10px;
  font-size: 15px;
  :focus {
    outline: 0.1px solid ${colors.bsColor2};
  }
  &:hover {
    border: 2px solid ${colors.bsColor2};
  }
`

// Tag List 보여주는 div
const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px 4% 30px 19%;
`

// Tag List 안의 요소들의 div
const ResultTag = styled.div`
  min-width: 40px;
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 0px 10px 10px 0px;
  font-size: 15px;
  font-weight: 700;
  border-radius: 10px;
  background-color: white;
  border: 2px solid ${colors.bsColor2};
  &:hover {
    border: 2.5px solid ${colors.bsColor3};
  }
`

// Tag 지우는 버튼
const DeleteTagButton = styled.div`
  padding-left: 8px;
  width: 15px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  color: ${colors.bsColor2};
  &:hover {
    color: ${colors.bsColor4};
  }
`

// 내용 name, input 포함하는 div
const ContentDiv = styled.div`
  display: flex;
  width: 95%;
`

// 내용 name, 글자수 포함하는 div
const ContentName = styled.div`
  width: 20%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

//글자수 세는 div
const CountBox = styled.div`
  height: 360px;
  display: flex;
  align-items: flex-end;
  font-size: 18px;
`

// 내용 쓰는 textarea
const ContentInput = styled.textarea`
  box-sizing: border-box;
  width: 80%;
  height: 400px;
  border: 1px solid #F1F1F1;
  border-radius: 10px;
  padding: 10px;
  font-size: 15px;
  :focus {
    outline: 0.1px solid ${colors.bsColor2};
  }
  &:hover {
    border: 2px solid ${colors.bsColor2};
  }
`


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
      <TitleDiv>
        <Name id="titleFont">자기소개서 질문</Name>
        <TitleInput
          id="contentFont"
          value={pushData.title}
          onChange={onChangeTitleHandler}
          placeholder="질문을 입력하세요"
        />
      </TitleDiv>
      <TitleDiv>
        <Name id="titleFont">태그</Name>
        <TagInput
          id="contentFont"
          value={tagItem || ""}
          placeholder="태그를 추가하세요 (태그는 5개까지 가능합니다)"
          onKeyDown={keydownHandler}
          onChange={onChangeTagHandler}
        />
      </TitleDiv>
      <TagList>
        {tag.map((tag, index) => (
          <ResultTag id="contentFont" key={index}># {tag} <DeleteTagButton onClick={()=>deleteTag(tag) }>X</DeleteTagButton></ResultTag>
        ))}
      </TagList>
      <ContentDiv>
        <ContentName>
          <Name id="titleFont">내용</Name>
          <CountBox id="titleFont">
            글자수 : {pushData.contents.replace(/<br\s*\/?>/gm, '\n').length || 0}{' '}
          </CountBox>
        </ContentName>
        <ContentInput
          id="contentFont"
          value={pushData.contents}
          onChange={onChangeContentHandler}
          placeholder="내용을 입력하세요"
        />
      </ContentDiv>
    </Wrapper>
  );
};

export default MyNoticeAddcomponent;