import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { Avatar } from 'react-native-elements'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
	addDoc,
	collection,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
} from '@firebase/firestore'
import Moment from 'react-moment'

import { RootTabScreenProps, MessagesResponseType } from '../types'
import { auth, db } from '../config/firebase'
import { truncate } from '../utils'

export default function ChatScreen({
	route,
	navigation,
}: RootTabScreenProps<'Chat'>) {
	const [user] = useAuthState(auth)
	const [input, setInput] = useState('')
	const [messages, setMessages] = useState<MessagesResponseType[] | []>([])

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitleVisible: false,
			title: 'Chat',
			headerTitleAlign: 'left',
			headerTitle: () => (
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}>
					<Avatar
						rounded
						source={{
							uri:
								messages[0]?.photoURL ||
								'https://www.mywebtuts.com/user-defualt-images.jpg',
						}}
					/>
					<Text
						style={{
							color: 'white',
							marginLeft: 10,
							fontWeight: '700',
							fontSize: 22,
						}}>
						{truncate(route?.params?.chatName, 10)}
					</Text>
				</View>
			),
			headerLeft: () => (
				<TouchableOpacity
					style={{ marginLeft: 10 }}
					onPress={navigation.goBack}>
					<AntDesign name="arrowleft" size={22} color="white" />
				</TouchableOpacity>
			),
			headerRight: () => (
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						width: 80,
						marginRight: 20,
					}}>
					<TouchableOpacity activeOpacity={0.5}>
						<FontAwesome name="video-camera" size={20} color="white" />
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.5}>
						<Ionicons name="call" size={20} color="white" />
					</TouchableOpacity>
				</View>
			),
		})
	}, [navigation, messages])

	useEffect(() => {
		let unsubscribe: any
		if (route?.params?.id && route?.params?.chatName) {
			unsubscribe = onSnapshot(
				query(
					collection(db, 'chats', route?.params?.id, route?.params?.chatName),
					orderBy('timestamp', 'desc'),
				),
				(snapshot) =>
					setMessages(
						snapshot.docs.map((doc) => ({
							id: doc.id && doc.id,
							timestamp: doc.data().timestamp,
							message: doc.data().message,
							displayName: doc.data().displayName,
							email: doc.data().email,
							photoURL: doc.data().photoURL,
						})),
					),
			)
		}

		return () => {
			unsubscribe()
		}
	}, [db, route?.params])

	const sendMessageHandler = async () => {
		Keyboard.dismiss() // Hide the keyboard after sending message

		if (input && route?.params?.id && route?.params?.chatName) {
			console.log(input, user?.displayName, user?.photoURL)
			try {
				const docRef = await addDoc(
					collection(db, 'chats', route?.params?.id, route?.params?.chatName),
					{
						timestamp: serverTimestamp(),
						message: input,
						displayName: user?.displayName,
						email: user?.email,
						photoURL: user?.photoURL,
					},
				)
				console.log('Document written with ID: ', docRef.id)
				setInput('')
			} catch (error: any) {
				console.log('Adding new docs fail: ', error)
				if (error && error?.message) {
					alert(error?.message)
				}
			}
		}
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<StatusBar style="light" />
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.container}
				keyboardVerticalOffset={90}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<>
						<ScrollView contentContainerStyle={styles.inner}>
							{messages.map(
								({ id, email, photoURL, message, displayName, timestamp }) =>
									email === user?.email ? (
										<View key={id} style={styles.reciever}>
											<View key={id} style={styles.content}>
												<Avatar
													position="absolute"
													// WEB
													// containerStyle={{
													// 	position: 'absolute',
													// 	bottom: -15,
													// 	right: -5,
													// }}
													// bottom={-15}
													// right={-5}
													rounded
													size={30}
													source={{
														uri: photoURL,
													}}
												/>
												<Text style={styles.name}>{displayName}</Text>
											</View>
											<View>
												<Text style={styles.recieverText}>{message}</Text>
											</View>
											<View>
												<Text style={styles.time}>
													<Moment fromNow className="pr-5 text-xs ">
														{new Date(timestamp?.seconds * 1000)}
													</Moment>
												</Text>
											</View>
										</View>
									) : (
										<View key={id} style={styles.sender}>
											<View key={id} style={styles.content}>
												<Avatar
													// position="absolute"
													// WEB
													// containerStyle={{
													// 	position: 'absolute',
													// 	bottom: -15,
													// 	right: -5,
													// }}
													// bottom={-15}
													// right={-5}
													rounded
													size={30}
													source={{
														uri: photoURL,
													}}
												/>
												<Text style={styles.name}>{displayName}</Text>
											</View>
											<View>
												<Text style={styles.recieverText}>{message}</Text>
											</View>
											<View>
												{timestamp?.seconds && (
													<Text style={styles.time}>
														<Moment fromNow className="pr-5 text-xs ">
															{new Date(timestamp?.seconds * 1000)}
														</Moment>
													</Text>
												)}
											</View>
										</View>
									),
							)}
						</ScrollView>
						<View style={styles.footer}>
							<TextInput
								placeholder="Signal Message"
								style={styles.textInput}
								onSubmitEditing={sendMessageHandler}
								value={input}
								onChangeText={(text) => setInput(text)}
							/>
							<TouchableOpacity
								onPress={sendMessageHandler}
								activeOpacity={0.5}>
								<Ionicons name="send" size={24} color="#2B68E6" />
							</TouchableOpacity>
						</View>
					</>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	sender: {
		padding: 15,
		backgroundColor: 'rgba(170, 180, 187, 0.5);',
		alignSelf: 'flex-start',
		borderRadius: 20,
		margin: 15,
		position: 'relative',
		minWidth: 150,
		maxWidth: 230,
	},
	senderText: {
		color: 'white',
		fontWeight: '500',
		marginLeft: 10,
		marginBottom: 15,
	},
	senderName: {
		left: 10,
		paddingRight: 10,
		fontSize: 10,
		color: 'white',
	},
	reciever: {
		padding: 15,
		backgroundColor: '#c6b8c7',
		alignSelf: 'flex-end',
		borderRadius: 20,
		marginRight: 15,
		marginBottom: 20,
		position: 'relative',
		color: 'black',
		border: '1px solid #c6b8c7',
		minWidth: 150,
		maxWidth: 230,
	},
	recieverText: {
		color: 'black',
		fontWeight: '500',
		marginTop: 10,
	},
	inner: {
		paddingTop: 15,
	},
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		padding: 15,
	},
	textInput: {
		bottom: 0,
		height: 40,
		flex: 1,
		marginRight: 15,
		borderColor: 'transparent',
		backgroundColor: '#ECECEC',
		borderWidth: 1,
		padding: 10,
		paddingLeft: 20,
		color: 'grey',
		borderRadius: 30,
	},
	btnContainer: {
		backgroundColor: 'white',
		marginTop: 12,
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
	},
	name: {
		fontWeight: 'bold',
		marginLeft: 14,
		fontSize: 15,
	},
	time: {
		marginTop: 3,
		color: '#2B68E6',
		fontWeight: 'bold',
	},
})
