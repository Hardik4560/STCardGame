import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Card from "./components/Card"
import FlipView from "./components/FlipView"
import Colors from "./constants/Colors"

const AppContainer = () => {
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Card number={100}></Card>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default AppContainer
