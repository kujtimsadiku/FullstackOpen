
const BlogForm = ({
	username,
	handleTitle,
	handleAuthor,
	handleUrl,
	handleSubmit
}) => {
	return (
		<div>
			<h1>Blogs</h1>
			{loggedIn(user.username)}
			<div>
				<Notification message={message} errorMessage={errorMessage}/>
				<h2>Create new</h2>
				<form onSubmit={handleSubmit}>
					<div className="blog-form">
						title: 
						<input
							value={newBlog.title}
							onChange={handleTitle}/>
					</div>
					<div>
						author: 
						<input
							value={newBlog.author}
							onChange={handleAuthor}
						/>
					</div>
					<div>
						url
						<input
							value={newBlog.url}
							onChange={handleUrl}
						/>
					</div>
					<button className="create-btn" type="submit">Create</button>
				</form>
				{blogs.map((blog) => {
				if (blog.user && blog.user.username && blog.user.username === user.username) {
					return <Blog key={blog.id} blog={blog} />;
				} else {
					return null;
				}
			})}
			</div>
		</div>
	);
};

export default BlogForm