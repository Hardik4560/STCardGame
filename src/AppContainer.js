import React from "react"
import { StyleSheet, View } from "react-native"
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
