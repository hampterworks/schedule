import "./globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import HydrationZustand from "./HydrationZustand";
import React from "react";
import ApplicationFrame from "@repo/ui/ApplicationFrame";
import Header from "@repo/ui/Header";
import Link from "next/link";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "GoomSchedule",
  description: "Generate streaming schedules with time zone and discord support",
};

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
