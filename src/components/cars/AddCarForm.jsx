/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCar } from '../../redux/cars/apiSlice';
import { clearCarMessages } from '../../redux/cars/carsSlice';

export default function AddCarForm() {
  const resourceOwner = useSelector((state) => state.auth.resource_owner);
  const { message, error, loading } = useSelector((state) => state.cars);
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
    if (message === 'Car was added successfully') navigate(0);
  }, [message, navigate]);

  // delete messages after a while
  useEffect(() => {
    if (message || error) {
      setTimeout(() => dispatch(clearCarMessages()), 1000);
      return () => clearTimeout();
    }
  }, [error, message, dispatch]);

  return (
    <div id="new-car-container" className="d-flex flex-column align-items-center mt-5">
      <div className="messages">
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
        {loading && <p>{loading}</p>}
      </div>
      <h1 className="text-center display-5 fw-bold m-0">Create a New Car</h1>
      <form onSubmit={handleSubmit} className="form-container w-100 d-flex justify-content-center mt-2">
        <div className="d-flex flex-column gap-3 w-75 form-inputs-container">
          <div className="field">
            <input
              type="text"
              name="car_model"
              value={carDetails.car_model}
              onChange={handleChange}
              id="car_model"
              placeholder="Enter Car Model"
              required
              className="p-2 w-100 rounded-1 border-0"
            />
          </div>
          <div className="field">
            <textarea
              name="description"
              value={carDetails.description}
              onChange={handleChange}
              id="description"
              required
              placeholder="Enter Description"
              className="p-2 w-100 rounded-1 border-0"
            />
          </div>
          <div className="field">
            <input
              type="text"
              name="photo"
              value={carDetails.photo}
              onChange={handleChange}
              placeholder="Enter a Valid Image URL"
              id="photo"
              required
              className="p-2 w-100 rounded-1 border-0"
            />
          </div>
          <div className="field">
            <input
              type="number"
              name="reservation_price"
              id="reservation_price"
              placeholder="Enter Reservation Price"
              value={carDetails.reservation_price}
              onChange={handleChange}
              required
              className="p-2 w-100 rounded-1 border-0"
            />
          </div>
          <button type="submit" className="p-2 w-100 rounded-1 border-0 add-car-btn">
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
}
