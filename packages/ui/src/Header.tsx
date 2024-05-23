"use client"

import React from "react";
import ScheduleIcon from "./icons/ScheduleIcon";
import FillIcon from "./icons/FillIcon";
import {css} from "@emotion/react";
import Link from "next/link";
import styled from "@emotion/styled";
import GithubIcon from "./icons/githubIcon";

const HeaderWrapper = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid black;

    h1 {
        display: flex;
        align-items: center;
        font-size: 32px;
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
const iconStyle = css`height: 48px`

type HeaderProps = {} & React.ComponentPropsWithoutRef<'header'>

const Header: React.FC<HeaderProps> = ({...props}) => {
  return <HeaderWrapper>
    <h1>goom schedule</h1>
    <NavigationWrapper>
      <ul>
        <li>
          <Link href='/'>
            <ScheduleIcon $sx={iconStyle}/>
          </Link>
        </li>
        <li>
          <Link href='/design'>
            <FillIcon $sx={iconStyle}/>
          </Link>
        </li>
        <li>
          <a href='/https://github.com/goomworks/goomschedule' target='_blank' rel='noreferrer'>
            <GithubIcon $sx={css`height: 32px`}/>
          </a>
        </li>
      </ul>
    </NavigationWrapper>
  </HeaderWrapper>
}

export default Header
