import { createSlice } from "@reduxjs/toolkit"
import { cardClicked } from "./cardReducer"

export const playerSlice = createSlice({
	name: "player",
	initialState: {
		score: 0,
		cardFlipped: false,
		firstFlippedCard: undefined,
		openCards: []
	},
	reducers: {
		increaseScore: state => {
			state.score += 1
		},
		reset: state => {
			;(state.score = 0), (cardFlipped = 0)
		},
		flipCard: state => {
			state.cardFlipped = !state.cardFlipped
		},
		updateFirstFlippedCard: (state, action) => {
			state.firstFlippedCard = action.payload
		},
		addOpenCards: (state, action) => {
			state.openCards.push(action.payload)
		}
	}
})

// Action creators are generated for each case reducer function
export const {
	increaseScore,
	reset,
	flipCard,
	addOpenCards,
	updateFirstFlippedCard
} = playerSlice.actions

export default playerSlice.reducer
