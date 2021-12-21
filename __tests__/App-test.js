// test-utils.jsx
import { configureStore } from "@reduxjs/toolkit"
import { render as rtlRender } from "@testing-library/react"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider } from "react-redux"
import App from "../App"
import AppContainer from "../src/AppContainer"
import Card from "../src/components/Card"
import YouWonPopup from "../src/popups/YouWonPopup"
import gameReducer from "../src/redux/reducers/gameReducer"
import playerReducer from "../src/redux/reducers/playerReducer"
import GameScreen from "../src/screens/GameScreen"
import TextView from "../src/ui/TextView"
function render(
	ui,
	{
		preloadedState,
		store = configureStore({
			reducer: { player: playerReducer, game: gameReducer },
			preloadedState
		}),
		...renderOptions
	} = {}
) {
	function Wrapper({ children }) {
		return <Provider store={store}>{children}</Provider>
	}
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from "@testing-library/react"
// override render method
export { render }

xdescribe("UI Testing", () => {
	it("Renders properly", () => {
		render(<App />)
	})

	it("Renders TextView", () => {
		rtlRender(<TextView>Custom TextView</TextView>)
	})

	it("Renders AppContainer", () => {
		render(
			<SafeAreaProvider>
				<AppContainer />
			</SafeAreaProvider>
		)
	})

	it("Renders GameScreen", () => {
		render(
			<SafeAreaProvider>
				<GameScreen />
			</SafeAreaProvider>
		)
	})

	it("Renders Card", () => {
		render(
			<SafeAreaProvider>
				<Card />
			</SafeAreaProvider>
		)
	})

	it("Renders PopUp", () => {
		render(<YouWonPopup />)
	})
})
