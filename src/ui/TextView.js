import React from "react"
import { StyleSheet, Text } from "react-native"

export default TextView = ({ children, style, ...props }) => {
	return (
		<Text {...props} style={[styles.text, style]}>
			{children}
		</Text>
	)
}

const styles = StyleSheet.create({
	text: {
		fontFamily: "badcomic"
	}
})
