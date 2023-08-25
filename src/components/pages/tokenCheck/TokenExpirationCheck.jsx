import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetTokens } from "../../../redux/auth/authSlice";

const TokenExpirationCheck = () => {
  const dispatch = useDispatch();
  //function to auto-log out user when token expires
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const expiryTime = localStorage.getItem('expires_in');

    if (accessToken && expiryTime) {
      const currentTime = Date.now();
      if (currentTime > parseInt(expiryTime)) {
        dispatch(resetTokens());
      }
    }
  }, [dispatch]);
};

export default TokenExpirationCheck;