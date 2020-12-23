/* eslint-disable no-undef */
import React from 'react';
import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import LocalPostList from './LocalPostList';

global.matchMedia = global.matchMedia || function () {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

test('Local posts list title', () => {
  render(<LocalPostList />);
  const title = screen.getByText(/Local people talking about watches/i);
  expect(title).toBeInTheDocument();
});

test('Show modal on Create Post click', async () => {
  const { getByText } = render(<LocalPostList />);
  fireEvent.click(getByText(/Create/i));
  await waitFor(() => {
    const title = screen.getByLabelText(/New post/i);
    expect(title).toBeInTheDocument();
  });
});
