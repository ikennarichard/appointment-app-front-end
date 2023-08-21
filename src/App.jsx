import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import Layout from './components/Layout/layout';

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <div>Main page</div>,
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
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
