import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function TournamentsSharedLayout() {
  // TODO: Design a navlink contains two NavLink, one for bracket, other for setting<Admin access only>.
  return (
    <>
      <div className='tournament-navbar-container'>
        <NavLink to={`bracket`}>Bracket</NavLink>
        <NavLink to={`settings`}>Settings</NavLink>
      </div>
      <Outlet />
    </>
  );
}
