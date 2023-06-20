import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Control, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

import { Card, FormButton, FormInput } from '../components'
import { addChatroomSchemaValidation } from '../utils'
import { AddChatScreenProps, ChatroomRequestType } from '../types'
import { db } from '../config/firebase'

export function AddChatScreen({ navigation }: AddChatScreenProps) {
	const [seed, setSeed] = useState(Math.random())
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ChatroomRequestType>({
		resolver: zodResolver(addChatroomSchemaValidation),
	})

	const onAddChatroomPressed = async (data: ChatroomRequestType) => {
		try {
			console.log(JSON.stringify(data, null, 2))
			const docRef = await addDoc(collection(db, 'chats'), {
				timestamp: serverTimestamp(),
				chatName: data.name,
				photoURL: `https://avatars.dicebear.com/api/human/${seed}.svg`,
			})
			console.log('Document written with ID: ', docRef.id)

			reset()
			Alert.alert('Chatroom Added', 'Chatroom has been successfully added.', [
				{
					text: 'OK',
					onPress: () => navigation.navigate('Home'),
				},
			])
		} catch (error) {
			console.log('Adding new docs fail: ', error)
			if (error && error?.message) {
				Alert.alert('Error', 'Failed to add chatroom.', error?.message)
			}
		}
	}

	const onCancelPressed = () => {
		navigation.navigate('Home')
	}

	return (
		<SafeAreaView style={styles.root}>
			<ScrollView
				contentContainerStyle={styles.scrollViewContent}
				showsVerticalScrollIndicator={false}>
				<Card style={styles.container}>
					<Text style={styles.text}>Add Chatroom</Text>

					<FormInput
						label=""
						name="name"
						placeholder="Chatroom Name"
						control={control as unknown as Control}
						error={!!errors.name}
						errorMessage={errors.name?.message}
						// iconType="chatbubbles"
						autoCapitalize="none"
						autoCorrect={false}
					/>

					<FormButton
						buttonTitle="Add Chatroom"
						onPress={handleSubmit(onAddChatroomPressed)}
						buttonContainerStyle={styles.buttonContainer}
					/>

					<FormButton
						buttonTitle="Cancel"
						onPress={onCancelPressed}
						buttonContainerStyle={[
							styles.buttonContainer,
							{
								backgroundColor: 'red',
							},
						]}
					/>
				</Card>
			</ScrollView>
		</SafeAreaView>
	)
}

export default AddChatScreen

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#F9FBFC',
	},
	container: {
		width: '85%',
		maxWidth: 450,
		alignItems: 'center',
		marginLeft: 'auto',
		marginRight: 'auto',
		padding: 20,
	},
	scrollViewContent: {
		flexGrow: 1,
		paddingTop: 40,
		paddingBottom: 40,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonContainer: {
		flex: 1,
		marginTop: 13,
	},
	cancelButton: {
		backgroundColor: '#E0E0E0',
		marginTop: 15,
	},
	text: {
		fontSize: 25,
		marginBottom: 25,
	},
})