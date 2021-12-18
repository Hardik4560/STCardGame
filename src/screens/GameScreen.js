import React, { useCallback } from "react"
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Card from "../components/Card"
import Colors from "../constants/Colors"
import YouWonPopup from "../popups/YouWonPopup"
import {
	addToOpenCards,
	resetGame,
	setLoading,
	updateCard,
	updateSelectCard as updateSelectedCard
} from "../redux/reducers/gameReducer"
import { handlePlayerCardClick, setWon } from "../redux/reducers/playerReducer"
import TextView from "../ui/TextView"

const GameScreen = () => {
	const dispatch = useDispatch()

	const { score, won } = useSelector(state => state.player)

	const { cards, open_cards, selected_card } = useSelector(state => state.game)

	const onResetClick = useCallback(() => {
		dispatch(resetGame())
	}, [dispatch])

	const onCardPressed = useCallback(
		itemId => {
			console.log("--------------------")
			console.log("Item clicked = " + itemId)

			console.log("Open Cards = " + JSON.stringify(open_cards))
			console.log("selected Card = " + JSON.stringify(selected_card, null, 4))

			const foundCard = open_cards.find(element => element.id === itemId)

			//If the card is not opened already.
			if (!foundCard) {
				const currentCard = cards.find(element => element.id === itemId)
				console.log("Pair id = " + currentCard.pair_id)
				if (currentCard.opened) {
					return
				}

				dispatch(handlePlayerCardClick())

				console.log("Handled Player card click. = " + selected_card)
				//If no card is already selected, set this card as selected.
				if (!selected_card) {
					console.log("Setting selected card = " + currentCard)
					dispatch(updateSelectedCard(currentCard))
				} else {
					console.log("No card selected")

					//Match with the previously opened card.
					if (selected_card.pair_id === currentCard.pair_id) {
						//Match found
						dispatch(addToOpenCards(currentCard))

						//Update card information and make them as matched.
						dispatch(
							updateCard({ ...currentCard, matched: true, opened: true })
						)
						dispatch(
							updateCard({ ...selected_card, matched: true, opened: true })
						)

						console.log("Opencards = " + open_cards.length)
						console.log("Cards length = " + cards.length)
						//Check of all the cards are matched.
						if ((open_cards.length + 1) * 2 === cards.length) {
							console.log("You won!!!!")
							dispatch(setWon(true))
						}
					} else {
						dispatch(setLoading(true))
						//Not matched,
						setTimeout(() => {
							//Toggle the card animation to turn the cards back.
							dispatch(setLoading(false))
							//Current card.flip
							//firstFlippedCard.flip
							dispatch(updateCard({ ...currentCard, opened: false }))
							dispatch(updateCard({ ...selected_card, opened: false }))

							console.log("Flipback the cards, both of them!!")
						}, 1000)
					}

					//Reset the selected card.
					dispatch(updateSelectedCard(undefined))
				}
			}
		},
		[dispatch, selected_card, open_cards, cards]
	)

	const renderItem = ({ item }) => (
		<Card {...item} onCardClicked={onCardPressed} />
	)

	return (
		<View style={styles.content}>
			<View style={styles.stats}>
				<TouchableOpacity style={[styles.button]} onPress={onResetClick}>
					<TextView style={[styles.reset]}>Reset</TextView>
				</TouchableOpacity>
				<View>
					<TextView style={styles.score_label}>
						Score: <TextView style={styles.score}> {score} </TextView>
					</TextView>
				</View>
			</View>
			<FlatList
				key={3}
				numColumns={3}
				data={cards}
				renderItem={renderItem}
				keyExtractor={item => "_" + item.id}
			/>
			<YouWonPopup isVisible={won} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white
	},
	stats: {
		backgroundColor: Colors.header,
		width: "100%",
		height: 50,
		marginVertical: 15,
		paddingLeft: 10,
		paddingRight: 20,
		justifyContent: "space-around",
		alignContent: "center",
		alignItems: "center",
		display: "flex",
		flexDirection: "row"
	},
	header: {},
	reset: {
		fontSize: 20,
		color: Colors.text_dark
	},
	button: {
		padding: 10
	},
	score: {
		color: Colors.text_dark,
		fontSize: 25
	},
	score_label: {
		color: Colors.text_label_light,
		fontSize: 20
	}
})

export default GameScreen
