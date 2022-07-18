import {HYDRATE} from "next-redux-wrapper";
import {combineReducers} from "@reduxjs/toolkit";

import config from './config';
import temp from './temp';

const reducer = (state, action) => {

	if(action.type === HYDRATE) {
		return {
			...state,
			...action.payload
		};
	}
	return combineReducers({
		config,
		temp
	})(state, action);

}

export default reducer;