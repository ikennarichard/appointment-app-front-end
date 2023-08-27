import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CarDetails() {
  const { state } = useLocation();
  const resourceOwner = useSelector((state) => state.auth.resource_owner);

  const details = {
    ...state,
  };

  return (
    <section className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <img
            src={state.photo}
            alt={`a nice ${state.car_model}`}
            className="img-fluid rounded mb-4"
          />
        </div>
        <div className="col-lg-6">
          <h2 className="car_model mb-3">{state.car_model}</h2>
          {/* <img src={state.photo} alt={`a nice ${state.car_model}`} /> */}
          <p className="mb-4">{state.description}</p>
          <p className="mb-4">{`Reservation Price: ${state.reservation_price}`}</p>
          <Link
            to="add_reservation"
            className={`btn btn-primary btn-lg ${state.user_id !== resourceOwner.id ? 'd-block mx-auto' : ''}`}
            state={details}
          >
            Reserve
          </Link>

        </div>
      </div>
    </section>
  );
}
