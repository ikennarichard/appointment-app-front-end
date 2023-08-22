/*eslint-disable*/
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../../redux/auth/authSlice';

export default function SignIn() {

  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const { resource_owner, loading, status } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // handle sign in inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(userDetails)
  };

  // handle sign in
  const handleSignin = async (e) => {
    e.preventDefault()
    console.log(userDetails)
    dispatch(signin(userDetails));
    if (status) {
      navigate(0)
    }
  };

  // handle sign out
  const handleSignout = () => {
    dispatch(resetTokens());
    navigate('/')
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      <h2>RENTZ</h2>
      <form method="post" onSubmit={handleSignin}>
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
            />
          </label>
        </div>

        <button type="submit">Sign In</button>
      </form>

      <div className='links'>
        <p>Not yet a user? please sign up</p>
        <Link to='signup'>Sign up</Link>
      </div>
    </div>
)}