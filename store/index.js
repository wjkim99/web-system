import {configureStore} from "@reduxjs/toolkit";

import reducer from "./modules/index";
import {createWrapper} from "next-redux-wrapper";

const store = (context) => configureStore({
	reducer,
})

export const wrapper = createWrapper(store, {

});