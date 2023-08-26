import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from '../components/BlogForm';

describe('<BlogForm /> component test', () => {
  test('Callback function return correct values for creating blog', async () => {
    const createBlogMockFn = jest.fn();
    const user = userEvent.setup();

    const component = render(<BlogForm createBlog={createBlogMockFn} />);

    const titleInput = component.container.querySelector('#title-input');
    const authorInput = component.container.querySelector('#author-input');
    const urlInput = component.container.querySelector('#url-input');

    const createButton = screen.getByText('Create');

    expect(titleInput).toBeInTheDocument();
    expect(authorInput).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();
    expect(createButton).toBeInTheDocument();

    await user.type(titleInput, 'TestTitle');
    await user.type(authorInput, 'TestAuthor');
    await user.type(urlInput, 'www.test.com');

    await user.click(createButton);

    expect(createBlogMockFn.mock.calls).toHaveLength(1);
    expect(createBlogMockFn.mock.calls[0][0].title).toBe('TestTitle');
    expect(createBlogMockFn.mock.calls[0][0].author).toBe('TestAuthor');
    expect(createBlogMockFn.mock.calls[0][0].url).toBe('www.test.com');
  });
});
