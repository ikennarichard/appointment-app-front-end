/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable consistent-return */
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { addReservation } from '../../redux/reservations/apiSlice';
import { getCars } from '../../redux/cars/apiSlice';
import { clearResMessages } from '../../redux/reservations/reservationsSlice';
import styles from './reservations.module.css';
import CentralComponent from '../Layout/CentralComponent';

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
      setTimeout(() => dispatch(clearResMessages()), 2000);
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
    <div id={styles['add-reservation']}>
      <CentralComponent />
      {message && <p>{message}</p>}
      {error && <p className={styles['error-message']}>{error}</p>}
      <h1 className={`text-center display-5 fw-bold ${styles.title}`}>Add Reservation</h1>
      <form method="post" onSubmit={handleSubmit} className={styles['form-container']}>
        <div className={`d-flex flex-column gap-3 w-50 ${styles['form-inputs']}`}>
          <div>
            <input
              value={reservation.car_model}
              name="city"
              type="text"
              id="city"
              placeholder="Enter Your City"
              onChange={handleChange}
              required
              className="p-2 w-100 rounded-1 border-0"
            />
          </div>

          <div>
            <input
              type="date"
              name="date"
              value={reservation.date}
              id="reserve_date"
              placeholder="Enter Reserve Date"
              onChange={handleChange}
              required
              className="p-2 w-100 rounded-1 border-0"
            />
          </div>

          <div>
            <input
              type="text"
              name="user_id"
              id="username"
              placeholder="Enter Your Username"
              value={userName.toUpperCase()}
              readOnly
              className="p-2 w-100 rounded-1 border-0"
            />
          </div>

          <div>
            {state !== null ? (
              <select
                name="car_id"
                id="cars"
                value={state.id}
                onChange={handleChange}
                className="p-2 w-100 rounded-1 border-0"
              >
                <option value={state.id}>{state.car_model}</option>
              </select>
            ) : (
              <select
                name="car_id"
                id="cars"
                onChange={handleChange}
                className="p-2 w-100 rounded-1 border-0"
              >
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
            <button
              type="submit"
              className={`p-2 w-100 rounded-1 border-0 ${styles['reservation-submit-btn']}`}
            >
              Reserve Car
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
