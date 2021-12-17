import { createSlice } from "@reduxjs/toolkit"
import produce from "immer"
import { act } from "react-test-renderer"
import initCards from "../helpers/CardsGenerator"

export const cardSlice = createSlice({
	name: "player",
	initialState: {
		cards: initCards()
	},
	reducers: {
		cardClicked: produce((state, action) => {
			let card = state.cards.find(element => element.id == action.payload)
			card.clicked = true
		}),
		updateCard: produce((state, action) => {
			let card = state.cards.find(element => element.id == action.payload.id)
		})
	}
})

// Action creators are generated for each case reducer function
export const { updateCard, cardClicked } = cardSlice.actions

export default cardSlice.reducer
