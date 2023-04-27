import React from 'react';
import axios from 'axios';
import { render, fireEvent, waitFor ,screen} from '@testing-library/react';
import { useSnackbar } from 'notistack';
import CashbackItem from './CashbackItem';

jest.mock('axios');
jest.mock('notistack');

describe('CashbackItem component', () => {
  let cashback = { id: 1, cashbackAmount: 50 };
  let refreshClick = jest.fn();

  beforeEach(() => {
    useSnackbar.mockReturnValue({ enqueueSnackbar: jest.fn() });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call claim cashback API when the Claim button is clicked', async () => {
    const axiosPostSpy = jest.spyOn(axios, 'post').mockResolvedValue({});

    render(<CashbackItem cashback={cashback} refreshClick={refreshClick} />);

    const claimButton = screen.getByRole('button');
    fireEvent.click(claimButton);

    await waitFor(() => {
      expect(axiosPostSpy).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
        expect(axiosPostSpy).toHaveBeenCalledWith(`http://localhost:8080/cashbacks/${cashback.id}`);
      });
      await waitFor(() => {
        expect(refreshClick).toHaveBeenCalledTimes(1);
      });
  });
});
