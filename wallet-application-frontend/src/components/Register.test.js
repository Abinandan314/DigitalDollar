import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Register from "./Register";

const mockStore = configureStore([]);

describe("Register component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      message: {
        message: "",
      },
    });
  });

  it("should render the component without errors", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );

    const usernameField = screen.getByTestId('username-field');
    const passwordField = screen.getByTestId('password-field');
    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();

  });

  test("should display error messages when fields are not filled out correctly", async () => {
    render(
        <Provider store={store}>
          <MemoryRouter>
            <Register />
          </MemoryRouter>
        </Provider>
      );
    // Fill out the form with invalid input
    fireEvent.change(screen.getByTestId("username-field"), { target: { value: "u" } });
    fireEvent.change(screen.getByTestId("email-field"), { target: { value: "sample@gmaul.com" } });
    fireEvent.change(screen.getByTestId("password-field"), { target: { value: "password" } });
    fireEvent.click(screen.getByText("Sign Up"));

    // Check that error messages are displayed for each field
    await waitFor(() => {
      expect(screen.getByText("The username must be between 3 and 20 characters.")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByTestId("username-field"), { target: { value: "username" } });
    fireEvent.change(screen.getByTestId("email-field"), { target: { value: "sample" } });
    fireEvent.change(screen.getByTestId("password-field"), { target: { value: "password" } });
    fireEvent.click(screen.getByText("Sign Up"));

    await waitFor(() => {
        expect(screen.getByText("This is not a valid email.")).toBeInTheDocument();
      });

    fireEvent.change(screen.getByTestId("username-field"), { target: { value: "username" } });
    fireEvent.change(screen.getByTestId("email-field"), { target: { value: "sample@gmail.com" } });
    fireEvent.change(screen.getByTestId("password-field"), { target: { value: "p" } });
    fireEvent.click(screen.getByText("Sign Up"));

    await waitFor(() => {
        expect(screen.getByText("The password must be between 6 and 40 characters.")).toBeInTheDocument();
      });
  });
  test("should display success message when form is submitted with valid input", async () => {

    render(
        <Provider store={store}>
          <MemoryRouter>
            <Register />
          </MemoryRouter>
        </Provider>
      );
    // Fill out the form with valid input
    fireEvent.change(screen.getByTestId("username-field"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByTestId("email-field"), { target: { value: "testuser@example.com" } });
    fireEvent.change(screen.getByTestId("password-field"), { target: { value: "password123" } });
    fireEvent.click(screen.getByText("Sign Up"));

  });
});
