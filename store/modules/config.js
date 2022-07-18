import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isVerticalCollapsed: false,
	isTopCollapsed: false
};

const configSlice = createSlice({
	name: 'config',
	initialState,
	reducers: {
		updateIsVerticalCollapsed: (state, action) => {
			state.isVerticalCollapsed = action.payload;
		},
		updateIsTopCollapsed: (state, action) => {
			state.isTopCollapsed = action.payload;
		},
	}
});

export const { updateIsVerticalCollapsed, updateIsTopCollapsed } = configSlice.actions;

export default configSlice.reducer;