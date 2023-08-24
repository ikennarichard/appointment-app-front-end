import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Layout from './components/Layout/layout';
import SignUp from './components/pages/sign_up';

import Car from './components/cars/Cars';
import CarDetails from './components/cars/CarDetails';
import AddCarForm from './components/cars/AddCarForm';
import DeleteCar from './components/cars/DeleteCar';

import AddReservation from './components/reservations/AddReservationForm';
import Reservation from './components/reservations/Reservations';

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Car />,
      },
      {
        path: 'car/:car_id',
        element: <CarDetails />,
      },
      {
        path: 'newCar',
        element: <AddCarForm />,
      },
      {
        path: 'deleteCar',
        element: <DeleteCar />,
      },
      {
        path: 'car/:carId/add_reservation',
        element: <AddReservation />,
      },
      {
        path: 'newReservation',
        element: <AddReservation />,
      },
      {
        path: 'reservations',
        element: <Reservation />,
      },
    ],
  },

  {
    path: 'signup',
    element: <SignUp />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
