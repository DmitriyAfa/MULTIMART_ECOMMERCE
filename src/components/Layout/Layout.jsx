import React from "react";

// components
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

// router with components
import { Routers } from "../../routers/Routers";

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Routers />
      </main>
      <Footer />
    </>
  );
};
