import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		setBlog(state, action) {
			return action.payload;
		},
		appendBlog(state, action) {
			state.push(action.payload)
		}
	}
})