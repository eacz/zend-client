import React from "react";
import Head from "next/head";
import Header from "./Header";

const Layout = (props) => {
  return (
    <>
      <Head>
        <title>Zend</title>
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/vomitive-logo.png" />
      </Head>

      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto">
          {" "}
          <Header />
          <main className="mt-20">{props.children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
