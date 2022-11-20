import React from 'react'
import FindNoticeItemList from './FindNoticeItemList'
import styled from 'styled-components'
import { useState } from 'react'



const Wrapper = styled.div`
    width: 100%;
`


const FindNoticeIndex = () => {
    const [list,setList] =useState([1,2]);

    
  return (


    <Wrapper>
        {list.map((form,index) => (<FindNoticeItemList key={index}></FindNoticeItemList>))}</Wrapper>
  )
}

export default FindNoticeIndex