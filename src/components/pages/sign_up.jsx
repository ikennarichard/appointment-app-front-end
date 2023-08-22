import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../redux/auth/authSlice';

export default function SignupForm() {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const { loading, status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.user);
  // const resource_owner = useSelector((state) => state.auth.resource_owner);

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
      {status && navigate('/')}
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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
