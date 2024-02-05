"use client";

import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import * as React from "react";

type ApplicationFrameProps = {
  children?: React.ReactNode
}

const ApplicationFrame: React.FC<ApplicationFrameProps> = ({children}) => {

  return <LocalizationProvider dateAdapter={AdapterDayjs}>
    {children}
  </LocalizationProvider>
}

export default ApplicationFrame
