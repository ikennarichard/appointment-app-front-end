/* eslint-disable consistent-return */
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signin } from '../../../redux/auth/authSlice';
import styles from './signIn.module.css';

export default function SignIn() {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  // handle sign in inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle sign in
  const handleSignin = async (e) => {
    e.preventDefault();
    dispatch(signin(userDetails));
  };

  return (
    <main
      className={`${styles.bg} h-100 d-flex justify-content-center align-items-center flex-column`}
    >
      {loading && <div>Loading...</div>}
      <h1 className="text-center text-white display-1 fw-bold">The New BMW Z4</h1>
      <section className={styles['login-form']}>
        <form method="post" onSubmit={handleSignin} className={styles.form}>
          <div className={styles['input-field']}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              value={userDetails.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles['input-field']}>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              value={userDetails.password}
              onChange={handleChange}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className={styles['sign-in-btn']}>
            Sign In
          </button>
        </form>

        <div className="links mt-3">
          <p className="text-white mb-1">Not yet a user? please sign up</p>
          <Link to="signup" className={`${styles['sign-up-link']} text-white`}>
            Sign up
          </Link>
        </div>
      </section>
    </main>
  );
}
