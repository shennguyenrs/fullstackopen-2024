import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';

test('render blog', () => {
  const blog = {
    title: 'Title 1',
    author: 'Author 1',
    url: 'https://example.com/1',
    likes: 0,
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText('Title 1 Author 1');
  expect(element).toBeDefined();
});

test("showing blog's url and likes when clicked on show button", async () => {
  const blog = {
    title: 'Title 1',
    author: 'Author 1',
    url: 'https://example.com/1',
    likes: 0,
    user: {
      name: 'Tester',
      username: 'tester',
    },
  };

  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText('View');
  await user.click(button);

  expect(screen.getByText('https://example.com/1')).toBeDefined();
  expect(screen.getByText('0 likes')).toBeDefined();
});
