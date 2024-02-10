"use client";
import React, {useEffect, useState} from "react"

const HydrationZustand: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [isHydrated, setIsHydrated] = useState(false)

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return <>{isHydrated ? <div>{children}</div> : null}</>
}

export default HydrationZustand
