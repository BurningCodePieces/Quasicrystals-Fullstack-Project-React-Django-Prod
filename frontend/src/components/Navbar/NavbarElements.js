import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
 

export const Nav = styled.nav`
    background: #000;
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem calc((100vw-1000px)/2);
    z-index: 10;
`

export const Bars = styled(FaBars)`
    display: none;
    color: #fff;

    @media screen and (max-width: 768px){
        display: block;
        position: absolute;
        right: 20px;
        top: 22px;
        trasform: translate(-100%, 75%);
        font-size: 2rem;
        cursor: pointer;
    } 
`

export const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 0.7rem;
    height: 100%;
    cursor: pointer;

    &.active{
        color: #15cdfc !important;
    }

    &:hover{
        color:lightblue;
    }

    & img {
        height:60px;
        background-color:#000000;
        border-radius:10px;
        margin-left:2px;
        padding: 0 30px;
        border: 1px solid white;
    }
    
    & img:hover {
        border: 3px solid white;
    }
`

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;

    @media screen and (max-width: 768px){
        display:none;
    }

`

export const NavMenuNonAuth = styled.div`
    display: flex;
    align-items: center;
    padding: 0 0 0 20px ;

    @media screen and (max-width: 768px){
        display:none;
    }

`

export const NavBtn = styled.nav`
    display:flex;
    align-items: center;
    margin-right: 24px;

    @media screen and (max-width: 768px){
        display:none
    }
`

export const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #256ce1;
    padding: 10px 22px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover{
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`
