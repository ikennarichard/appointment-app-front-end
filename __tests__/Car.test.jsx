/* eslint-disable react/prop-types */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useDispatch as useDispatchMock, useSelector as useSelectorMock } from 'react-redux';
import Car from '../src/components/cars/Cars';

jest.mock('react-redux');

jest.mock('swiper/react', () => ({
  Swiper: ({ children }) => <div data-testid="swiper-testid">{children}</div>,
  SwiperSlide: ({ children }) => (
    <div data-testid="swiper-slide-testid">{children}</div>
  ),
}));

jest.mock('swiper/modules', () => ({
  Navigation: () => null,
  Autoplay: () => null,
}));

jest.mock('swiper/css', () => jest.fn());
jest.mock('swiper/css/navigation', () => jest.fn());

const useDispatch = useDispatchMock;
const useSelector = useSelectorMock;

describe('Car Component', () => {
  const mockCars = [
    {
      id: 1,
      car_model: 'Audi',
      photo: 'audi-1.jpg',
      description: 'A nice car',
    },
    {
      id: 2,
      car_model: 'Audi',
      photo: 'audi-2.jpg',
      description: 'a nicer car',
    },
  ];

  const renderCarComponent = (mockState) => {
    useSelector.mockReturnValue(mockState);
    useDispatch.mockReturnValue(jest.fn());
    render(<Car />, { wrapper: MemoryRouter });
  };

  it('renders loading when cars are loading', () => {
    renderCarComponent({
      cars: [],
      loading: true,
      message: '',
      error: null,
    });

    const loadingText = screen.getByText(/Loading.../i);
    expect(loadingText).toBeInTheDocument();
  });

  it('renders no cars available message when cars are empty', () => {
    renderCarComponent({
      cars: [],
      loading: false,
      message: '',
      error: null,
      auth: { resource_owner: 1 },
    });

    const noCarAvailableText = screen.getByText(/No car available!/i);
    const addCarButton = screen.getByRole('button', { name: /Add a Car/i });
    expect(noCarAvailableText).toBeInTheDocument();
    expect(addCarButton).toBeInTheDocument();
  });

  it('renders cars when available and resource owner exists', async () => {
    renderCarComponent({
      cars: mockCars,
      loading: false,
      message: null,
      error: null,
      auth: { resource_owner: { id: 1 } },
    });

    await waitFor(() => {
      const carLinks = screen.getAllByRole('link', { name: /Audi/i });
      expect(carLinks).toHaveLength(mockCars.length);
    });
  });
});
