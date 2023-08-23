/* eslint-disable consistent-return */
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signin, clearError } from '../../redux/auth/authSlice';

export default function SignIn() {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const { error, loading, status } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

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
    if (status) {
      navigate(0);
    }
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Sign In</button>
      </form>

      <div className="links">
        <p>Not yet a user? please sign up</p>
        <Link to="signup">Sign up</Link>
      </div>
    </div>
  );
}
