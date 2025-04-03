import React from "react";
import { useContext } from "react";
import { userContext } from "../App";
import { Link } from "react-router-dom";

export default function Header({ displayNavLinks }) {
  const { user } = useContext(userContext);
  const { isAdmin } = user;
  return (
    <>
      <div className='navbar-container'>
        <div className='brand-container'>
          <h3 className='brand-name'>Brand Name</h3>
        </div>
        {displayNavLinks && (
          <div className='nav-link-container'>
            <Link
              to='/'
              className='nav-link'>
              Main
            </Link>
            {isAdmin && (
              <Link
                to='/addTournament'
                className='nav-link'>
                Add tournemants
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
