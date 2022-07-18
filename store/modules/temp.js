import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	data: null
};

const tempSlice = createSlice({
	name: 'temp',
	initialState,
	reducers: {
		setData: (state, action) => {
			state.data = action.payload;
		},
	}
});

export const { setData } = tempSlice.actions;

export default tempSlice.reducer;