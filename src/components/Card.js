import React, { useCallback, useEffect, useState } from "react"
import {
	Animated,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Colors from "../constants/Colors"
import { HEIGHT, WIDTH } from "../constants/Styles"
import { cardClicked } from "../redux/reducers/gameReducer"

const Card = props => {
	const dispatch = useDispatch()

	const { isLoading } = useSelector(state => state.game)
	const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0))

	const flipClose = useCallback(() => {
		//Closing the card
		Animated.spring(animatedValue, {
			toValue: 0,
			tension: 15,
			friction: 4,
			useNativeDriver: true
		}).start()
	})

	const flipOpen = useCallback(() => {
		//Openin the card
		Animated.spring(animatedValue, {
			toValue: 180,
			tension: 10,
			friction: 20,
			useNativeDriver: true
		}).start(() => {})
	})

	//INTERPOLATERS
	const rotateLeftInterpolater = animatedValue.interpolate({
		inputRange: [0, 180],
		outputRange: ["0deg", "180deg"]
	})

	const rotateRightInterpolater = animatedValue.interpolate({
		inputRange: [0, 180],
		outputRange: ["180deg", "360deg"]
	})

	const rotateLeftInterpolaterStyle = {
		transform: [{ rotateY: rotateLeftInterpolater }]
	}

	const rotateRightInterpolaterStyle = {
		transform: [{ rotateY: rotateRightInterpolater }]
	}

	//BEHAVIOURAL FUNCTIONS
	useEffect(() => {
		console.log("Id = " + props.pair_id + " Props opened = " + props.opened)
		if (props.opened) {
			flipOpen()
		} else {
			flipClose()
		}
	}, [props.opened])

	const onCardClicked = useCallback(() => {
		dispatch(cardClicked(props.id))
		props.onCardClicked(props.id)
	})

	return (
		<View>
			<TouchableOpacity
				onPress={onCardClicked}
				disabled={props.matched || isLoading || props.opened}
			>
				<Animated.View style={[rotateLeftInterpolaterStyle, styles.content]}>
					<Text style={styles.text_front}>?</Text>
				</Animated.View>
				<Animated.View
					style={[
						rotateRightInterpolaterStyle,
						styles.content,
						props.matched ? styles.content_matched : styles.content_back
					]}
				>
					<Text style={styles.text_back}>{props.pair_id}</Text>
				</Animated.View>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	content: {
		marginTop: 10,
		marginLeft: 10,
		width: WIDTH / 3 - 15,
		height: HEIGHT / 4 - 45,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.card_bg,
		borderColor: Colors.card_bg_border,
		borderStyle: "solid",
		borderRadius: 16,
		borderWidth: 2,
		backfaceVisibility: "hidden"
	},
	content_back: {
		position: "absolute",
		top: 0,
		backgroundColor: Colors.card_flipped
	},
	content_matched: {
		position: "absolute",
		top: 0,
		backgroundColor: Colors.card_matched
	},
	text_back: {
		alignItems: "center",
		fontSize: 30
	},
	text_front: {
		alignItems: "center",
		fontSize: 50,
		color: Colors.card_bg_border,
		fontWeight: "bold"
	}
})

export default Card
