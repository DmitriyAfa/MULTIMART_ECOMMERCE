import React from "react";

// components
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

// route
import { Routers } from "../../routers/Routers";
import { useLocation } from "react-router-dom";

// admin
import { AdminNav } from "../../admin";

export const Layout = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname.startsWith("/dashboard") ? <AdminNav /> : <Header />}

      <main>
        <Routers />
      </main>
      <Footer />
    </>
  );
};
