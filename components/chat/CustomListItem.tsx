import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
	collection,
	onSnapshot,
	query,
	orderBy,
	limit,
	Unsubscribe,
} from '@firebase/firestore'
import { MessagesResponseType } from '../../types/chat'
import { db } from '../../config/firebase'
import Avatar from './Avatar'
import { truncate } from '../../utils'

type Props = {
	id: string
	chatName: string
	enterChatHandler: (id: string, chatName: string) => void
	photoURL?: string
}

export const CustomListItem: React.FC<Props> = ({
	id,
	chatName,
	enterChatHandler,
	photoURL,
}) => {
	const [chatMessages, setChatMessages] = useState<
		MessagesResponseType[] | undefined
	>()

	useEffect(() => {
		let unsubscribe: Unsubscribe | undefined
		if (id && chatName) {
			const chatRef = collection(db, 'chats', id, chatName)
			const chatQuery = query(chatRef, orderBy('timestamp', 'desc'), limit(10))

			unsubscribe = onSnapshot(chatQuery, (snapshot) => {
				const updatedChatMessages: MessagesResponseType[] = snapshot.docs.map(
					(doc) => {
						const { id, timestamp, message, displayName, email, photoURL } =
							doc.data()
						return {
							id: doc.id || '',
							timestamp,
							message,
							displayName,
							email,
							photoURL,
						}
					},
				)
				setChatMessages(updatedChatMessages)
			})
		}

		return () => {
			if (unsubscribe) {
				unsubscribe()
			}
		}
	}, [chatName, id])

	return (
		<TouchableOpacity
			style={styles.container}
			key={id}
			onPress={() => enterChatHandler(id, chatName)}>
			<View style={styles.avatarContainer}>
				<Avatar
					source={{
						uri:
							chatMessages?.[0]?.photoURL ||
							'https://www.mywebtuts.com/user-defualt-images.jpg',
					}}
				/>
			</View>
			<View style={styles.contentContainer}>
				<Text style={styles.title}>{truncate(chatName, 18)}</Text>
				{chatMessages?.length ? (
					<Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
						{chatMessages?.[0]?.displayName}:{' '}
						{truncate(chatMessages?.[0]?.message, 30)}
					</Text>
				) : (
					<Text style={styles.emptySubtitle}>No messages yet</Text>
				)}
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 16,
	},
	avatarContainer: {
		marginRight: 10,
	},
	contentContainer: {
		flex: 1,
	},
	title: {
		fontWeight: '800',
		fontSize: 16,
		marginBottom: 2,
		color: '#000',
	},
	subtitle: {
		fontSize: 14,
		color: '#888',
	},
	emptySubtitle: {
		fontSize: 14,
		fontStyle: 'italic',
		color: '#888',
	},
})

export default CustomListItem
