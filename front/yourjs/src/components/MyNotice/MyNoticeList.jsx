import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import { useState } from 'react';
import MyNoticeDetail from './MyNoticeDetail';
import { useEffect } from 'react';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import { colors } from '../../common/color';
import plusbutton from '../../img/plusbutton2.png'
import {
  faCirclePlus,
 
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// 아이템 리스트
const ItemList = styled.div`
  width: 250px;
  display: flex;

  flex-direction: column;
  color: black;
  height: 320px;
  background-color: ${colors.bsColor1}; // 카드 한장한장 배경화면 색깔
  margin-top: 30px;
  border-radius: 10px;
  box-shadow: 0.5rem 0.5rem 0.5rem ${colors.bsColor2};
  .progress {
    color : ${colors.bsColor3};
    justify-content: center;
    padding-top: 10px;
    padding-left: 35%;
    font-size: 16px;
    font-weight: 900;
  }
  .coName {
    
  }

  .noticeName{
    
  }
  .tag {
    
  }
  .regdate {
    justify-content: center;
    padding-left: 25%;
    padding-top: 3%;
  }

  &:hover {
    box-shadow: 0.5rem 0.5rem 0.5rem ${colors.bsColor0};
  }

  cursor: pointer;
`;



// 검색 div

// 태그를 담을 div box
const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 70px;
  column-gap: 10px;
  
  padding: 0px 20px 0px 20px;
`;
// 태그 하나하나의 div
const TagItemBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-size: 15px;
  padding : 0px 8px 0px 8px;
  background-color: ${colors.bsColor2};
  width: fit-content;
  height: 30px;
`;




const SearchAlignDiv = styled.div`
  
`


//검색 input

const SearchInput = styled.input`
  width: 500px;
  height: 40px;
  border : 2px solid ${colors.bsColor2};
  border-radius: 20px;
  padding-left: 10px;
  margin-left: 20%;
  :focus {
    
    outline: auto;
    outline-color: ${colors.bsColor3};
    
    
    
    
  }
  /* ::-webkit-input-placeholder{text-align:center} */
  

  
`;

const SearchButton = styled.div`
  
  position: absolute;
  top: 0;
  right: 15px;
  
  
`;

const Label = styled.label`
  position : relative;
`

// 아이템 나누기
const ItemGrid = styled.div`
  
  font-weight: 600;
  width: ${props => props.width};
  height: ${props => props.height};
  display: flex;
  justify-content: center;
  text-align: center;

  
  margin-left: ${props => props.marginLeft};
  margin-top: ${props => props.marginTop};
  font-size: 20px;
  background-color: ${props => props.backgrounColor};
`;

const ItemGrid2 = styled.div`
  width: 100px;
  height: 200px;
  display: flex;
  justify-content: center;
`;

// 전체 영역 , pages에 60% 걸어둠
const Wrapper = styled.div`
  width: 100%;
`;
// 카드 여러개 map 해주는 style div
const ListTotal = styled.div`
  
  height: 100%;
  display: flex;
  margin-bottom: 10%;
  row-gap: 80px;
  column-gap: 47px;
  flex-wrap: wrap;
`;
//셀렉트
const ProgressSelect = styled.select`
  background-color: ${colors.bsColor1};
  margin-left: 10px;
  border : 2px solid ${colors.bsColor2};
  width: 150px;
  text-align: center;
  outline-color: ${colors.bsColor2};


  :focus {
    border : 2px solid ${colors.bsColor1};
  }
  option {
    background-color: ${colors.bsColor1};
  }
`


// 자소서 작성 버튼
const CreateButton = styled.div`
  border-radius: 10px;
  box-shadow: 0.1rem 0.1rem 0.1rem ${colors.bsColor4};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  background-color: ${colors.bsColor3};
  border-radius: 5px;
  font-size: 18px;
  color : ${colors.bsColor1};

  :hover {
    background-color: ${colors.bsColor2};
    box-shadow: 0.2rem 0.2rem 0.2rem ${colors.bsColor3};
  }
`;


// const ButtonImg = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 200px;
//   height: 200px;
//   object-fit: cover;
//   position: fixed;
//   left: 85%;
//   top: 63%;
//   cursor: pointer;
//   border-radius: 70%;
//   background-color:  ${colors.bsColor2};
// `;

// const ButtonImg2 = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width : 150px;
//   height: 150px;
//   border-radius: 70%;
//   background-color: white;
//   font-size: 100px;
// `
const ButtonImg3 = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  position: fixed;
  left: 88%;
  top: 73%;

`;

ButtonImg3.defaultProps = {
  src: plusbutton,
};


//테스트 버튼
const TestButton = styled.button`
  position: fixed;
  left: 82%;
  top : 65%;

  width: 300px;
  height: 300px;
  background-color: red;
`


const MyNoticeList = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState('');
  const [detailFlag, setDetailFlag] = useState(false);
  const [dropdownState, setDropdownState] = useState('전체보기');
  const [dummyData, setDummyData] = useState([]);

  useEffect(() => {
    getNoticeData();
  }, []);

  


  // axios get 하는 함수
  const getNoticeData = () => {
    axiosInstance
      .get(apis.notice)
      .then(response => {
        console.log([response.data], 'get해온값');
        setDummyData(response.data);
      })
      .catch(error => console.log(error));
  };

  const handleDropdownState = e => {
    setDropdownState(e.target.value);
  };

  // useEffect(() => {
  //   getItems();
  // }, [dropdownState]);

  // const getItems = () => {
  //   getNoticeData();
  //   if (dropdownState === '전체보기') {
      
  //     setDummyData(dummyData);
      
  //   }

  //   if (dropdownState === '진행중') {
      
  //     setDummyData(
  //       dummyData.filter(dummystate => dummystate.progress === '진행중'),
  //     );
  //   }
  //   if (dropdownState === '면접탈락') {
      
  //     setDummyData(
  //       dummyData.filter(dummystate => dummystate.progress === '면접탈락'),
  //     );
  //   }
  //   if (dropdownState === '서류탈락') {
      
  //     setDummyData(
  //       dummyData.filter(dummystate => dummystate.progress === '서류탈락'),
  //     );
  //   }
  //   if (dropdownState === '최종합격') {
      
  //     setDummyData(
  //       dummyData.filter(dummystate => dummystate.progress === '최종합격'),
  //     );
  //   }
    
  // };

  

  

  // 검색 함수

  const handleChangeSearch = e => {
    setSearchData(e.target.value);
  };

  // 검색 엔터 함수
  const keyDownSearch = e => {
    if (e.key === 'Enter') {
      setSearchData('');
    }
  };

  // 검색 버튼 클릭 함수

  const onClickSearch = () => {
    setSearchData('');
  };


  // 값을 디테일 페이지에 보내는 함수

  const onLinkDetail = async (e) => {
    e.preventDefault();
    navigate('/notice/detail', {
      state : {

      }
    });
  }

  return (
    <Wrapper>
      
      <br></br>
      <br></br>
      {/*자소서 작성 버튼을 우측 으로 하기위한 div */}
      {/* <div
        style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
      >
        <Link to="/notice/add" style={{ textDecoration: 'none' }}>
          <CreateButton id="contentFont">공고 추가</CreateButton>
        </Link>
      </div> */}
      
        <ProgressSelect
          id="contentFont"
          defaultValue="전체보기"
          onChange={handleDropdownState}
        >
          <option value="전체보기">전체보기</option>
          <option value="진행중">진행중</option>
          <option value="서류탈락">서류탈락</option>
          <option value="최종합격">최종합격</option>
          <option value="면접탈락">면접탈락</option>
          
        </ProgressSelect>
        <Label>
        <SearchInput
          onChange={handleChangeSearch}
          value={searchData}
          onKeyDown={keyDownSearch}
          placeholder="태그를 검색하세요." 
        ></SearchInput>
        <SearchButton className="searchbutton" onClick={onClickSearch}>🔍</SearchButton>
        </Label>
        <br></br>
        <br></br>
      
      <ListTotal>
        {dummyData.map((dummy, index) => (
          
            
              <ItemList key={index} onClick={()=>{navigate('/notice/detail',{
                state:{
                  noticeSeq : dummy.noticeSeq
                }
              })}}>
                {/* <ItemGrid className="regdate" id="titleFont" width="100%">
                  {dummy.regDate}
                </ItemGrid> */}
                <ItemGrid className="progress" id="titleFont" width="100%">
                  {dummy.progress}
                </ItemGrid>
                <ItemGrid className="coName"id="contentFont" width="250px" marginTop="40px" >
                  {dummy.coName}
                </ItemGrid>

                <ItemGrid className="noticeName" id="contentFont" width="250px" marginTop="20px">
                  {dummy.noticeName}
                </ItemGrid>
                <br></br>
                <TagBox>
                  {dummy?.noticeTag?.split(', ').map((tag, index) => (
                    <TagItemBox className="tag" id="contentFont" key={index}>
                      # {tag}
                    </TagItemBox>
                  ))}
                </TagBox>
                <br></br>

                
                <br></br>
              </ItemList>
            
          
        ))}
      </ListTotal>
      <Link to="/notice/add" style={{ textDecoration: 'none' }}>
        {/* <ButtonImg><ButtonImg2>➕</ButtonImg2>
      <FontAwesomeIcon size='4x' icon={faCirclePlus}></FontAwesomeIcon>

      </ButtonImg> */}
      <ButtonImg3></ButtonImg3>
      
      </Link>
    </Wrapper>
  );
};

export default MyNoticeList;
