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

  test('Renders Title and Author', () => {
    component = render(
      <Blog key={blog.id} blog={blog} updateBlogLikes={updateLikesMockFn} removeBlog={removeBlogMockFn}/>
    );

    expect(component.container).toHaveTextContent(
      'Kujtim - testKuite'
    );
  });

  test('The view button click to display url and likes', () => {
    component = render(
      <Togglable>
        <Blog key={blog.id} blog={blog} updateBlogLikes={updateLikesMockFn} removeBlog={removeBlogMockFn}/>
      </Togglable>
    );

    const button = component.getByText('view');
    userEvent.click(button);

    screen.debug();

    expect(component.container).toHaveTextContent('www.text.com');
    expect(component.container).toHaveTextContent('5');
    }
  );
})