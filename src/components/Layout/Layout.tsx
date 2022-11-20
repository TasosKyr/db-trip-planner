import React, { ReactNode } from "react";
import Footer from "../Footer";
import Image from "next/image";
import backgroundImage from "../../../public/assets/travel-background.jpg";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="!fixed !w-screen !h-screen !-z-1">
      {/* <div
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: "-1",
        }}
      > */}
        <Image
          src={backgroundImage}
          alt="Travel planning process"
          fill
          object-fit="cover"
        />
      </div>
      <main className="px-40 py-10 flex justify-center">{children}</main>
      <Footer />
    </>
  );
};
export default Layout;
