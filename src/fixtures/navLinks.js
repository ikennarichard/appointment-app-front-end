/* eslint-disable import/prefer-default-export */
import { v4 as uuidv4 } from 'uuid';

export const navLinks = [
  {
    id: uuidv4(),
    name: 'models',
    route: '/',
  },
  {
    id: uuidv4(),
    name: 'reservetion',
    route: '/newReservation',
  },
  {
    id: uuidv4(),
    name: 'My Reservestions',
    route: '/reservations',
  },
  {
    id: uuidv4(),
    name: 'add new car',
    route: '/newCar',
  },
  {
    id: uuidv4(),
    name: 'delete car',
    route: '/deleteCar',
  },
];
