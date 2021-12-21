import React, { useCallback, useEffect, useState } from "react"
import { Animated, StyleSheet, TouchableHighlight, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Colors from "../constants/Colors"
import { WIDTH } from "../constants/Dimens"
import { FlatListHeight } from "../constants/Styles"
import { cardClicked } from "../redux/reducers/gameReducer"
import TextView from "../ui/TextView"

const Card = props => {
	const dispatch = useDispatch()

	const { isLoading } = useSelector(state => state.game)
	const [animatedValue] = useState(new Animated.Value(0))

	const flipClose = useCallback(() => {
		//Closing the card
		Animated.spring(animatedValue, {
			toValue: 0,
			tension: 15,
			friction: 4,
			useNativeDriver: true
		}).start()
	}, [animatedValue])

	const flipOpen = useCallback(() => {
		//Openin the card
		Animated.spring(animatedValue, {
			toValue: 180,
			tension: 10,
			friction: 20,
			useNativeDriver: true
		}).start(() => {})
	}, [animatedValue])

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
		if (props.opened) {
			flipOpen()
		} else {
			flipClose()
		}
	}, [flipClose, flipOpen, props.opened])

	const onCardClicked = useCallback(() => {
		dispatch(cardClicked(props.id))
		props.onCardClicked(props.id)
	}, [dispatch, props])

	return (
		<View>
			<TouchableHighlight
				underlayColor="none"
				onPress={onCardClicked}
				disabled={props.matched || isLoading || props.opened}
			>
				<>
					<Animated.View
						style={[
							rotateLeftInterpolaterStyle,
							styles.content,
							{ height: FlatListHeight() / 4 - 18 }
						]}
					>
						<TextView style={styles.text_front}>?</TextView>
					</Animated.View>
					<Animated.View
						style={[
							rotateRightInterpolaterStyle,
							styles.content,
							{ height: FlatListHeight() / 4 - 18 },
							props.matched ? styles.content_matched : styles.content_back
						]}
					>
						<TextView style={styles.text_back}>{props.pair_id}</TextView>
					</Animated.View>
				</>
			</TouchableHighlight>
		</View>
	)
}

const styles = StyleSheet.create({
	content: {
		width: WIDTH / 3 - 12,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.card_bg,
		borderColor: Colors.card_bg_border,
		borderStyle: "solid",
		borderRadius: 16,
		backfaceVisibility: "hidden",
		borderWidth: 1,
		borderBottomWidth: 0,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.4,
		shadowRadius: 2,
		elevation: 2
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
		fontSize: 30,
		color: Colors.black
	},
	text_front: {
		alignItems: "center",
		fontSize: 80,
		color: Colors.white,
		fontWeight: "bold"
	}
})

export default Card
