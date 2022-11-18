import React, { ReactNode } from "react";
import Footer from "../Footer";
import Image from "next/image";
import backgroundImage from "../../../public/assets/travel-background.jpg";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  console.log(backgroundImage);
  return (
    <>
      <main>{children}</main>
      <div style={{position: "fixed", zIndex: "-1", width: "100vw", height: "100vh"}}>
        <Image
          src={backgroundImage}
          alt="Travel planning process"
          layout="fill"
          objectFit="cover"
        />
      </div>
      {/* <div className="bg-scroll bg-my_bg_image h-[972px]"></div> */}
      <Footer />
    </>
  );
};
export default Layout;
