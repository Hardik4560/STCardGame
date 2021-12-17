import { configureStore } from "@reduxjs/toolkit"
import gameReducer from "./reducers/gameReducer"
import playerReducer from "./reducers/playerReducer"

const store = configureStore({
	reducer: {
		player: playerReducer,
		game: gameReducer
	}
})

export default store
