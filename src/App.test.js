/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

global.matchMedia = global.matchMedia || function () {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

test('Home title', () => {
  render(<App />);
  const title = screen.getByText(/watches/i);
  expect(title).toBeInTheDocument();
});
