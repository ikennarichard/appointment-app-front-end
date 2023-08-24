import { useLocation, Link } from 'react-router-dom';

export default function CarDetails() {
  const { state } = useLocation();

  const details = {
    ...state,
  };

  return (
    <section>
      <h2 className="car_model">{state.car_model}</h2>
      <img src={state.photo} alt={`a nice ${state.car_model}`} />
      <p>{state.description}</p>
      <b>{`Reservation Price: ${state.reservation_price}`}</b>
      <Link
        to="add_reservation"
        state={details}
      >
        <button type="button">
          Reserve
        </button>
      </Link>
    </section>
  );
}
