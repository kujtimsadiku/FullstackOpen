import { createSlice } from "@reduxjs/toolkit";
import { blogService } from "../services/blogs";
import { showNotificationWithTimeout } from "./notificationReducer";

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
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog,
      );
    },
    removeBlog(state, action) {
      const id = action.payload.id;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      console.log(newBlog);
      dispatch(appendBlog(newBlog));
      dispatch(
        showNotificationWithTimeout(
          `A new blog ${newBlog.title} by ${newBlog.author}`,
          "success",
          3,
        ),
      );
    } catch {
      dispatch(
        showNotificationWithTimeout(
          "Error trying to create new blog",
          "error",
          3,
        ),
      );
    }
  };
};

export const updateLike = (id, blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(id, blog);
    dispatch(updateBlog(likedBlog));
  };
};

export const blogToRemove = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch(removeBlog(blog));
  };
};

export default blogSlice.reducer;
