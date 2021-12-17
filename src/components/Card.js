import React, { useCallback, useEffect } from "react"
import {
	Animated,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native"
import Colors from "../constants/Colors"
import { HEIGHT, WIDTH } from "../constants/Styles"

const Card = props => {
	let animatedValue = new Animated.Value(0)
	let currentValue = 0

	const listener = ({ value }) => {
		currentValue = value
	}
	animatedValue.addListener(listener)

	const flipAnimation = useCallback(() => {
		if (currentValue >= 90) {
			//Closing the card
			Animated.spring(animatedValue, {
				toValue: 0,
				tension: 15,
				friction: 4,
				useNativeDriver: true
			}).start()
		} else {
			//Openin the card
			Animated.spring(animatedValue, {
				toValue: 180,
				tension: 10,
				friction: 20,
				useNativeDriver: true
			}).start()
		}
	}, [currentValue])

	const onCardClicked = useCallback(() => {
		props.onCardClicked(props.id)
		//flipAnimation()
	}, [props])

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

	useEffect(() => {
		if (props.clicked) {
			console.log("Clicked = " + props.clicked)
			//flipAnimation()
		}
	}, [props.clicked])

	return (
		<View>
			<TouchableOpacity onPress={onCardClicked}>
				<Animated.View style={[rotateLeftInterpolaterStyle, styles.content]}>
					<Text style={styles.text_front}>?</Text>
				</Animated.View>
				<Animated.View
					style={[
						rotateRightInterpolaterStyle,
						styles.content,
						styles.content_back
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
		borderWidth: 4,
		opacity: 0.7,
		backfaceVisibility: "hidden"
	},
	content_back: {
		position: "absolute",
		top: 0,
		backgroundColor: Colors.card_flipped
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
