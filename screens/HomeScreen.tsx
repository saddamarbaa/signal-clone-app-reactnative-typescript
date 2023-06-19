import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { useEffect, useLayoutEffect, useState } from 'react'
import {
	FlatList,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import {
	collection,
	limit,
	onSnapshot,
	query,
	orderBy,
} from 'firebase/firestore'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { useAuthContext } from '../globalStates'
import { HomeScreenProps } from '../types'

import { ChatRoomType } from '../types/chat'
import { db } from '../config/firebase'
import { Avatar, CustomListItem, LoadingOverlay } from '../components'

export function HomeScreen({ route, navigation }: HomeScreenProps) {
	const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [refreshing, setRefreshing] = useState(false)

	const {
		state: { user },
		logout,
	} = useAuthContext()

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Signal',
			headerStyle: { backgroundColor: 'white' },
			headerTintColor: 'black',
			headerTitleStyle: {
				fontWeight: 'bold',
				fontSize: 20,
				color: '#000000',
			},
			headerTitleAlign: 'center',
			headerLeft: () => (
				<View style={{ marginLeft: 20 }}>
					<TouchableOpacity onPress={handleLogout} activeOpacity={0.5}>
						{user?.photoURL ? (
							<Avatar source={{ uri: user?.photoURL }} size={40} />
						) : (
							<FontAwesome name="user-circle" size={30} color="black" />
						)}
					</TouchableOpacity>
				</View>
			),
			headerRight: () => (
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'flex-end',
						width: 80,
						marginRight: 20,
					}}>
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
			query(collection(db, 'chats'), orderBy('timestamp', 'desc'), limit(100)),
			(snapshot) => {
				const chatRoomsData = snapshot.docs.map((doc) => ({
					id: doc.id,
					timestamp: doc.data().timestamp,
					chatName: doc.data().chatName,
					photoURL: doc.data().photoURL,
				}))

				setChatRooms(chatRoomsData)
				setIsLoading(false)
			},
		)

		return () => {
			unsubscribe()
		}
	}, [navigation])

	const handleRefresh = () => {
		setRefreshing((prevState) => !prevState)
	}

	const myItemSeparator = () => {
		return <View style={{ backgroundColor: 'grey' }} />
	}

	const myListEmpty = () => {
		return null
	}

	const startChatHandler = (id: string, chatName: string) => {
		navigation.navigate('Chat', {
			id,
			chatName,
		})
	}

	const handleLogout = () => {
		logout()
	}

	const renderItem = ({ item }: { item: ChatRoomType }) => (
		<CustomListItem
			id={item.id}
			chatName={item.chatName}
			photoURL={item.photoURL}
			enterChatHandler={startChatHandler}
		/>
	)

	if (isLoading) {
		return <LoadingOverlay />
	}

	return (
		<SafeAreaView style={styles.wrapper}>
			<View style={styles.listContainer}>
				<FlatList
					alwaysBounceVertical={false}
					renderItem={renderItem}
					data={chatRooms}
					keyExtractor={(item) => item.id}
					ItemSeparatorComponent={myItemSeparator}
					ListEmptyComponent={myListEmpty}
					refreshing={refreshing}
					onRefresh={handleRefresh}
				/>
			</View>
		</SafeAreaView>
	)
}

export default HomeScreen

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	droidSafeArea: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? 25 : 10,
		margin: 15,
	},
	logsContainer: {
		flexDirection: 'column',
	},
	listContainer: {
		flex: 1,
		flexDirection: 'column',
		paddingVertical: 5,
	},
})
