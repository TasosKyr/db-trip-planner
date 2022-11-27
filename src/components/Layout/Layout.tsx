import React, { ReactNode } from "react";
import Footer from "../Footer";
import Image from "next/image";
import backgroundImage from "../../../public/assets/travel-background.jpg";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
      <div className="!fixed !w-screen !h-screen !-z-1 min-h-screen overflow-hidden bg-custom-img">
        <main className="px-30  flex justify-center z-200 pb-40 h-[95%] overflow-y-auto text-sm sm:text-md">
          {children}
        </main>
        <Footer />
      </div>
  );
};
export default Layout;
