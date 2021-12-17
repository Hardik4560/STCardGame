import { createSlice } from "@reduxjs/toolkit"

export const playerSlice = createSlice({
	name: "player",
	initialState: {
		score: 0,
		won: false
	},
	reducers: {
		increaseScore: state => {
			state.score += 1
		},
		resetPlayer: state => {
			;(state.score = 0), (state.won = false)
		},
		setWon: (state, action) => {
			state.won = action.payload
		}
	}
})

export const handlePlayerCardClick = item => async dispatch => {
	dispatch(increaseScore())
}

// Action creators are generated for each case reducer function
export const { increaseScore, resetPlayer, setWon } = playerSlice.actions

export default playerSlice.reducer
