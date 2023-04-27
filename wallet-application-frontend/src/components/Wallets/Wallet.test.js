import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Wallet from './Wallet';

const mockStore = configureMockStore([thunk]);

jest.mock('axios');

describe('Wallet component', () => {
  let store;
  const initialState = {
    auth: {
      user: {
        username: 'testUser',
      },
    },
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders wallet information', async () => {
    const walletData = {
      username: 'testUser',
      totalBalance: 500,
    };
    const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: walletData });
    // axios.get.mockResolvedValue({ data: walletData });

    render(
      <Provider store={store}>
        <Wallet />
      </Provider>
    );

    await screen.findByText("$500");
    expect(getSpy).toHaveBeenCalledTimes(1);
    // expect(screen.getByText("testUser's Wallet")).toBeInTheDocument();
    // expect(axios.get).toHaveBeenCalledTimes(1);
    // expect(axios.get).toHaveBeenCalledWith(
    //   'http://localhost:8080/wallets/testUser'
    // );
    expect(screen.getByText('Total Balance:')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
  });

  it('displays Add Funds component when "Add Funds" button is clicked', async () => {
    const walletData = {
      username: 'testUser',
      totalBalance: 500,
    };
    axios.get.mockResolvedValue({ data: walletData });

    render(
      <Provider store={store}>
        <Wallet />
      </Provider>
    );

    const addFundsButton = screen.getByText('Add Funds');
    fireEvent.click(addFundsButton);

    expect(screen.getByText('Add Funds!')).toBeInTheDocument();
  });

//   it('displays Transfer Funds component when "Transfer Funds" button is clicked', async () => {
//     const walletData = {
//       username: 'testUser',
//       totalBalance: 500,
//     };
//     axios.get.mockResolvedValue({ data: walletData });

//     render(
//       <Provider store={store}>
//         <Wallet />
//       </Provider>
//     );

//     const transferFundsButton = screen.getByText('Transfer Funds');
//     fireEvent.click(transferFundsButton);

//     expect(screen.getByText('Transfer Funds!')).toBeInTheDocument();
//   });
});
