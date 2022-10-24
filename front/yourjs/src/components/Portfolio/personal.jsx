//인적사항
import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  width: 90%;
  background-color: #fdfcf5;
  padding: 1rem;
  margin: 1rem;
  box-shadow: 0.5rem 0.5rem 0.5rem gray;
`;

const Contents = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`

const LeftBox = styled.div`
  width: 30%;
`;

const RightBox = styled.div`
  width: 70%;
`;

export {Container, Contents, LeftBox, RightBox}

const Personal = () => {
  return (
    <Container>
        !! 인적사항
        <Contents>
            <LeftBox>이름</LeftBox>
            <RightBox>금동운 / 一二三 / Dongwoon Keum</RightBox>
        </Contents>
        <Contents>
            <LeftBox>E-mail</LeftBox>
            <RightBox>dcloud0820@gamil.com</RightBox>
        </Contents>
        <Contents>
            <LeftBox>기술스택</LeftBox>
            <RightBox>Python, Django. Java, Javascript, Typescript, React, R</RightBox>
        </Contents>
        <Contents>
            <LeftBox>외부 URL</LeftBox>
            <RightBox>https://github.com/Dongwoon0820</RightBox>
        </Contents>
    </Container>
  )
};

export default Personal;
