"use client"

import React from "react";
import ScheduleIcon from "./icons/ScheduleIcon";
import FillIcon from "./icons/FillIcon";
import Link from "next/link";
import GithubIcon from "./icons/githubIcon";
import styled, {css} from "styled-components";

const HeaderWrapper = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid ${props => props.theme.borderColor};
    
    background: ${props => props.theme.background};
    color: ${props => props.theme.textColor};
    
    svg {
        path {
            fill: ${props => props.theme.textColor};
        }
    }
    
    h1 {
        display: flex;
        align-items: center;
        font-size: clamp(22px, 1em, 30px);
        font-variant: small-caps;
        font-weight: bold;
    }
`
const NavigationWrapper = styled.nav`
    ul {
        display: flex;
        align-items: center;
        gap: 16px;
    }
`
const iconStyle = css`height: 28px`

type HeaderProps = {} & React.ComponentPropsWithoutRef<'header'>

/**
 * Header component for the Hampter Schedule application.
 * @param {Object} props - The props for the Header component.
 * @returns {React.Element} The rendered header component.
 */
const Header: React.FC<HeaderProps> = ({...props}) => {
  return <HeaderWrapper {...props}>
    <h1>Hampter Schedule</h1>
    <NavigationWrapper>
      <ul>
        <li>
          <Link href='/' aria-label="Home">
            <ScheduleIcon $sx={iconStyle}/>
          </Link>
        </li>
        <li>
          <Link href='/design' aria-label="Design">
            <FillIcon $sx={iconStyle}/>
          </Link>
        </li>
        <li>
          <a href='https://github.com/hampterworks/schedule' target='_blank' rel='noreferrer' aria-label="Github">
            <GithubIcon $sx={iconStyle}/>
          </a>
        </li>
      </ul>
    </NavigationWrapper>
  </HeaderWrapper>
}

export default Header
