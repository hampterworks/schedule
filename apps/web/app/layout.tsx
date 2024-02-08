import "./globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import ApplicationFrame from "@repo/ui/ApplicationFrame";


const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Goom schedule generator",
  description: "Generate streaming schedules with time zone and discord support",
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
    <ApplicationFrame>
      <body className={inter.className}>{children}</body>
    </ApplicationFrame>
    </html>
  );
}
