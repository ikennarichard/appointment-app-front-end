import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useDispatch as useDispatchMock, useSelector as useSelectorMock } from 'react-redux';
import Reservation from '../src/components/reservations/Reservations';

jest.mock('react-redux');

const useDispatch = useDispatchMock;
const useSelector = useSelectorMock;

describe('Car Component', () => {
  const mockReservations = [
    {
      id: 1,
      city: 'Lagos',
      date: '2023-10-13',
      car_id: 2,
      user_id: 45,
    },
    {
      id: 3,
      city: 'Lagos',
      date: '2023-10-13',
      car_id: 2,
      user_id: 107,
    },
  ];

  const renderReservationComponent = (mockState) => {
    useSelector.mockReturnValue(mockState);
    useDispatch.mockReturnValue(jest.fn());
    render(<Reservation />, { wrapper: MemoryRouter });
  };

  it('renders Add reservations link when there are no reservation', () => {
    renderReservationComponent({
      reservations: [],
      message: null,
      error: null,
      loading: false,
      auth: { resource_owner: 2 },
      cars: [],
    });

    const addReservation = screen.getByRole('link', { name: /Add Reservation/i });
    expect(addReservation).toBeInTheDocument();
  });

  it('renders reservations when available and resource owner exists', async () => {
    renderReservationComponent({
      reservations: mockReservations,
      loading: false,
      message: null,
      error: null,
      auth: { resource_owner: { id: 1 } },
      cars: [
        {
          id: 2,
          car_model: 'Audi',
          photo: 'audi-2.jpg',
          description: 'a nicer car',
        },
      ],
    });

    await waitFor(() => {
      const reserveLinks = screen.getAllByText('Lagos');
      expect(reserveLinks).toHaveLength(mockReservations.length);
    });
  });
});
