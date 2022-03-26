import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import { AuthStatus } from "./Login/auth";

const Layout = () => {
  return (
    <>
      <header>
        <h1>LOGIN AND PRAY MOTHERFUCKER</h1>
        <AuthStatus />
      </header>
      <main>
        <Outlet />
      </main>
      <footer> 2022 Maxat Nukhayev</footer>
    </>
  );
};
export default Layout;
