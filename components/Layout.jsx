import React from "react";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Bill Sauers Photography</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
