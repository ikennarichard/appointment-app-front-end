import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/navbar';

function Layout() {
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

export default Layout;
