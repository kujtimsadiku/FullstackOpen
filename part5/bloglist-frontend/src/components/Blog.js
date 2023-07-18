// Delete button will be added. I need to figure out where i call update 
// for updated blogs to be removed without refreshing the page.

// import blogService from "../services/blogs"

// const removeBlog = async blog => {
//   await blogService.remove(blog.id);
// }

const Blog = ({blog}) => (
  <div>
    {blog.title} - {blog.author}
    {/* <button onClick={() => removeBlog(blog)}>Delete</button> */}
  </div>  
)

export default Blog