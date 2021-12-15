import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./reducers/cardReducer"

const store = configureStore({
	reducer: {
		counter: counterReducer
	}
})

export default store
