import initCards from "../src/redux/helpers/CardsGenerator"

describe("Card generator", () => {
	test("Undefined", () => {
		expect(() => {
			initCards()
		}).toThrow(new Error("Card value is required to proceed"))
	})

	test("No valid number", () => {
		const count = 5

		expect(() => {
			initCards(count)
		}).toThrow(new Error(`Cannot generate card using the value ${count}`))
	})

	test("Valid number", () => {
		const count = 18

		expect(initCards(count).length).toBe(count)
	})
})
