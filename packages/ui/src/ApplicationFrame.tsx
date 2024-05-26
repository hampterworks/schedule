"use client"

import * as React from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'

/**
 * Props for the ApplicationFrame component.
 */
type ApplicationFrameProps = {
  children?: React.ReactNode;
}

/**
 * Represents the application frame component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The children components to render within the frame.
 * @returns {ReactElement} The rendered application frame component.
 */
const ApplicationFrame: React.FC<ApplicationFrameProps> = ({children}) => {
  return <LocalizationProvider dateAdapter={AdapterLuxon}>
    {children}
  </LocalizationProvider>
}

export default ApplicationFrame
