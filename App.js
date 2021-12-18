import React from "react"
import { StyleSheet } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { Provider } from "react-redux"
import AppContainer from "./src/AppContainer"
import Colors from "./src/constants/Colors"
import store from "./src/redux"

const App = () => {
	return (
		<SafeAreaProvider style={styles.container}>
			<SafeAreaView mode="margin">
				<Provider store={store}>
					<AppContainer />
				</Provider>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.app_bg
	}
})

export default App
