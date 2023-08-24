import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getReservations } from '../../redux/reservations/apiSlice';
import { getCars } from '../../redux/cars/apiSlice';

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

  useEffect(() => {
    const carDetails = {};
    const carPhotos = {};
    cars.forEach((car) => {
      carDetails[car.id] = car.car_model;
      carDetails[car.id] = car.photo;
    });
    setReservedCars(carDetails);
    setReservedCarPhotos(carPhotos);
  }, [cars]);

  const isLoading = loading && <p>Loading...</p>;

  return (
    <div>
      <h3>Reservations</h3>
      {isLoading && <div>Loading...</div>}
      {reservations.length === 0 ? (
        <div>
          No reservations
          click link to
          <Link to="newReservation">Add Reservation</Link>
        </div>
      ) : (
        <ul>
          {reservations.map((item) => (
            <li key={item.id}>
              <div>
                <img
                  src={`${reservedCarPhotos[item.car_id]}`}
                  alt={`a nice ${reservedCars[item.car_id]}`}
                />
                <p>{item.city}</p>
                <p>{item.date}</p>
                <p>{reservedCars[item.car_id]}</p>
              </div>
              <br />
            </li>
          ))}
        </ul>
      )}
    </div>

  );
}
