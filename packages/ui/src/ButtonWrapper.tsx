"use client"
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import {IconButton} from "@mui/material";
import React from "react";
import styled from "@emotion/styled";

const ButtonContainer = styled.div`
    display: flex;
    flex-basis: 40px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

type ButtonWrapperProps<T> = {
  removeItemFunction: (index: number) => void
  addItemFunction: (index: number, template: T) => void
  template: T
  index: number
  hideAdd?: boolean
  hideRemove?: boolean
}

function ButtonWrapper<T>
({
   index,
   template,
   removeItemFunction,
   addItemFunction,
   hideAdd,
   hideRemove
 }: ButtonWrapperProps<T>) {
  return <ButtonContainer>
    {
      hideRemove !== true &&
      <IconButton onClick={() => removeItemFunction(index)}>
        <CancelRoundedIcon/>
      </IconButton>
    }
    {
      hideAdd !== true &&
      <IconButton onClick={() => addItemFunction(index, template)}>
        <AddCircleRoundedIcon/>
      </IconButton>
    }
  </ButtonContainer>
}

export default ButtonWrapper
