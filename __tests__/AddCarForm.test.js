import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { useDispatch as useDispatchMock, useSelector as useSelectorMock } from 'react-redux';
import { useNavigate as useNavigateMock, MemoryRouter } from 'react-router-dom';
import AddCarForm from '../src/components/cars/AddCarForm';

jest.mock('react-redux');
jest.mock('react-router-dom');

const useDispatch = useDispatchMock;
const useSelector = useSelectorMock;
const navigate = useNavigateMock;

describe('AddCarForm component', () => {
  const renderFormComponent = (mockState) => {
    useSelector.mockReturnValue(mockState);
    useDispatch.mockReturnValue(jest.fn());
    navigate.mockReturnValue(jest.fn());
    render(<AddCarForm />, { wrapper: MemoryRouter });
  };

  it('matches snapshot', () => {
    renderFormComponent({
      cars: [],
      loading: false,
      message: '',
      error: null,
      auth: { resource_owner: 1 },
    });

    const tree = renderer.create(<AddCarForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
