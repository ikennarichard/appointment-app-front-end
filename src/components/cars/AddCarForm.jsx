import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCar } from '../../redux/cars/apiSlice';

export default function AddCarForm() {
  const resourceOwner = useSelector((state) => state.auth.resource_owner);
  const { message, error } = useSelector((state) => state.cars);

  const [carDetails, setCarDetails] = useState({
    car_model: '',
    description: '',
    photo: '',
    reservation_price: 0,
    user_id: resourceOwner.id,
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userId = resourceOwner.id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addCar({ userId, details: carDetails }));
  };

  useEffect(() => {
    if (message === 'Car was added successfully') navigate('/');
  }, [message, navigate, error]);

  return (
    <div>
      <h2>Create a New Car</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="car_model">
            Car Model:
            <input
              type="text"
              name="car_model"
              value={carDetails.car_model}
              onChange={handleChange}
              id="car_model"
              required
            />
          </label>
        </div>
        <br />
        <div className="field">
          <label htmlFor="description">
            Description:
            <textarea
              name="description"
              value={carDetails.description}
              onChange={handleChange}
              id="description"
              required
            />
          </label>
        </div>
        <br />
        <div className="field">
          <label htmlFor="photo">
            Photo URL:
            <input
              type="text"
              name="photo"
              value={carDetails.photo}
              onChange={handleChange}
              placeholder="enter a valide image url"
              id="photo"
              required
            />
          </label>
        </div>
        <div className="field">
          <label htmlFor="reservation_price">
            Reservation Price:
            <input
              type="number"
              name="reservation_price"
              value={carDetails.reservation_price}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
}
