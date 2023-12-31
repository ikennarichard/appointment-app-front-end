import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

export default function CarDetails() {
  const { state } = useLocation();
  const resourceOwner = useSelector((state) => state.auth.resource_owner);

  const details = {
    ...state,
  };

  return (
    <section id="car-details-container" className="container">
      <div className="row gap-4">
        <div className="show-car-image-container">
          <img src={state.photo} alt={`a nice ${state.car_model}`} className="img-fluid" />
        </div>
        <div className="d-flex flex-column gap-2">
          <h1 className="display-5 fw-medium m-0">{state.car_model}</h1>
          <div>
            <span>Description: </span>
            <span>{state.description}</span>
          </div>
          <b>{`Reservation Price: $${state.reservation_price}`}</b>
          <div>
            {state.user_id === resourceOwner.id ? (
              ''
            ) : (
              <Link to="add_reservation" state={details} className="car-details-btn">
                Reserve
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
