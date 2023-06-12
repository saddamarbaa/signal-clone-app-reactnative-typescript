import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
// @ts-ignore
import { Circle } from 'better-react-spinkit'

export function Loading() {
	return (
		<View style={styles.wrapper}>
			<View style={[styles.card, styles.shadowProp]}>
				<Image
					source={require('../assets/Signal2.png')}
					style={{ width: 200, height: 100 }}
				/>
				<View style={styles.loading}>
					<Circle color="#3A76F0" size={70} />
				</View>
			</View>
		</View>
	)
}

export default Loading

const styles = StyleSheet.create({
	wrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	card: {
		backgroundColor: 'white',
		borderRadius: 8,
		paddingVertical: 35,
		paddingHorizontal: 105,
		marginVertical: 10,
		width: '100%',
	},
	shadowProp: {
		shadowColor: '#171717',
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	loading: {
		marginTop: 23,
		marginLeft: 60,
	},
})
