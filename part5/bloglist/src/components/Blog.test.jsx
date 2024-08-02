import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';
import BlogForm from '../components/BlogForm';

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

test('render blog', () => {
  render(<Blog blog={blog} handleLike={() => { }} handleDelete={() => { }} />);

  const element = screen.getByText('Title 1 Author 1');
  expect(element).toBeDefined();
});

test("showing blog's url and likes when clicked on show button", async () => {
  render(<Blog blog={blog} handleLike={() => { }} handleDelete={() => { }} />);

  const user = userEvent.setup();
  const button = screen.getByText('View');
  await user.click(button);

  expect(screen.getByText('https://example.com/1')).toBeDefined();
  expect(screen.getByText('0 likes')).toBeDefined();
});

test('clicking like button twice and event handler call twice', async () => {
  const mockHandler = vi.fn();

  render(<Blog blog={blog} handleLike={mockHandler} handleDelete={() => { }} />);

  const user = userEvent.setup();
  const viewBtn = screen.getByText('View');
  await user.click(viewBtn);

  const likeBtn = screen.getByText('Like');
  await user.click(likeBtn);
  await user.click(likeBtn);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test('clicking add new blog', async () => {
  const mockHandler = vi.fn((e) => {
    e.preventDefault();
  });

  render(<BlogForm handleSaveBlog={mockHandler} />);

  const user = userEvent.setup();
  const titleInput = screen.getByRole('textbox', { name: 'Title:' });
  const authorInput = screen.getByRole('textbox', { name: 'Author:' });
  const urlInput = screen.getByRole('textbox', { name: 'URL:' });

  await user.type(titleInput, 'Title 1');
  await user.type(authorInput, 'Author 1');
  await user.type(urlInput, 'https://example.com/1');

  const submitBtn = screen.getByText('Create');
  await user.click(submitBtn);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][1]).toEqual({
    title: 'Title 1',
    author: 'Author 1',
    url: 'https://example.com/1',
  });
});
