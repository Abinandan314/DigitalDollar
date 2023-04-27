import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TransferFunds from './TransferFunds';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import thunk from 'redux-thunk';

jest.mock('axios');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  auth: {
    user: {
      username: "testUser",
    },
  },
  message: {
    message: '',
  },
});

describe('TransferFunds component', () => {
  let onClose, stat;
  beforeEach(() => {
    onClose = jest.fn();
    stat = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the TransferFunds component', () => {
    render(
      <Provider store={store}>
        <TransferFunds onClose={onClose} stat={stat} />
      </Provider>
    );
    expect(screen.getByText('Transfer Funds!')).toBeInTheDocument();
  });

  it('should transfer funds successfully', async () => {
    const tokenItem = sessionStorage.getItem("token");
    var token;
    if(tokenItem != null){
        token = tokenItem.substring(1,tokenItem.length-1);
    }
    const response = { data: 'Success' };
    axios.post.mockResolvedValue(response);

    render(
      <Provider store={store}>
        <TransferFunds onClose={onClose} stat={stat} />
      </Provider>
    );

    const usernameInput = screen.getByLabelText('Username');
    const amountInput = screen.getByLabelText('Amount');
    const transferButton = screen.getByText('Transfer Funds');

    fireEvent.change(usernameInput, { target: { value: "otherUser" } });
    fireEvent.change(amountInput, { target: { value: 100 } });

    fireEvent.click(transferButton);

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/wallets/testUser/transfer", {
      
      transferAmount: "100",
      username: "otherUser",
    },{
      headers:{
        "Authorization" : `Bearer ${token}`
    }
    });
    expect(stat).toHaveBeenCalledTimes(1);

  });

//   it('should show an error message if transfer fails', async () => {
//     const postSpy = jest.spyOn(axios, 'post').mockRejectedValueOnce({ response: { data: {}, status: 400 } });

//     render(
//       <Provider store={store}>
//         <TransferFunds onClose={onClose} stat={stat} />
//       </Provider>
//     );

//     const usernameInput = screen.getByLabelText('Username');
//     const amountInput = screen.getByLabelText('Amount');
//     const transferButton = screen.getByText('Transfer Funds');

//     fireEvent.change(usernameInput, { target: { value: 'testUser' } });
//     fireEvent.change(amountInput, { target: { value: 100 } });
//     fireEvent.click(transferButton);

//     expect(postSpy).toHaveBeenCalledWith(`http://localhost:8080/wallets/${store.getState().auth.user.username}/transfer`, {
//       senderUsername: store.getState().auth.user.username,
//       username: 'testUser',
//       transferAmount: 100,
//     });
//     expect(screen.getByText('Funds Transfer Not completed')).toBeInTheDocument();
//     expect(onClose).not.toHaveBeenCalled();
//     expect(stat).not.toHaveBeenCalled();
//   });
});
