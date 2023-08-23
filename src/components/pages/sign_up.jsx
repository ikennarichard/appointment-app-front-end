/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup, clearMessage } from '../../redux/auth/authSlice';

export default function SignupForm() {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const { loading, error } = useSelector((state) => state.auth);
  const resourceOwner = useSelector((state) => state.auth.resource_owner);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
    // go to homepage if theres a user
    if (resourceOwner) navigate('/');
  }, [error, dispatch, navigate, resourceOwner]);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.password_confirmation) {
      return;
    }

    dispatch(signup(userDetails));
  };

  return (
    <div>
      {loading && <p>Loading....</p>}
      <h2>RENTZ</h2>
      <form method="post" onSubmit={handleSignup}>
        <div className="input_field">
          <label htmlFor="username">
            Full Name:
            <input
              type="text"
              name="username"
              id="username"
              value={userDetails.username}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="input_field">
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              id="email"
              value={userDetails.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="input_field">
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              id="password"
              value={userDetails.password}
              onChange={handleChange}
              pattern=".{6,8}"
              required
              title="6 to 8 characters"
            />
          </label>
        </div>

        <div className="input_field">
          <label htmlFor="password_confirmation">
            Confirm password:
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              value={userDetails.password_confirmation}
              onChange={handleChange}
              pattern=".{6,8}"
              required
              title="6 to 8 characters"
            />
          </label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <p>If your already registerd please use the link below to sign in</p>
      <Link to="/">
        Sign in
      </Link>
    </div>
  );
}
