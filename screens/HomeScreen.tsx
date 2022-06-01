import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackActions } from '@react-navigation/native'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Avatar } from 'react-native-elements'
import {
	addDoc,
	collection,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	limit,
	serverTimestamp,
} from '@firebase/firestore'

import CustomListItem from '../components/CustomListItem'
import { auth, db, signOut } from '../config/firebase'
import { RootTabScreenProps, ChatRoomType } from '../types'

import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
	const [user, loading, error] = useAuthState(auth)
	const [chatRooms, setChatRooms] = useState<ChatRoomType[] | []>([])

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
					<TouchableOpacity onPress={handleLogOut} activeOpacity={0.5}>
						<Avatar
							rounded
							source={user?.photoURL || require('../assets/tem3.png')}
						/>
					</TouchableOpacity>
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
	}, [navigation, user])

	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(collection(db, 'chats'), orderBy('timestamp', 'desc'), limit(20)),
			(snapshot) =>
				setChatRooms(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						timestamp: doc.data()?.timestamp,
						chatName: doc.data()?.chatName,
						photoURL: doc.data()?.photoURL,
						// ...doc.data(),
					})),
				),
		)

		return () => {
			unsubscribe()
		}
	}, [navigation])

	function handleLogOut() {
		signOut(auth)
			.then(function () {
				// Sign-out successful.
				console.log('User Logged Out!')
				navigation.dispatch(StackActions.replace('Login'))
			})
			.catch(function (error) {
				// An error happened.
				console.log(error)
			})
	}

	const startChatHandler = (id: string, chatName: string) => {
		navigation.navigate('Chat', {
			id,
			chatName,
		})
	}

	return (
		<SafeAreaView style={styles.wrapper}>
			<ScrollView style={styles.container}>
				{chatRooms.map(({ id, chatName, photoURL }) => (
					<CustomListItem
						key={id}
						id={id}
						chatName={chatName}
						photoURL={photoURL}
						enterChatHandler={startChatHandler}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		alignItems: 'center',
		flex: 1,
	},
	container: {
		width: '100%',
		height: '100%',
	},
})
