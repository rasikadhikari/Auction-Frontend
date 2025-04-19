import React, { JSX } from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
