import type { Metadata } from "next";
import { ReactNode } from "react";
import { AppProvider } from "./providers";

export const metadata: Metadata = {
  title: "Notification App",
  description: "Campus notification platform",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
