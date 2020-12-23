/* eslint-disable no-undef */
import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import LocalPostForm from './LocalPostForm';

global.matchMedia = global.matchMedia || function () {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

test('Post form modal create title', () => {
  render(<LocalPostForm visible />);
  const title = screen.getByLabelText(/New post/i);
  expect(title).toBeInTheDocument();
});

test('Post form modal edit title', () => {
  const dummyPost = {
    title: 'test',
    author: 'test',
    description: 'test',
    content: 'test',
  };
  render(<LocalPostForm visible post={dummyPost} />);
  const title = screen.getByLabelText(/Edit post/i);
  expect(title).toBeInTheDocument();
});

test('Post form modal inputs', () => {
  render(<LocalPostForm visible />);
  const label1 = screen.getByLabelText(/Title/i);
  const label2 = screen.getByLabelText(/Author/i);
  const label3 = screen.getByLabelText(/Source/i);
  const label4 = screen.getAllByLabelText(/Url/i);
  const label5 = screen.getByLabelText(/Description/i);
  const label6 = screen.getByLabelText(/Content/i);
  expect(label1).toBeInTheDocument();
  expect(label2).toBeInTheDocument();
  expect(label3).toBeInTheDocument();
  label4.forEach((lbl) => {
    expect(lbl).toBeInTheDocument();
  });
  expect(label5).toBeInTheDocument();
  expect(label6).toBeInTheDocument();
});
