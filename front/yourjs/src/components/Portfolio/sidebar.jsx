import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';

const Bar = styled.div`
    width: 9rem; 
    height: fit-content;
    position: fixed; 
    top: 20%;
    margin-left: 83%; 
    color: #1E1E1E;
    background-color: #FFF;
    box-shadow: orange 0.1rem 0.2rem 0.5rem 0rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 5%;
    user-select: none;
    cursor: pointer;
`

const Sidebar = () => {
    return (
        <Bar>
            <Link to = '1' offset={-108}>
                <h3>인적사항</h3>
            </Link>
            <Link to = '2' offset={-108}>
                <h3>병역사항</h3>
            </Link>
            <Link to = '3' offset={-108}>
                <h3>학력사항</h3>
            </Link>
            <Link to = '4' offset={-108}>
                <h3>교육사항</h3>
            </Link>
            <Link to = '5' offset={-108}>
                <h3>자격증/어학</h3>
            </Link>
            <Link to = '6' offset={-108}>
                <h3>수상내역</h3>
            </Link>
            <Link to = '7' offset={-108}>
                <h3>커리어</h3>
            </Link>
            <Link to = '8' offset={-108}>
                <h3>프로젝트</h3>
            </Link>
        </Bar>
    )
}


export default Sidebar;