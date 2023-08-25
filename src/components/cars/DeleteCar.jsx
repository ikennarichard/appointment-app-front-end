/* eslint-disable consistent-return */
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteCar, getCars } from '../../redux/cars/apiSlice';
import { removeFromCars, clearCarMessages } from '../../redux/cars/carsSlice';
import CentralComponent from '../Layout/CentralComponent';

export default function DeleteCar() {
  const {
    cars,
    loading,
    message,
    error,
  } = useSelector((state) => state.cars);
  const resourceOwner = useSelector((state) => state.auth.resource_owner);
  const dispatch = useDispatch();
  const userId = resourceOwner.id;

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch, userId]);

  // delete messages after a while
  useEffect(() => {
    if (message || error) {
      setTimeout(() => dispatch(clearCarMessages()), 1000);
      return () => clearTimeout();
    }
  }, [error, message, dispatch]);

  function handleDelete(id) {
    dispatch(deleteCar({ userId, carId: id }));
    dispatch(removeFromCars(id));
  }

  const getUserCars = (allCars, userId) => allCars.filter((car) => car.user_id === userId);
  const userCars = getUserCars(cars, userId);

  return (
    <div>
      <CentralComponent />
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      {cars.length === 0 ? (
        <p>No cars available.</p>
      ) : (
        <div>
          {userCars.length === 0 ? (
            <p>
              You have no cars.
              <Link to="/newCar">Add car</Link>
            </p>
          ) : (
            <ul>
              {userCars.map((car) => (
                <div key={car.id}>
                  <br />
                  <li>
                    <img src={car.photo} alt={`a nice ${car.car_model}`} />
                    <p>{car.car_model}</p>
                    <button
                      type="button"
                      onClick={() => handleDelete(car.id)}
                    >
                      Delete car
                    </button>
                  </li>
                  <br />
                </div>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
