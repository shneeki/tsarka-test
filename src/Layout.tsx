import * as React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="p-0 flex min-h-screen flex-col justify-between bg-tsarka-light-grey">
        <header className="h-16 bg-tsarka-dark-grey  flex items-center justify-center">
          <h1 className="font-medium text-3xl co">Tsarka test task</h1>
        </header>
        <main className="">
          <Outlet />
        </main>
        <footer className="h-16 bg-tsarka-indigo-light  flex items-center justify-center">
          2022 Maxat Nukhayev
        </footer>
      </div>
    </>
  );
};
export default Layout;
