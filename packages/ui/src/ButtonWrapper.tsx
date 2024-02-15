"use client"
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { IconButton } from "@mui/material";
import {Template} from "web/state/schedule";
import React from "react";

type ButtonWrapperProps = {
  removeTemplate: (index: number) => void
  addTemplateAfter: (index: number, template: Template) => void
  template: Template
  index: number
}

const ButtonWrapper: React.FC<ButtonWrapperProps> = ({index, template, removeTemplate, addTemplateAfter}) => {
  return <div>
    <IconButton onClick={() => removeTemplate(index)}>
      <CancelRoundedIcon/>
    </IconButton>
    <IconButton onClick={() => addTemplateAfter(index, {date: template.date})}>
      <AddCircleRoundedIcon/>
    </IconButton>
  </div>
}

export default ButtonWrapper
