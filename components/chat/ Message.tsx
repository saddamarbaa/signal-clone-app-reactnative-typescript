import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Moment from 'moment'

import { useAuthContext } from '../../globalStates'
import { MessagesResponseType } from '../../types'
import Avatar from './Avatar'

type Props = {
	messageItem: MessagesResponseType
}

export function Message({ messageItem }: Props) {
	const {
		state: { isAuthenticated, user },
		login,
		logout,
	} = useAuthContext()

	const { id, photoURL, displayName, message, timestamp, email } = messageItem

	const isSender = email === user?.email

	return (
		<View
			style={[styles.container, isSender ? styles.sender : styles.receiver]}>
			<View style={styles.content}>
				<Avatar
					size={35}
					source={{
						uri:
							photoURL || 'https://www.mywebtuts.com/user-defualt-images.jpg',
					}}
				/>
				<Text style={isSender ? styles.name : styles.receiverName}>
					{displayName}
				</Text>
			</View>
			<View>
				<Text style={isSender ? styles.messageText : styles.receiverText}>
					{message}
				</Text>
			</View>
			<View>
				{timestamp?.seconds && (
					<Text style={[styles.time, isSender && { color: 'white' }]}>
						{Moment.unix(timestamp?.seconds).fromNow()}
					</Text>
				)}
			</View>
		</View>
	)
}

export default Message

const styles = StyleSheet.create({
	container: {
		padding: 15,
		borderRadius: 20,
		marginVertical: 10,
		alignSelf: 'flex-start',
		maxWidth: 230,
	},
	sender: {
		backgroundColor: '#5C9DED',
		alignSelf: 'flex-end',
	},
	receiver: {
		backgroundColor: '#ECECEC',
		alignSelf: 'flex-start',
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
	},
	name: {
		fontWeight: 'bold',
		marginLeft: 10,
		fontSize: 15,
		color: 'white', // Set text color to white for sender
	},
	messageText: {
		fontWeight: '500',
		marginTop: 10,
		color: 'white', // Set text color to white for sender
	},
	receiverName: {
		fontWeight: 'bold',
		marginLeft: 10,
		fontSize: 15,
		color: 'black', // Set text color to black for receiver
	},
	receiverText: {
		fontWeight: '500',
		marginTop: 10,
		color: 'black', // Set text color to black for receiver
	},
	time: {
		marginTop: 3,
		fontWeight: 'bold',
	},
})
