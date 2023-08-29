import React from 'react';
import { render } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CarDetails from '../src/components/cars/CarDetails';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  Link: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('CarDetails component', () => {
  it('renders car details correctly', () => {
    const mockLocationState = {
      car_model: 'Audi',
      photo: 'Audi.jpg',
      description: 'car description',
      reservation_price: 100,
      user_id: 4,
    };

    useLocation.mockReturnValue({ state: mockLocationState });
    useSelector.mockReturnValue({
      auth: { resource_owner: { id: 2 } },
    });

    const { getByText } = render(<CarDetails />);

    expect(getByText('Audi')).toBeInTheDocument();
    expect(getByText(/car description/i)).toBeInTheDocument();
    expect(getByText('Reservation Price: $100')).toBeInTheDocument();
  });

  it('does not render Reserve button for the car owner', () => {
    const mockLocationState = {
      car_model: 'Toyota',
      photo: 'car.jpg',
      description: 'car description',
      reservation_price: 100,
      user_id: 3,
    };

    useLocation.mockReturnValue({ state: mockLocationState });
    useSelector.mockReturnValue({
      auth: { resource_owner: { id: 3 } },
    });

    const { queryByText } = render(<CarDetails />);

    expect(queryByText('Reserve')).not.toBeInTheDocument();
  });
});
