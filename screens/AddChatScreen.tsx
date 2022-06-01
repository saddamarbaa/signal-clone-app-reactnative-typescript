import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { addDoc, collection, serverTimestamp } from '@firebase/firestore'

import { RootTabScreenProps } from '../types'
import { db } from '../config/firebase'

export default function AddChatScreen({
	navigation,
}: RootTabScreenProps<'AddChat'>) {
	const [seed, setSeed] = useState(Math.random())
	const [input, setInput] = useState('')

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Add a new Chat',
			headerBackTitle: 'Chats',
			headerTintColor: 'white',
			headerTitleStyle: {
				fontWeight: 'bold',
				fontSize: 22,
				color: 'white',
			},
			headerTitleAlign: 'center',
		})
	}, [navigation])

	useEffect(() => {
		const seed = Math.floor(Math.random() * 5000)
		setSeed(seed)
	}, [])

	const addChatRoomHandler = async () => {
		if (input) {
			try {
				const docRef = await addDoc(collection(db, 'chats'), {
					timestamp: serverTimestamp(),
					chatName: input,
					photoURL: `https://avatars.dicebear.com/api/human/${seed}.svg`,
				})
				console.log('Document written with ID: ', docRef.id)
				setInput('')
				navigation.goBack()
			} catch (error: any) {
				console.log('Adding new docs fail: ', error)
				if (error && error?.message) {
					alert(error?.message)
				}
			}
		}
	}

	return (
		<View style={styles.wrapper}>
			<View style={styles.container}>
				<Input
					style={styles.input}
					value={input}
					onSubmitEditing={addChatRoomHandler}
					placeholder="Enter a chat name"
					leftIcon={
						<Icon name="wechat" type="antdesign" size={22} color="black" />
					}
					onChangeText={(value) => setInput(value)}
				/>
				<Button onPress={addChatRoomHandler} title="Create new Chat" />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	container: {
		padding: 30,
		height: '100%',
		marginTop: 40,
		width: '80%',
		maxWidth: 500,
	},
	input: {
		flex: 1,
		height: 40,
		padding: 10,
		borderRadius: 6,
		flexDirection: 'row',
		outlineStyle: 'none',
		width: '100%',
		web: {
			outlineStyle: 'none',
		},
	},
})
