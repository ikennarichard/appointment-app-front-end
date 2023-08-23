import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteCar, getCars } from '../../redux/cars/apiSlice';
import { removeFromCars } from '../../redux/cars/carsSlice';

export default function DeleteCar() {
  const {
    cars,
    loading,
    message,
  } = useSelector((state) => state.cars);
  const resourceOwner = useSelector((state) => state.auth.resource_owner);
  const dispatch = useDispatch();
  const userId = resourceOwner.id;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch, userId]);

  function handleDelete(id) {
    dispatch(deleteCar({ userId, carId: id }));
    dispatch(removeFromCars(id));
    if (message === 'Car deleted successfully') {
      navigate('/');
    }
  }

  const getUserCars = (allCars, userId) => allCars.filter((car) => car.user_id === userId);

  const userCars = getUserCars(cars, userId);

  return (
    <div>
      {loading && <p>Loading...</p>}
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
                  <li><img src={car.photo} /></li>
                  <li>
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
