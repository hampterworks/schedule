import "./globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import HydrationZustand from "./HydrationZustand";
import React from "react";
import ApplicationFrame from "@repo/ui/ApplicationFrame";
import Header from "@repo/ui/Header";
import Head from "next/head";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Hampter Schedule",
  description: "Generate streaming schedules with time zone and discord support",
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {
  return <html lang="en">
  <Head>
    <meta name="google-site-verification" content="lgaawbBW07t8QCZK3-U3IwFHKf34IuCV-8p5bvUGjGA"/>
    <meta property="og:image" content='/schedule/hampter.png'/>
  </Head>
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
