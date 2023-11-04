import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";
import "swiper/css";
import "swiper/css/free-mode";

import { Provider as ReduxProvider } from "@/redux/provider";
import ThemeProvider from "./themeProvider";
import { Navigation } from "@/components/navigation";
import { Modal } from "@/components/ui/modal";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`text-base text-text bg-background ${roboto.className}`}>
        <ReduxProvider>
          <ThemeProvider
            enableSystem
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <div className="flex gap-x-5 max-w-[1500px] mx-auto pt-10 px-5 pb-10 max-lg:flex-col max-lg:pt-5 max-lg:pb-[85px]">
              <Navigation />

              <div className="flex-1 flex flex-col gap-y-10 min-w-0">
                <div className="min-h-[calc(100vh-80px)] max-lg:min-h-[calc(100vh-105px)]">
                  {children}
                </div>

                <div className="text-sm text-secondaryText flex flex-col gap-y-2">
                  <div>
                    Data provided by{" "}
                    <a
                      href="https://www.themoviedb.org"
                      className="text-text hover:underline max-md:underline"
                    >
                      TMDB
                    </a>
                  </div>
                  <div>
                    Build on{" "}
                    <a
                      href="https://nextjs.org/"
                      className="text-text hover:underline max-md:underline"
                    >
                      Next.js
                    </a>
                  </div>
                  <div>
                    Source code in{" "}
                    <a
                      href="https://github.com/Ornashh/movieapp"
                      className="text-text hover:underline max-md:underline"
                    >
                      Github
                    </a>
                  </div>
                  <div>2023</div>
                </div>
              </div>
            </div>

            <Modal />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
