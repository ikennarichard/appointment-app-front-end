/* eslint-disable consistent-return */
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { getCars } from '../../redux/cars/apiSlice';
import { clearCarMessages } from '../../redux/cars/carsSlice';
import { getUsername } from '../../redux/auth/apiSlice';
import 'swiper/css';
import 'swiper/css/navigation';
import './cars.css';
import facebook from '../../assets/car-list-facebook.svg';
import instagram from '../../assets/instagram.svg';
import twitter from '../../assets/car-list-twitter.svg';

export default function Car() {
  const { cars, loading, message, error } = useSelector((state) => state.cars);
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
    <div id="cars">
      {isLoading}
      {message && <p>{message}</p>}
      {resourceOwner && cars.length > 0 ? (
        <section className="cars-list-container">
          <div className="text">
            <h1 className="text-center fw-bold m-0 display-5 mb-2 text-uppercase">Latest Models</h1>
            <p className="text-center text_color_BDBDBD m-0 fs-5">Please select a car</p>
          </div>
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay
            slidesPerView={3}
            spaceBetween={50}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },

              992: {
                slidesPerView: 2,
              },

              1300: {
                slidesPerView: 3,
              },
            }}
          >
            {cars.map((car) => {
              console.log('CAR', car);
              return (
                <SwiperSlide key={car.id}>
                  <Link
                    to={`car/${car.id}`}
                    state={car}
                    className="w-100 d-inline-block d-flex flex-column justify-content-center align-items-center gap-4 text-decoration-none text-black"
                  >
                    <div className="circle-design">
                      <img src={car.photo} alt={car.car_model} className="image" />
                    </div>
                    <h2 className="text-center m-0">{car.car_model}</h2>
                    <hr className="horizontal-line" />
                    <p className="m-0 text-break">{car.description}</p>
                  </Link>
                  <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
                    <a href="https://facebook.com" className="icon-container">
                      <img src={facebook} alt="facebook" className="img-fluid" />
                    </a>
                    <a href="https://twitter.com" className="icon-container">
                      <img src={twitter} alt="twitter" className="img-fluid" />
                    </a>
                    <a href="https://instagram.com" className="icon-container">
                      <img src={instagram} alt="instgram" className="img-fluid" />
                    </a>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </section>
      ) : (
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
