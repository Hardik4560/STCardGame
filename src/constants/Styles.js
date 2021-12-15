import { Dimensions, PixelRatio } from "react-native"

export const HEIGHT = Dimensions.get("window").height

export const WIDTH = Dimensions.get("window").width

export const toPx = size => {
	return PixelRatio.getPixelSizeForLayoutSize(size)
}

export const scaledFont = size => {
	return PixelRatio.getFontScale(size)
}
