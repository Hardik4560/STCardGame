import React from "react"
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native"
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
		<SafeAreaView>
			<View style={styles.container}>
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
		padding: 16
	}
})

export default App
