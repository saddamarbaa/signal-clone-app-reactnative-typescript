import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import {
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	limit,
	serverTimestamp,
	setDoc,
	where,
} from '@firebase/firestore'

import { ListItem, Avatar } from 'react-native-elements'

import { db } from '../config/firebase'
import { truncate } from '../utils'
import { MessagesResponseType } from '../types'

type ListItemProps = {
	id: string
	chatName: string
	enterChatHandler: (id: string, chatName: string) => void
	photoURL?: string
}
export default function LisTlItem({
	id,
	chatName,
	enterChatHandler,
	photoURL,
}: ListItemProps) {
	const [chatMessages, setChatMessages] = useState<MessagesResponseType[] | []>(
		[],
	)

	useEffect(() => {
		let unsubscribe: any
		if (id && chatName) {
			unsubscribe = onSnapshot(
				query(
					collection(db, 'chats', id, chatName),
					orderBy('timestamp', 'desc'),
					limit(10),
				),
				(snapshot) =>
					setChatMessages(
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
	}, [chatName, id])

	return (
		<ListItem
			style={styles.container}
			key={id}
			onPress={() => enterChatHandler(id, chatName)}
			bottomDivider>
			<Avatar
				rounded
				source={{
					uri:
						chatMessages[0]?.photoURL ||
						'https://www.mywebtuts.com/user-defualt-images.jpg',
				}}
			/>
			<ListItem.Content>
				<ListItem.Title style={{ fontWeight: '800' }}>
					{truncate(chatName, 18)}
				</ListItem.Title>
				{chatMessages?.length > 0 && (
					<ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
						{chatMessages?.[0]?.displayName}:{' '}
						{truncate(chatMessages?.[0]?.message, 30)}
					</ListItem.Subtitle>
				)}
			</ListItem.Content>
		</ListItem>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
	},
	textinfo: {
		margin: 10,
		textAlign: 'center',
		fontSize: 17,
	},
})
