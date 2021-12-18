import { useSafeAreaInsets } from "react-native-safe-area-context"
import { HEIGHT } from "./Dimens"

export const statsHeight = 50

export const FlatListHeight = () => {
	const insets = useSafeAreaInsets()

	return HEIGHT - (insets.bottom + insets.top + statsHeight)
}
