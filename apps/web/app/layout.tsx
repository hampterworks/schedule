import "./globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import HydrationZustand from "./HydrationZustand";
import React from "react";
import ApplicationFrame from "@repo/ui/ApplicationFrame";
import Header from "@repo/ui/Header";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  metadataBase: new URL('https://hampterworks.github.io/schedule/'),
  title: "Hampter Schedule",
  description: "Generate streaming schedules with time zone and discord support",
  openGraph: {
    images: '/hampter.png'
  },
  keywords:[
    'schedule',
    'streaming schedule',
    'vtuber schedule',
    'schedule generator',
    'streaming',
    'twitch schedule',
    'youtube schedule'
  ],
  verification:{
    google: "lgaawbBW07t8QCZK3-U3IwFHKf34IuCV-8p5bvUGjGA"
  }
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {
  return <html lang="en">
  <body className={inter.className}>
  <HydrationZustand>
    <ApplicationFrame>
      <Header/>
      {children}
    </ApplicationFrame>
  </HydrationZustand>
  </body>
  </html>
}

export default RootLayout
