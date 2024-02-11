"use client";

import * as React from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'

type ApplicationFrameProps = {
  children?: React.ReactNode;
}

const ApplicationFrame: React.FC<ApplicationFrameProps> = ({children}) => {
  return <LocalizationProvider dateAdapter={AdapterLuxon}>
    {children}
  </LocalizationProvider>
}

export default ApplicationFrame
