import { configureStore } from "@reduxjs/toolkit"
import cardReducer from "./reducers/cardReducer"
import playerReducer from "./reducers/playerReducer"

const store = configureStore({
	reducer: {
		player: playerReducer,
		card: cardReducer
	}
})

export default store
