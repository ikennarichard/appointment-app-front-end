import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../navbar/navbar';
import SignIn from '../pages/signIn/sign_in';

function Layout() {
  const resourceOwner = useSelector((state) => state.auth.resource_owner);

  if (resourceOwner) {
    return (
      <div className="container-fluid h-100">
        <div className="row h-100">
          <Navbar />
          <main className="col-12 col-lg-9 col-md-7">
            <Outlet />
          </main>
        </div>
      </div>
    );
  }

  return <SignIn />;
}

export default Layout;
