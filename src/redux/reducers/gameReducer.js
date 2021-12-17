import { createSlice } from "@reduxjs/toolkit"
import produce from "immer"
import initCards from "../helpers/CardsGenerator"
import { resetPlayer } from "./playerReducer"

export const getInitState = () => {
	return {
		cards: initCards(),
		open_cards: [],
		selected_card: undefined,
		isLoading: false
	}
}

export const gameSlice = createSlice({
	name: "game",
	initialState: getInitState(),
	reducers: {
		cardClicked: produce((state, action) => {
			let card = state.cards.find(element => element.id == action.payload)
			card.opened = true
		}),
		updateCard: produce((state, action) => {
			let card = state.cards.find(element => element.id == action.payload.id)
			card.opened = action.payload.opened
			card.matched = action.payload.matched
		}),
		addToOpenCards: produce((state, action) => {
			state.open_cards.push(action.payload)
		}),
		updateSelectCard: produce((state, action) => {
			state.selected_card = action.payload
		}),
		setLoading: produce((state, action) => {
			state.isLoading = action.payload
		}),
		resetCards: produce(state => {
			;(state.cards = initCards()),
				(state.open_cards = []),
				(state.selected_card = undefined),
				(state.isLoading = false)
		})
	}
})

export const resetGame = () => async dispatch => {
	dispatch(resetCards())
	dispatch(resetPlayer())
}

// Action creators are generated for each case reducer function
export const {
	updateCard,
	cardClicked,
	addToOpenCards,
	updateSelectCard,
	setLoading,
	resetCards
} = gameSlice.actions

export default gameSlice.reducer
