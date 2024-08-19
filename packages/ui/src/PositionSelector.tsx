import * as React from "react";
import {useCallback, useEffect, useMemo, useState} from "react";
import {BackgroundPosition} from "web/state/schedule";
import styled from "styled-components";

const PositionSelectorWrapper = styled.div`
    color: rgba(0, 0, 0, 0.6);
    font-size: 13px;
    > div {
        margin-bottom: 8px;
    }
`

const PositionSelectorContainer = styled.div`
    position: relative;
    height: 200px;
    width: 200px;
    background: #c5c5c5;
    border-radius: 4px;
`

const Selector = styled.div.attrs<{ x: string; y: string }>((props) => ({
  style: {
    top: props.y,
    left:props.x
  }
}))`
    position: absolute;
    cursor: pointer;
    height: 15px;
    width: 15px;
    border: 3px solid #575757;
    border-radius: 50%;
    transform: translate(-50%, -50%);
`
/**
 * Calculates the relative position of an event within the boundaries of a given element.
 *
 * @param {React.RefObject<HTMLDivElement>} ref - The reference to the HTMLDivElement.
 * @param {React.MouseEvent<HTMLDivElement> | MouseEvent} event - The event whose position needs to be calculated.
 * @returns {Object} - An object containing the relative position coordinates of the event within the element.
 */
const getElementPosition = (ref: React.RefObject<HTMLDivElement>, event: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
  const rect = ref.current!.getBoundingClientRect()
  return {
    x: Math.round(Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)) * 100),
    y: Math.round(Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.width)) * 100),
  }
}

/**
 * Object representing the props for the PositionSelector component.
 * @typedef {Object} PositionSelectorProps
 * @property {BackgroundPosition} backgroundPosition - The current background position.
 * @property {function} setBackgroundPosition - A function used to set the background position.
 * @property {React.ComponentPropsWithoutRef<'div'>} - Additional props for the div element.
 */
type PositionSelectorProps = {
  backgroundPosition: BackgroundPosition
  setBackgroundPosition: (backgroundPosition: BackgroundPosition) => void
} & React.ComponentPropsWithoutRef<'div'>

/**
 * Component that allows the user to select and change the background position.
 *
 * @component
 * @example
 * <PositionSelector backgroundPosition="center" setBackgroundPosition={setBackgroundPosition} />
 *
 * @param {Object} props - the props object
 * @param {string} props.backgroundPosition - the current background position
 * @param {Function} props.setBackgroundPosition - callback function to set the new background position
 */
const PositionSelector: React.FC<PositionSelectorProps> = ({backgroundPosition, setBackgroundPosition, ...props}) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const transformPosition = useMemo(() => {
    return backgroundPosition === 'center'
      ? {x: 50, y: 50}
      : {
        x: ((parseInt(backgroundPosition.split(' ')[0]?.replace('%', '') ?? '50') + 100) / 300) * 100,
        y: ((parseInt(backgroundPosition.split(' ')[1]?.replace('%', '') ?? '50') + 100) / 300) * 100
      }
  }, [backgroundPosition])

  const [position, setPosition] = useState(transformPosition)
  const [dragging, setDragging] = useState(false)

  const handleMouseDown = useCallback((event:  React.MouseEvent<HTMLDivElement>) => {
    const position = getElementPosition(ref, event)

    setPosition({
      x: position.x,
      y: position.y
    })

    setDragging(true)

  }, [])
  const handleMouseUp = useCallback(() => setDragging(false), [])


  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!dragging) {
        return
      }

      const position = getElementPosition(ref, event)

      setPosition({
        x: position.x,
        y: position.y
      })
    },
    [dragging])

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mousemove", handleMouseMove, {passive: true})
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [handleMouseMove])

  useEffect(() => {
    setBackgroundPosition(`${((position.x / 100) * 300 - 100).toString() + '%'} ${(((position.y / 100) * 300) - 100).toString() + '%'}`)
  }, [position])

  return <PositionSelectorWrapper>
    <div>Change Background Position</div>
    <PositionSelectorContainer
      ref={ref}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      {...props}
    >
      <Selector x={`${position.x}%`} y={`${position.y}%`}/>
    </PositionSelectorContainer>
  </PositionSelectorWrapper>

}

export default PositionSelector
