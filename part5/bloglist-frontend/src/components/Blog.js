// Delete button will be added. I need to figure out where i call update
// for updated blogs to be removed without refreshing the page.
// solution is to update the useState
import { useState } from 'react'

const Blog = ({ blog, updateBlogLikes, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikes = () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }

    updateBlogLikes(blog.id, blogToUpdate)
  }

  return (
    <div id='viewing-model'>
      <div style={hideWhenVisible}>
        { blog.title } - { blog.author }
        <button onClick={toggleVisibility} style={{ marginLeft: '4px' }}>view</button>
      </div>
      <div style={showWhenVisible}>
        { blog.title } - { blog.author }
        <button onClick={toggleVisibility} style={{ marginLeft: '4px' }}>hide</button>
        <div>
          <div>{ blog.url }</div>
          <div>
            Likes: { blog.likes }
            <button onClick={handleLikes} style={{ marginLeft: '4px' }}>like</button>
          </div>
          <div>{ blog.user.name }</div>
        </div>
        <button onClick={() => removeBlog(blog)}>Remove</button>
      </div>
    </div>
  )
}

export default Blog