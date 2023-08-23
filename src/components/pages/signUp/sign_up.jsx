/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup, clearError } from '../../../redux/auth/authSlice';
import styles from './signUp.module.css';
import signInStyles from '../signIn/signIn.module.css';

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
        dispatch(clearError());
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
    <div
      className={`${styles.bg} h-100 d-flex justify-content-center align-items-center flex-column text-white`}
    >
      {loading && <p>Loading....</p>}
      <h1 className="display-1 fw-bold mb-3 text-center">Choose Your Type Of Car</h1>
      <form
        method="post"
        onSubmit={handleSignup}
        className={`${styles.login_form} d-flex flex-column gap-3`}
      >
        <div className={signInStyles['input-field']}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter Full Name"
            value={userDetails.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className={signInStyles['input-field']}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={userDetails.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={signInStyles['input-field']}>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={userDetails.password}
            onChange={handleChange}
            pattern=".{6,8}"
            required
            title="6 to 8 characters"
          />
        </div>

        <div className={signInStyles['input-field']}>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            placeholder="Confirm password"
            value={userDetails.password_confirmation}
            onChange={handleChange}
            pattern=".{6,8}"
            required
            title="6 to 8 characters"
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className={`${signInStyles['sign-in-btn']} w-100`}>
          Sign Up
        </button>
      </form>
      <div className={`${styles.sign_in_link} w-25`}>
        <p className="mb-0">If your already registerd please use the link below to sign in</p>
        <Link to="/" className={styles.sign_in_btn}>
          Sign in
        </Link>
      </div>
    </div>
  );
}
