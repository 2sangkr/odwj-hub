import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_KR({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto",
});

export const metadata = {
  title: "오늘 뭐 하지?",
  description: "일상의 소소한 결정을 재미있게 해결해주는 미니앱 모음",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={notoSans.variable}>
      <body>{children}</body>
    </html>
  );
}
