/*eslint-disable*/
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCars } from "../../redux/cars/apiSlice";
import { Link } from "react-router-dom";
import { getUsername } from "../../redux/auth/authSlice";

export default function Car() {
  const { cars, loading, status } = useSelector((state) => state.cars);
  const { resource_owner } = useSelector((state) => state.auth);
  const { username } = useSelector((state) => state.auth);

  const userId = resource_owner.id
  const dispatch = useDispatch();

  useEffect(() => {
    if (!status) dispatch(getCars());
    username ? username : dispatch(getUsername( userId ))
  }, [dispatch]);

  const isLoading = loading && <p>Loading...</p>;

  return (
    <div>
      {isLoading}
     
      {cars ?
      <section>
        <h2>Latest Cars</h2>
        <p>Please select a car</p>
        <ul>
          {cars.map((car) => (
            <li key={car.id}>
            <Link 
              to={`car/${car.id}`}
              state={car}
            >
                <figure>
                  <img src={car.photo} alt={`image of ${car.car_model}`} />
                  <figcaption>{car.car_model}</figcaption>
                </figure>
              
            </Link>
            <div className="social_links">
            <a href="https://facebook.com">facebook-icon</a>
            <a href="https://twitter.com">twitter-icon</a>
            <a href="https://instagram.com">instagram-icon</a>
          </div>
          <br/>
          </li>
              ))
          }
        </ul>
      </section>
      :
        <div>
          <p>No car available!</p>
          <Link to='add_car'>
            <button type="button">Add a Car</button>
          </Link>
        </div>
      }      
    </div>
  );
}