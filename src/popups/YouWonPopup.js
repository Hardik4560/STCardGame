import React from "react"
import { Button, Modal, Pressable, StyleSheet, Text, View } from "react-native"
import { useDispatch } from "react-redux"
import { resetGame } from "../redux/reducers/gameReducer"

export default YouWonPopup = ({ isVisible }) => {
	const dispatch = useDispatch()

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={isVisible}
			onRequestClose={() => {
				Alert.alert("Modal has been closed.")
				setModalVisible(!modalVisible)
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.modalText}>Good Job!</Text>
					<Button
						style={styles.textStyle}
						title="PLAY AGAIN"
						onPress={() => dispatch(resetGame())}
					></Button>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#000000aa",
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		fontSize: 45,
		textAlign: "center"
	}
})
