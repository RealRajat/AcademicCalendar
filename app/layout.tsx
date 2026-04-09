import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wall Calendar — Interactive Date Planner",
  description:
    "A beautiful interactive wall calendar with day range selection, integrated notes, holiday markers, and stunning monthly imagery. Built with Next.js.",
  keywords: ["calendar", "planner", "date picker", "notes", "interactive"],
  openGraph: {
    title: "Wall Calendar — Interactive Date Planner",
    description: "A polished interactive wall calendar with range selection and notes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
