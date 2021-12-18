import React from "react"
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Colors from "../constants/Colors"
import { resetGame } from "../redux/reducers/gameReducer"
import TextView from "../ui/TextView"

const YouWonPopup = ({ isVisible }) => {
	const dispatch = useDispatch()
	const { score } = useSelector(state => state.player)

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={isVisible}
			onRequestClose={() => {}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<View style={styles.header}>
						<TextView style={styles.title}>Good Job!</TextView>
					</View>
					<View style={styles.modalContent}>
						<TextView style={styles.score_label}>
							score: <TextView style={styles.score}>{score}</TextView>
						</TextView>
						<TouchableOpacity onPress={() => dispatch(resetGame())}>
							<TextView style={styles.play_again_text} title="PLAY AGAIN">
								Play Again
							</TextView>
						</TouchableOpacity>
					</View>
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
	header: {
		backgroundColor: Colors.header,
		borderTopStartRadius: 20,
		borderTopRightRadius: 20,
		paddingHorizontal: "20%",
		paddingVertical: 15,
		justifyContent: "center"
	},
	title: {
		color: Colors.text_dark,
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 30
	},
	modalView: {
		backgroundColor: Colors.app_bg_light,
		borderRadius: 20,
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
	score_label: {
		color: Colors.text_label_dark,
		fontSize: 30
	},
	score: {
		color: Colors.text_dark,
		fontSize: 30,
		textAlign: "center"
	},
	modalContent: {
		paddingVertical: 30,
		justifyContent: "center",
		alignItems: "center"
	},
	play_again_text: {
		marginTop: 20,
		color: "white",
		fontSize: 40,
		fontWeight: "bold",
		textAlign: "center"
	}
})

export default YouWonPopup
