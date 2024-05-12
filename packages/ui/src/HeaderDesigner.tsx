"use client"


import React from "react";
import InputElement from "./InputElement";
import type {DesignTemplate} from "web/state/schedule";

type HeaderDesignerProps = {
  designTemplate: DesignTemplate
  setMainHeader: (newHeader: string) => void
} & React.ComponentPropsWithoutRef<'section'>

const HeaderDesigner: React.FC<HeaderDesignerProps> = ({designTemplate, setMainHeader, ...props}) => {
  return <section {...props}>
    <InputElement
      label='Total days:'
      type='text'
      value={designTemplate.mainHeader}
      onInput={inputText =>
        setMainHeader(inputText?? '')}
    />
  </section>
}

export default HeaderDesigner
