import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Layout from './components/Layout/layout';
import SignUp from './components/pages/signUp/sign_up';
import Car from './components/cars/Cars';
import CarDetails from './components/cars/CarDetails';
import AddCarForm from './components/cars/AddCarForm';

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
        path: 'reservations',
        element: <div>Reservations</div>,
      },
      {
        path: 'newReservation',
        element: <div>Create reservation</div>,
      },
      {
        path: 'reservations/:id',
        element: <div>Rese</div>,
      },
      {
        path: 'newCar',
        element: <div>Create new car</div>,
      },
      {
        path: 'deleteCar',
        element: <div>Delete car</div>,
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
