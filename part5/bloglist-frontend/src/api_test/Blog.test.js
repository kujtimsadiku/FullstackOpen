import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import Togglable from '../components/Togglable'


describe('<Blog /> component test', () => {
  const blog = {
    title: 'Kujtim',
    author: 'testKuite',
    url: 'www.test.com',
    likes: 5,
    user: {
      username: 'usernameTest',
      name: 'Name'
    }
  }

  const updateLikesMockFn = jest.fn();
  const removeBlogMockFn = jest.fn();

  let component;

  beforeEach(() => {
    component = render(
        <Blog key={blog.id} blog={blog} updateBlogLikes={updateLikesMockFn} removeBlog={removeBlogMockFn}/>
    );
  })

  test('Renders Title and Author', () => {
    expect(component.container).toHaveTextContent(
      'Kujtim - testKuite'
    );
  });

  test('The view button click to display url and likes', () => {
    const button = component.getByText('view');
    userEvent.click(button);

    // url
    expect(component.container).toHaveTextContent('www.test.com');
    // likes
    expect(component.container).toHaveTextContent('5');
    // users name
    expect(component.container).toHaveTextContent('Name');
  });

  test('Like button pressed few times', async () => {
    const viewBtn = component.getByText('view');
    userEvent.click(viewBtn);

    const likeBtn = screen.getByText('like');
    await userEvent.click(likeBtn);
    await userEvent.click(likeBtn);

    expect(updateLikesMockFn).toHaveBeenCalledTimes(2);
  });
})