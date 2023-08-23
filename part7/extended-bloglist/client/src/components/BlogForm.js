import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleInput = (event) => {
    event.preventDefault()

    setTitle(event.target.value)
  }

  const handleAuthorInput = (event) => {
    event.preventDefault()

    setAuthor(event.target.value)
  }

  const handleUrlInput = (event) => {
    event.preventDefault()

    setUrl(event.target.value)
  }

  const handleBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <div>
        <h2>Create new</h2>
        <form onSubmit={handleBlog}>
          <div>
            title:
            <input
              id='title-input'
              value={title}
              onChange={handleTitleInput}/>
          </div>
          <div>
            author:
            <input
              id='author-input'
              value={author}
              onChange={handleAuthorInput}
            />
          </div>
          <div>
            url:
            <input
              id='url-input'
              value={url}
              onChange={handleUrlInput}
            />
          </div>
          <button className='create-btn' type='submit'>Create</button>
        </form>
      </div>
    </div>
  )
}

export default BlogForm