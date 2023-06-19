import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
	FlatList,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native'

import { AntDesign, Ionicons, SimpleLineIcons } from '@expo/vector-icons'

import {
	addDoc,
	collection,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	Unsubscribe,
} from '@firebase/firestore'

import { ChatScreenProps, MessagesResponseType } from '../types'
import { truncate } from '../utils'
import { Avatar, LoadingOverlay, Message } from '../components'
import { db } from '../config/firebase'
import { useAuthContext } from '../globalStates'

export function ChatScreen({ route, navigation }: ChatScreenProps) {
	const [input, setInput] = useState('')
	const [messages, setMessages] = useState<MessagesResponseType[] | []>([])
	const [isLoading, setIsLoading] = useState(true)
	const [refreshing, setRefreshing] = useState(false)
	const {
		state: { isAuthenticated, user },
		login,
		logout,
	} = useAuthContext()

	useEffect(() => {
		let unsubscribe: Unsubscribe | undefined
		if (route?.params?.id && route?.params?.chatName) {
			unsubscribe = onSnapshot(
				query(
					collection(db, 'chats', route?.params?.id, route?.params?.chatName),
					orderBy('timestamp', 'desc'),
				),
				(snapshot) => {
					setMessages(
						snapshot.docs.map((doc) => ({
							id: doc.id && doc.id,
							timestamp: doc.data().timestamp,
							message: doc.data().message,
							displayName: doc.data().displayName,
							email: doc.data().email,
							photoURL: doc.data().photoURL,
						})),
					)
					setIsLoading(false)
				},
			)
		}

		return () => {
			unsubscribe()
		}
	}, [db, route?.params])

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
						size={40}
						source={{
							uri:
								messages[0]?.photoURL ||
								'https://www.mywebtuts.com/user-defualt-images.jpg',
						}}
					/>

					<Text
						style={{
							marginLeft: 10,
							fontWeight: '700',
							fontSize: 22,
						}}>
						{truncate(route?.params?.chatName, 10)}
					</Text>
				</View>
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
						<AntDesign name="camerao" size={20} color="black" />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate('AddChat')}
						activeOpacity={0.5}>
						<SimpleLineIcons name="pencil" size={20} color="black" />
					</TouchableOpacity>
				</View>
			),
		})
	}, [navigation, messages])

	const sendMessageHandler = async () => {
		Keyboard.dismiss() // Hide the keyboard after sending message

		if (input && route?.params?.id && route?.params?.chatName) {
			// console.log(input, user?.name, user?.photoURL)
			const data = {
				timestamp: serverTimestamp(),
				message: input,
				displayName: user?.name,
				email: user?.email,
				photoURL: user?.photoURL,
			}

			try {
				const docRef = await addDoc(
					collection(db, 'chats', route?.params?.id, route?.params?.chatName),
					data,
				)
				console.log('Document written with ID: ', docRef.id)
				setInput('')
			} catch (error) {
				console.log('Adding new docs fail: ', error)
				if (error && error?.message) {
					alert(error?.message)
				}
			}
		}
	}

	const handleRefresh = () => {
		setRefreshing((prevState) => !prevState)
	}

	const myItemSeparator = () => {
		return <View style={{ backgroundColor: 'grey' }} />
	}

	const myListEmpty = () => {
		return null
	}

	const renderItem = ({ item }: { item: MessagesResponseType }) => {
		return <Message messageItem={item} />
	}

	if (isLoading) {
		return <LoadingOverlay />
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.container}
				keyboardVerticalOffset={90}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<>
						<View style={styles.inner}>
							<FlatList
								alwaysBounceVertical={false}
								renderItem={renderItem}
								data={messages}
								keyExtractor={(item) => item.id}
								ItemSeparatorComponent={myItemSeparator}
								ListEmptyComponent={myListEmpty}
								refreshing={refreshing}
								onRefresh={handleRefresh}
								showsVerticalScrollIndicator={false}
							/>
						</View>
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
		padding: 20,
	},
	inner: {
		flex: 1,
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
})

export default ChatScreen
