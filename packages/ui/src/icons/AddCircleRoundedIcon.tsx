"use client"

import React from "react";
import styled from "styled-components";

type AddCircleRoundedIconProps = React.ComponentPropsWithoutRef<'svg'>

const AddCircleRoundedIcon: React.FC<AddCircleRoundedIconProps> = ({...props}) => {
  return <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    height='24px'
    width='24px'
    {...props}
  >
    <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm4,11H13v3a1,1,0,0,1-2,0V13H8a1,1,0,0,1,0-2h3V8a1,1,0,0,1,2,0v3h3a1,1,0,0,1,0,2Z"/>
  </svg>
}

export default AddCircleRoundedIcon
