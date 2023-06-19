import React from 'react'
import { StyleSheet, Image, View } from 'react-native'

type Props = {
	source: { uri: string }
	size?: number
}

const DEFAULT_IMAGE_URL = 'https://www.mywebtuts.com/user-defualt-images.jpg'

export const Avatar: React.FC<Props> = ({ source, size = 50 }) => {
	const avatarSource = source.uri ? source : { uri: DEFAULT_IMAGE_URL }

	return (
		<View style={[styles.container, { width: size, height: size }]}>
			<Image style={styles.image} source={avatarSource} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 999,
		overflow: 'hidden',
	},
	image: {
		flex: 1,
	},
})

export default Avatar
