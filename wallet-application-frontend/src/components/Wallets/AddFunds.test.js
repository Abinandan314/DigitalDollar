import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import AddFunds from './AddFunds';

jest.mock('axios');

describe('AddFunds', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders AddFunds component', () => {
    const onClose = jest.fn();
    const stat = jest.fn();
    const wallet = { username: 'testuser' };
    render(<AddFunds onClose={onClose} stat={stat} wallet={wallet} />);
    expect(screen.getByText('Add Funds')).toBeInTheDocument();
    expect(screen.getByLabelText('Amount:')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  test('submits add funds form successfully', async () => {
    const tokenItem = sessionStorage.getItem("token");
    var token;
    if(tokenItem != null){
        token = tokenItem.substring(1,tokenItem.length-1);
    }
    const onClose = jest.fn();
    const stat = jest.fn();
    const wallet = { username: 'testuser' };
    render(<AddFunds onClose={onClose} stat={stat} wallet={wallet} />);

    const amountInput = screen.getByLabelText('Amount:');
    fireEvent.change(amountInput, { target: { value: '10' } });

    axios.post.mockResolvedValueOnce({ data: { balance: 100 } });

    fireEvent.submit(screen.getByText('Add Funds'));

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/wallets/testuser/balance', { balance: "10" },{
      headers:{
        "Authorization" : `Bearer ${token}`
    }
    });
    expect(await axios.post).toHaveBeenCalledTimes(1);
    // expect(onClose).toHaveBeenCalledTimes(1);
    const backButton = screen.getByText('Back')
    fireEvent.click(backButton);
    expect(onClose).toHaveBeenCalledTimes(1);

    expect(stat).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Back')).toBeInTheDocument();
  });
});
