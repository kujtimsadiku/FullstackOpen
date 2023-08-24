import { configureStore } from "@reduxjs/toolkit";
import blogService from "./services/blogs";
import blogReducer, { initializeBlogs } from "./reducers/blogReducer";

const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});

console.log("store.getState():", store.getState());

store.subscribe(() => {
  console.log("Store Updated!", store.getState());
});

blogService.getAll(() => {
  store.dispatch(initializeBlogs());
});

export default store;
