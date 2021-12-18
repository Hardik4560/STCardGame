import React from "react"
import {
	Platform,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	View
} from "react-native"
import { Provider } from "react-redux"
import AppContainer from "./src/AppContainer"
import Colors from "./src/constants/Colors"
import store from "./src/redux"

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
		flex: 1,
		backgroundColor: Colors.app_bg
	}
})

export default App
