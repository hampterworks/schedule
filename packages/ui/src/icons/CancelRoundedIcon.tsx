"use client"

import React from "react";
import styled from "styled-components";

type CancelRoundedIconProps = React.ComponentPropsWithoutRef<'svg'>

const CancelRoundedIcon: React.FC<CancelRoundedIconProps> = ({...props}) => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#000"
    width="24px"
    height="24px"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      d="M16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM21.961 12.209c0.244-0.244 0.244-0.641 0-0.885l-1.328-1.327c-0.244-0.244-0.641-0.244-0.885 0l-3.761 3.761-3.761-3.761c-0.244-0.244-0.641-0.244-0.885 0l-1.328 1.327c-0.244 0.244-0.244 0.641 0 0.885l3.762 3.762-3.762 3.76c-0.244 0.244-0.244 0.641 0 0.885l1.328 1.328c0.244 0.244 0.641 0.244 0.885 0l3.761-3.762 3.761 3.762c0.244 0.244 0.641 0.244 0.885 0l1.328-1.328c0.244-0.244 0.244-0.641 0-0.885l-3.762-3.76 3.762-3.762z"></path>

  </svg>
}

export default CancelRoundedIcon
