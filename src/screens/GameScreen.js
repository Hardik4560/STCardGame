import React, { useCallback } from "react"
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Card from "../components/Card"
import Colors from "../constants/Colors"
import {
	addOpenCards,
	flipCard,
	increaseScore,
	reset,
	updateFirstFlippedCard
} from "../redux/reducers/playerReducer"

function shuffleArray(array) {
	let i = array.length - 1
	for (; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		const temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}
	return array
}

const GameScreen = () => {
	const dispatch = useDispatch()

	const { score, cardFlipped, openCards, firstFlippedCard } = useSelector(
		state => state.player
	)
	const { cards } = useSelector(state => state.card)

	shuffleArray(cards)

	const onResetClick = useCallback(() => {
		dispatch(reset())
	}, [dispatch])

	const onCardPressed = useCallback(
		itemId => {
			console.log("--------------------")
			console.log("Item clicked = " + itemId)

			console.log("Open Cards = " + JSON.stringify(openCards))
			console.log(
				"firstFlipped Card = " + JSON.stringify(firstFlippedCard, null, 4)
			)
			console.log("cardFlipped = " + cardFlipped)

			//1. Check if a card is already opened.
			//2. Check if the card first or second
			//3. Check if the open card matches the current card.
			//4. Mark the current and opened card as matched.

			const foundCard = openCards.find(element => element.id === itemId)

			//If the card is not opened already.
			if (!foundCard) {
				const currentCard = cards.find(element => element.id == itemId)

				console.log("Pair id = " + currentCard.pair_id)
				//If this is the first card being opened, update the player info.
				if (!cardFlipped) {
					dispatch(updateFirstFlippedCard(currentCard))
					dispatch(flipCard())
				} else {
					//Match with the previously opened card.
					if (firstFlippedCard.pair_id === currentCard.pair_id) {
						//Match found
						dispatch(addOpenCards(currentCard))
						dispatch(addOpenCards(firstFlippedCard))
					}

					//Not matched,
					setTimeout(() => {
						dispatch(updateFirstFlippedCard(undefined))
						dispatch(flipCard())

						//Toggle the card animation to turn the cards back.
						//Current card.flip
						//firstFlippedCard.flip
						console.log("Flipback the cards, both of them!!")
					}, 1000)
				}

				dispatch(increaseScore())
			}

			//dispatch(cardClicked(itemId))
		},
		[dispatch, firstFlippedCard, openCards, cardFlipped]
	)

	const renderItem = ({ item }) => (
		<Card {...item} onCardClicked={onCardPressed}></Card>
	)

	return (
		<View style={styles.content}>
			<View style={styles.stats}>
				<TouchableOpacity onPress={onResetClick}>
					<Text>Reset</Text>
				</TouchableOpacity>
				<View>
					<Text>Score: {score} </Text>
				</View>
			</View>
			<FlatList
				key={3}
				numColumns={3}
				data={cards}
				renderItem={renderItem}
				keyExtractor={item => "_" + item.id}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {},
	stats: {
		width: "100%",
		height: 50,
		backgroundColor: Colors.app_bg,
		flexDirection: "column"
	}
})

export default GameScreen
