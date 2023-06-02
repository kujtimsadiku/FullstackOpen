const dummy = (blogs) => 1;

const blogLikesReducer = (oneBlog) => 
	oneBlog === 1
		? oneBlog.likes
		: oneBlog.reduce((sum, blog) =>
			sum + blog.likes, 0);


			
module.exports = {
	dummy,
	blogLikesReducer,
}