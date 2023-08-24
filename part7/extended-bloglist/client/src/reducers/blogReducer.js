import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      const id = updatedBlog.id;
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog));
    },
    removeBlog(state, action) {
      const id = action.payload.id;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions;

// maybe add message also in parameter same as at part 6 redux expect to intializeBLog

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

export const updateLike = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(blog.id, blog);
    dispatch(updateBlog(updateBlog));
  };
};

export const blogToRemove = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch(removeBlog(blog));
  };
};

export default blogSlice.reducer;
