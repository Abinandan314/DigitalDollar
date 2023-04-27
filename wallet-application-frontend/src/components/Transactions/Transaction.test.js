import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Transaction from './Transaction';

const mockStore = configureMockStore();
const store = mockStore({
  auth: {
    user: {
      username: 'mainuser',
    },
  },
});

const mockResponse = [
  {
    id: 1,
    senderUsername: 'testuser',
    receiverUsername: 'otheruser',
    transferAmount: 10,
    createdAt: '2022-04-08T00:00:00.000Z',
  },
];

jest.mock('axios');

describe('Transaction component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should render table with transaction history', async () => {
    const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockResponse });
    // axios.get.mockResolvedValueOnce(mockResponse);

    render(
      <Provider store={store}>
        <Transaction />
      </Provider>
    );

    expect(screen.getByText('Transaction History')).toBeInTheDocument();

    // wait for data to be fetched and displayed
    console.log(getSpy);
    await screen.findByText('testuser');
    expect(getSpy).toHaveBeenCalledTimes(1);

    // check that transaction data is displayed correctly
    expect(screen.getByText('$ 10')).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();
  });

//   test('should show error message if API call fails', async () => {
//     jest.spyOn(axios, 'get').mockRejectedValueOnce({ message: 'API Error' });

//     render(
//       <Provider store={store}>
//         <Transaction />
//       </Provider>
//     );

//     expect(screen.getByText('Transaction History')).toBeInTheDocument();
//     const errorElement = await screen.findByText("API Error");
//     expect(errorElement).toBeInTheDocument();
//     // // wait for error message to be displayed
//     // await screen.findByText('API Error');

//     // expect(screen.getByText('API Error')).toBeInTheDocument();
//   });
});
