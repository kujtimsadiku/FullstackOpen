// Delete button will be added. I need to figure out where i call update 
// for updated blogs to be removed without refreshing the page.
// solution is to update the useState
import { useState } from "react"

// import blogService from "../services/blogs"

// const removeBlog = async blog => {
//   await blogService.remove(blog.id);
// }


const Blog = ({blog, updateBlogLikes}) => {
  const [visible, setVisible] = useState(false);


	const hideWhenVisible = { display: visible ? 'none' : '' };
	const showWhenVisible = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	}

  const handleLikes = () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }

    updateBlogLikes(blog.id, blogToUpdate);
  }

  return (
  <div id="viewing-model">
    <div style={hideWhenVisible}>
      {blog.title} - {blog.author}
      <button onClick={toggleVisibility}>view</button>
    </div>
    <div style={showWhenVisible}>
      {blog.title} - {blog.author}
      <button onClick={toggleVisibility}>hide</button>
      <div>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button onClick={handleLikes}>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
    {/* <button onClick={() => removeBlog(blog)}>Delete</button> */}
  </div>  
)}

export default Blog