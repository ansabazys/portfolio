import type { Metadata } from "next";
import CrtLayoutWrapper from "@/components/CrtLayoutWrapper";
import "./globals.css";
import { TraqoryProvider } from "@/components/providers/TraqoryProvider";

export const metadata: Metadata = {
  title: "Ansab Azys",
  description: "Boot into AnsabOS - Ansab's developer portfolio, styled as a retro Linux GRUB bootloader screen with interactive command terminals and retro system logs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col justify-center items-center font-mono bg-black text-white px-[21px] pt-[29px] pb-[20px]">

        <TraqoryProvider />
        <CrtLayoutWrapper>{children}</CrtLayoutWrapper>
      </body>
    </html>
  );
}
