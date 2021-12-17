import React from "react"
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native"
import Colors from "./src/constants/Colors"
import { Provider } from "react-redux"
import store from "./src/redux"
import AppContainer from "./src/AppContainer"

const statusBarBg =
	Platform.OS !== "android" || Platform?.constants?.Version >= 23
		? Colors.white
		: undefined

const App = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<StatusBar backgroundColor={statusBarBg} barStyle="dark-content" />
				<Provider store={store}>
					<AppContainer />
				</Provider>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default App
