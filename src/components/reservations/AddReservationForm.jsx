/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable consistent-return */
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { addReservation } from '../../redux/reservations/apiSlice';
import { getCars } from '../../redux/cars/apiSlice';
import { clearResMessages } from '../../redux/reservations/reservationsSlice';

export default function AddReservation() {
  const resourceOwner = useSelector((state) => state.auth.resource_owner);
  const { error, message } = useSelector((state) => state.reservation);
  const cars = useSelector((state) => state.cars.cars);
  const userId = resourceOwner.id;
  const [selectedCarId, setSelectedCarId] = useState(null);
  const userName = localStorage.getItem('resource_name');
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [reservation, setReservations] = useState({
    city: '',
    date: '',
    user_id: resourceOwner.id,
    car_id: state !== null ? state.id : null,
  });

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  useEffect(() => {
    if (message === 'Reservation added successfully') navigate(0);
  }, [message, navigate]);

  // delete messages after a while
  useEffect(() => {
    if (message || error) {
      setTimeout(() => dispatch(clearResMessages()), 600);
      return () => clearTimeout();
    }
  }, [error, message, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservations((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSelectedCarId(reservation.car_id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      addReservation({
        userId,
        selectedCarId,
        details: reservation,
      }),
    );
  };

  const otherUserCars = cars.filter((car) => car.user_id !== resourceOwner.id);

  return (
    <div>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <h2>Add Reservation</h2>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">
            City:
            <input
              value={reservation.car_model}
              name="city"
              type="text"
              id="city"
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label htmlFor="reserve_date">
            Reserve Date:
            <input
              type="date"
              name="date"
              value={reservation.date}
              id="reserve_date"
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="user_id"
              id="username"
              value={userName.toUpperCase()}
              readOnly
            />
          </label>
        </div>

        <div>
          <label htmlFor="cars">Car details:</label>
          {state !== null ? (
            <select name="car_id" id="cars" value={state.id} onChange={handleChange}>
              <option value={state.id}>{state.car_model}</option>
            </select>
          ) : (
            <select name="car_id" id="cars" onChange={handleChange}>
              <option value="">Please select a car</option>
              {otherUserCars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.car_model}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <button type="submit">Reserve Car</button>
        </div>
      </form>
    </div>
  );
}
