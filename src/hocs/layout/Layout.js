import React from "react";
import Navbar from "../../components/navigation/navbar";
import { Footer } from "../../components/navigation/footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
