import * as React from "react";
import styled from "@emotion/styled";
import {useCallback, useEffect, useMemo, useState} from "react";
import {BackgroundPosition, BackgroundSize, Color} from "web/state/schedule";

const PositionSelectorWrapper = styled.div`
    position: relative;
    height: 200px;
    width: 200px;
    border: 1px solid black;
`

const Selector = styled.div<{ x: string; y: string }>`
    position: absolute;
    cursor: pointer;
    top: ${(props) => props.y};
    left: ${(props) => props.x};
    height: 15px;
    width: 15px;
    border: 3px solid black;
    border-radius: 50%;
    transform: translate(-50%, -50%);
`

type PositionSelectorProps = {
  backgroundPosition: BackgroundPosition
  setBackgroundPosition: (backgroundPosition: BackgroundPosition) => void
} & React.ComponentPropsWithoutRef<'div'>

const PositionSelector: React.FC<PositionSelectorProps> = ({backgroundPosition, setBackgroundPosition, ...props}) => {
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

  const handleMouseDown = useCallback(() => setDragging(true), [])
  const handleMouseUp = useCallback(() => setDragging(false), [])

  const ref = React.useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!dragging) {
        return
      }

      const rect = ref.current!.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height

      setPosition({
        x: Math.round(Math.max(0, Math.min(1, x)) * 100),
        y: Math.round(Math.max(0, Math.min(1, y)) * 100)
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
    setBackgroundPosition(`${((position.x / 100) * 300 - 100).toString() + '%'} ${((position.y / 100) * 300 - 100).toString() + '%'}`)
  }, [position])

  return <PositionSelectorWrapper
    ref={ref}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    onMouseLeave={handleMouseUp}
    {...props}
  >
    <Selector x={`${position.x}%`} y={`${position.y}%`}/>
  </PositionSelectorWrapper>

}

export default PositionSelector
