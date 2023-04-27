import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Cashback from './Cashback';
jest.mock('axios');
jest.mock('react-redux');

describe('Cashback', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selectorFn) =>
      selectorFn({
        auth: {
          user: {
            username: 'testuser',
          },
        },
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('displays a message when there are no cashbacks', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(<Cashback />);

    expect(screen.getByText('No cashbacks Found')).toBeInTheDocument();
  });

  test('displays the cashbacks in a table', async () => {
    const cashbacks = [    { id: 1,cashbackAmount: 10}];
    const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: cashbacks });
  
    render(<Cashback />);
  
    await waitFor(() => {
      expect(screen.getByText('Unclaimed Cashbacks')).toBeInTheDocument();
    });
  
    cashbacks.forEach((cashback) => {
      expect(screen.getByText(cashback.cashbackAmount)).toBeInTheDocument();
    });
  
    expect(getSpy).toHaveBeenCalledTimes(1);
  });
  

//   test('clicking refresh calls the API again', async () => {
//     const cashbacks = [
//       {
//         id: 1,
//         amount: 10,
//       },
//     ];
//     axios.get.mockResolvedValueOnce({ data: cashbacks }).mockResolvedValueOnce({ data: [] });
//     render(<Cashback />);

//     await waitFor(() => {
//       expect(screen.getByText('Unclaimed Cashbacks')).toBeInTheDocument();
//     });

//     const refreshButton = screen.getByText('Refresh');
//     userEvent.click(refreshButton);

//     await waitFor(() => {
//       expect(axios.get).toHaveBeenCalledTimes(2);
//       expect(screen.getByText('No cashbacks Found')).toBeInTheDocument();
//     });
//   });
});
