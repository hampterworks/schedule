"use client"

import React from "react";
import styled from "styled-components";


const RequiredLabelWrapper = styled.div`
    height: 14px;
    font-size: 14px;


`

const LabelContainer = styled.div`
    height: 14px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 4px;

    span {
        color: red;
    }
`

type RequiredLabelProps = {
  requiredTitle?: React.ReactNode
}

const RequiredLabel: React.FC<RequiredLabelProps> = ({requiredTitle}) => {
  return <>
    {
      <LabelContainer>
        <span>*</span>
        {
          requiredTitle !== undefined
            ? requiredTitle
            : 'This field is required'
        }
      </LabelContainer>
    }
  </>
}

export default RequiredLabel
