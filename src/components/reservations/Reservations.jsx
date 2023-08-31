import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getReservations, deleteReservation } from '../../redux/reservations/apiSlice';
import { removeFromReservations } from '../../redux/reservations/reservationsSlice';
import { getCars } from '../../redux/cars/apiSlice';
import styles from './reservations.module.css';
import CentralComponent from '../Layout/CentralComponent';

export default function Reservation() {
  const { reservations, loading } = useSelector((state) => state.reservation);
  const { cars } = useSelector((state) => state.cars);
  const resourceOwner = useSelector((state) => state.auth.resource_owner);
  const dispatch = useDispatch();

  const userId = resourceOwner.id;

  const [reservedCars, setReservedCars] = useState({});
  const [reservedCarPhotos, setReservedCarPhotos] = useState({});

  useEffect(() => {
    dispatch(getReservations(resourceOwner.id));
    dispatch(getCars(userId));
  }, [dispatch, userId, resourceOwner]);

  const handleDelete = (userId, reservationId) => {
    dispatch(deleteReservation({ userId, reservationId }));
    dispatch(removeFromReservations(reservationId));
  };

  useEffect(() => {
    const carDetails = {};
    const carPhotos = {};
    cars.forEach((car) => {
      carDetails[car.id] = car.car_model;
      carPhotos[car.id] = car.photo;
    });
    setReservedCars(carDetails);
    setReservedCarPhotos(carPhotos);
  }, [cars]);

  const isLoading = loading && <p>Loading...</p>;

  return (
    <div className="mt-5 d-flex flex-column gap-4">
      <h1 className="text-center fw-bold display-5">Reservations</h1>
      <CentralComponent />
      {isLoading && <div>Loading...</div>}
      {reservations.length === 0 ? (
        <div>
          No reservations click link to
          <Link to="/newReservation">Add Reservation</Link>
        </div>
      ) : (
        <ul className="list-unstyled px-lg-5 px-3">
          {reservations.map((item) => (
            <li key={item.id} className={styles['reservation-item']}>
              <div className={styles['image-container']}>
                <img
                  src={`${reservedCarPhotos[item.car_id]}`}
                  alt={`a nice ${reservedCars[item.car_id]}`}
                  className={styles.image}
                />
              </div>
              <div className={styles['reservation-details']}>
                <p className="m-0 fs-1 fw-bold">{reservedCars[item.car_id]}</p>
                <hr className={styles['horizontal-line']} />
                <div className="m-0">
                  <span>City: </span>
                  <span>{item.city}</span>
                </div>
                <div className="m-0 text-break">
                  <span>Reservation Date: </span>
                  <span>{item.date}</span>
                </div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(resourceOwner.id, item.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
