/* eslint-disable consistent-return */
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCars } from '../../redux/cars/apiSlice';
import { clearCarMessages } from '../../redux/cars/carsSlice';
import { getUsername } from '../../redux/auth/authSlice';
import CentralComponent from '../Layout/CentralComponent';

export default function Car() {
  const {
    cars,
    loading,
    message,
    error,
  } = useSelector((state) => state.cars);
  const resourceOwner = useSelector((state) => state.auth.resource_owner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  // delete messages after a while
  useEffect(() => {
    if (message || error) {
      setTimeout(() => dispatch(clearCarMessages()), 600);
      return () => clearTimeout();
    }
  }, [error, message, dispatch]);

  // check for username (it must be there, else something is wrong)
  useEffect(() => {
    if (resourceOwner) dispatch(getUsername(resourceOwner.id));
  }, [dispatch, resourceOwner]);

  const isLoading = loading && <p>Loading...</p>;

  return (
    <div>
      <CentralComponent />
      {isLoading}
      {message && <p>{message}</p>}
      {(resourceOwner && cars.length > 0)
        ? (
          <section>
            <h2>Latest Cars</h2>
            <p>Please select a car</p>
            <ul>
              {cars.map((car) => (
                <li key={car.id}>
                  <Link
                    to={`car/${car.id}`}
                    state={car}
                  >
                    <figure>
                      <img src={car.photo} alt={`a ${car.car_model}`} />
                      <figcaption>{car.car_model}</figcaption>
                    </figure>

                  </Link>
                  <div className="social_links">
                    <a href="https://facebook.com">facebook-icon</a>
                    <a href="https://twitter.com">twitter-icon</a>
                    <a href="https://instagram.com">instagram-icon</a>
                  </div>
                  <br />
                </li>
              ))}
            </ul>
          </section>
        )
        : (
          <div>
            <p>No car available!</p>
            <Link to="newCar">
              <button type="button">Add a Car</button>
            </Link>
          </div>
        )}
    </div>
  );
}
