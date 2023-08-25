/* eslint-disable consistent-return */
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../navbar/navbar';
import SignIn from '../pages/signIn/sign_in';
import { clearMessage } from '../../redux/auth/authSlice';
import CentralComponent from './CentralComponent';

function Layout() {
  const resourceOwner = useSelector((state) => state.auth.resource_owner);
  const { error, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // delete messages after a while
  useEffect(() => {
    if (error || message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, message, dispatch]);

  if (resourceOwner) {
    return (
      <div className="container-fluid h-100">
        <CentralComponent />
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
