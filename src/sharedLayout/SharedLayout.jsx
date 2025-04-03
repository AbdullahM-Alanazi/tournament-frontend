import React from "react";
import Header from "../component/Header";
import { Outlet } from "react-router-dom";
import Copyright from "../component/CopyRight";
export default function SharedLayout() {
  return (
    <>
      <Header displayNavLinks={true} />
      <Outlet />
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  );
}
