import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HealthLens AI — Understand Your Health Reports",
  description: "Patient-friendly AI health report assistant prototype."
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
