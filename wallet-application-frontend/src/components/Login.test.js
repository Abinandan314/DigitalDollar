import React from 'react';
import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { MemoryRouter } from "react-router-dom";

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Login from './Login';

const mockStore = configureStore([thunk]);

describe('Login', () => {
  let store;
  let history;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isLoggedIn: false,
      },
      message: {
        message: null,
      },
    });
    history = createMemoryHistory();
  });

  it('should render the login form', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const usernameField = screen.getByTestId('username-test');
    const passwordField = screen.getByTestId('password-test');
    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
  });

  it('should submit the login form with valid credentials', async () => {
    const loginData = {
      username: 'testuser',
      password: 'testpassword',
    };


    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByTestId('username-test'), { target: { value: loginData.username } });
    fireEvent.change(screen.getByTestId('password-test'), { target: { value: loginData.password } });
    fireEvent.submit(screen.getByTestId('login-form'));

    // Wait for the promise to resolve
    await Promise.resolve();
  });



  test("should display error messages when fields are not filled out correctly", async () => {
    render(
        <Provider store={store}>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </Provider>
      );
    // Fill out the form with invalid input
    fireEvent.change(screen.getByTestId("username-test"), { target: { value: "" } });
    fireEvent.change(screen.getByTestId("password-test"), { target: { value: "password" } });
    fireEvent.click(screen.getByText("Login"));

    // Check that error messages are displayed for each field
    await waitFor(() => {
      expect(screen.getByText("This field is required!")).toBeInTheDocument();
        
    });
  });

});