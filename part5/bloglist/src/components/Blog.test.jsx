import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
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
