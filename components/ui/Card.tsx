import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'

type CardProps = {
	children: React.ReactNode
	style?: ViewStyle
}

export function Card({ children, style }: CardProps) {
	return <View style={[styles.card, style]}>{children}</View>
}

const styles = StyleSheet.create({
	card: {
		// iOS
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.4,
		shadowRadius: 2,
		borderRadius: 6,
		shadowColor: 'black',
		// Android
		elevation: 8,
		// All
		backgroundColor: 'white',
		margin: 10,
		fontSize: 22,
		textAlign: 'center',
		padding: 16,
	},
})
