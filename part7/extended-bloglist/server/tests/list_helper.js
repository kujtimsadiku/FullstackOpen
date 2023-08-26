const dummy = (blogs) => 1;

const blogLikesReducer = (blogs) =>
  blogs === 1 ? blogs.likes : blogs.reduce((sum, blog) => sum + blog.likes, 0);

const mostLikes = (blogs) =>
  blogs.reduce((blog, currentBlog) =>
    currentBlog.likes > blog.likes ? currentBlog : blog,
  );

module.exports = {
  dummy,
  blogLikesReducer,
  mostLikes,
};
