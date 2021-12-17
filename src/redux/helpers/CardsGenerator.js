const initCards = () => {
	const CARD_PAIRS_VALUE = []
	const CARD_COUNT = 12

	const cards = []

	//Get the random numbers.
	for (let index = 0; index < CARD_COUNT / 2; index++) {
		let randomNumber = Math.floor(Math.random() * 100) + 1

		//Check if the number is included till the point, we have a unique random number from the list.
		while (CARD_PAIRS_VALUE.includes(randomNumber)) {
			randomNumber = Math.floor(Math.random() * 100) + 1
		}

		CARD_PAIRS_VALUE[index] = randomNumber //Add the random number.
	}

	let counter = 0
	//Generate the cards and assign them the pair id.
	for (let index = 0; index < CARD_COUNT; index++) {
		if (counter >= CARD_PAIRS_VALUE.length) {
			counter = 0
		}

		cards.push({
			id: index + 1,
			pair_id: CARD_PAIRS_VALUE[counter++],
			flipped: false,
			matched: false,
			clicked: false
		})
	}

	return cards
}

export default initCards
