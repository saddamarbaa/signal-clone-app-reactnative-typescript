import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useAuthState } from 'react-firebase-hooks/auth'
import { Avatar } from 'react-native-elements'

import LisTlItem from '../components/ListItem'
import { auth, db } from '../config/firebase'

export default function HomeScreen({ navigation }) {
	const [user, loading, error] = useAuthState(auth)

	console.log(user?.photoURL)
	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Signal',
			headerStyle: { backgroundColor: 'white' },
			headerTintColor: 'black',
			headerTitleStyle: {
				fontWeight: 'bold',
				fontSize: 20,
				color: 'back',
			},
			headerTitleAlign: 'center',
			headerLeft: () => (
				<View style={{ marginLeft: 20 }}>
					<TouchableOpacity onPress={console.log('ok')} activeOpacity="0.5">
						<Avatar
							rounded
							source={user?.photoURL || require('../assets/tem3.png')}
						/>
					</TouchableOpacity>
				</View>
			),
		})
	}, [navigation])

	return (
		<SafeAreaView style={styles.wrapper}>
			<ScrollView style={styles.container}>
				<LisTlItem />
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		alignItems: 'center',
		// justifyContent: 'center',
		flex: 1,
	},
	container: {
		width: '100%',
	},
})
