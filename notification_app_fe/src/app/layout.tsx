import type { Metadata } from "next";
import { ReactNode } from "react";
import { AppProvider } from "./providers";
import { AppHeader } from "@/components/layout/AppHeader";

export const metadata: Metadata = {
  title: "Campus Notifications",
  description: "Stay informed about campus announcements and updates",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <AppHeader />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
