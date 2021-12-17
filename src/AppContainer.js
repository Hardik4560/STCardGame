import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { useDispatch } from "react-redux"
import Card from "./components/Card"
import Colors from "./constants/Colors"
import { addCard } from "./redux/reducers/cardReducer"
import GameScreen from "./screens/GameScreen"

const AppContainer = () => {
	return (
		<View style={styles.container}>
			<GameScreen />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {}
})

export default AppContainer
