import React from 'react';
import { render,screen } from '@testing-library/react';
import Home from './Home';

describe('Home component', () => {
  test('renders without crashing', () => {
    render(<Home />);
  });

  test('displays the correct text in the first card', () => {
    render(<Home />);
    const text = screen.getByText('Add funds to your wallet using your preferred payment method.');
    expect(text).toBeInTheDocument();
  });

  test('displays the correct text in the second card', () => {
    render(<Home />);
    const text = screen.getByText('View your current balance and transaction history, and withdraw funds as needed.');
    expect(text).toBeInTheDocument();
  });

  test('displays the correct text in the third card', () => {
    render(<Home />);
    const text = screen.getByText('Transfer funds to other users of our e-wallet service, using their email address or mobile number.');
    expect(text).toBeInTheDocument();
  });
});
