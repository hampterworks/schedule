'use client'

import * as React from "react";
import Distribution from "../icons/Distribution";
import {Distribution as DataDistribution, DistributionFn} from "web/state/schedule";
import styled from "styled-components";

const TitleContainer = styled.div`
    margin: 0 0 4px 4px;
    color: ${props => props.theme.textColor};
    font-size: 13px;
    white-space: nowrap;
`

type DistributionPickerProps = {
  dateDistribution: DataDistribution
  setDistributionAlignment: DistributionFn
} & React.ComponentPropsWithoutRef<'div'>


const DistributionPicker: React.FC<DistributionPickerProps> = ({dateDistribution, setDistributionAlignment, ...props}) => {

  return <div {...props}>
    <TitleContainer>Select Distribution</TitleContainer>
    <Distribution
      toggle={dateDistribution === 'list'}
      onSelected={(event) => {
        if (event === 'top') {
          setDistributionAlignment('list')
        } else if (event === 'bottom') {
          setDistributionAlignment('column')
        }
      }}
    />
  </div>
}
export default DistributionPicker
