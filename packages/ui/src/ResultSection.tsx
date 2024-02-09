"use client"

import styled from "@emotion/styled";
import React, {useState} from "react";
import {Snackbar} from "@mui/material";

const ResultWrapper = styled.div`
    pre {
        position: relative;
    }
`

const ButtonWrapper = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    position: absolute;
    top: calc(50% - 12px);
    right: 24px;

    padding: 4px;
    border-radius: 2px;
    border: 1px solid gray;

    opacity: 0.2;

    &:hover {
        opacity: 1;
    }
`

type ResultSectionProps = {
  header: string
  text: string
} & React.ComponentPropsWithoutRef<'div'>

const ResultSection: React.FC<ResultSectionProps> = ({header, text, ...props}) => {
  const [copyNotice, setCopyNotice] = useState<string | null>(null)

  const handleClick = () => {
    navigator.clipboard.writeText(`${header} ${text}`)
      .then(() => setCopyNotice("Text copied successful!"))
      .catch(error => setCopyNotice("Failed to copy text!"))
  }

  return <ResultWrapper {...props}>
    <h2>{header}</h2>
    <pre>
      {text}
      <ButtonWrapper onClick={handleClick}>Copy</ButtonWrapper>
    </pre>
    {
      copyNotice !== null &&
      <Snackbar
        open={true}
        autoHideDuration={2000}
        onClose={() => setCopyNotice(null)}
        message={copyNotice}
      />
    }
  </ResultWrapper>
}


export default ResultSection
