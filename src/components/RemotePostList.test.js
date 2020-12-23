/* eslint-disable no-undef */
import React from 'react';
import {
  render, waitFor,
} from '@testing-library/react';
import RemotePostList from './RemotePostList';

global.matchMedia = global.matchMedia || function () {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

test('Global posts list page', async () => {
  const { getByText, getByTestId } = render(<RemotePostList />);
  const title = await waitFor(() => getByText(/Global news about watches/i));
  expect(title).toBeInTheDocument();
  const items = await waitFor(() => getByTestId('list'));
  expect(items).toBeInTheDocument();
});
