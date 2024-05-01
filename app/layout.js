import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./Provider";
import "@smastrom/react-rating/style.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Food",
  description: "Developed by Web Mastery",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
