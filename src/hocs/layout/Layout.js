import React from "react";
import Navbar from "../../components/navigation/navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
