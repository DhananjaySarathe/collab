import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { MixpanelProvider } from "@/components/MixpanelProvider";

export const metadata: Metadata = {
  title: "ChilledBeer Collab",
  description: "Founders, Builders, and Creators of Bangalore. Let's collaborate and ship."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MixpanelProvider>{children}</MixpanelProvider>
      </body>
    </html>
  );
}

