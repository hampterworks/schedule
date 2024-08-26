'use client'

import * as React from "react";
import Distribution from "../icons/Distribution";
import {Distribution as DataDistribution, DistributionFn} from "web/state/schedule";

type DistributionPickerProps = {
  dateDistribution: DataDistribution
  setDistributionAlignment: DistributionFn
} & React.ComponentPropsWithoutRef<'div'>


const DistributionPicker: React.FC<DistributionPickerProps> = ({dateDistribution, setDistributionAlignment, ...props}) => {

  return <div {...props}>
    <div>Select Alignment</div>
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
