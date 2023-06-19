import React from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { useAuthContext } from '../globalStates'
import { GlobalStyles } from '../constants'
import { ProfileScreenProps } from '../types'
import { FormButton } from '../components'

export const ProfileScreen = ({ route, navigation }: ProfileScreenProps) => {
	const {
		state: { user },
		logout,
	} = useAuthContext()

	const handleLogout = () => {
		logout()
	}

	return (
		<View style={styles.container}>
			<View style={styles.profileContainer}>
				<View style={styles.profileImageContainer}>
					{user?.photoURL ? (
						<Image
							source={{ uri: user.photoURL }}
							style={styles.profileImage}
						/>
					) : (
						<View style={styles.profileIconContainer}>
							<FontAwesome
								name="user-circle"
								size={80}
								style={styles.profileIcon}
							/>
							{!user?.photoURL && (
								<ActivityIndicator
									size="large"
									color={GlobalStyles.colors.primary500}
								/>
							)}
						</View>
					)}
				</View>
				<Text style={styles.username}>{user?.name}</Text>
				<Text style={styles.email}>{user?.email}</Text>
			</View>

			<FormButton
				buttonTitle="Log Out"
				btnType="arrow-right"
				buttonContainerStyle={[
					{
						...styles.buttonContainer,
					},
				]}
				iconSize={20}
				buttonPressedStyle={{
					opacity: 0.3,
				}}
				buttonTextStyle={{
					marginLeft: 5,
				}}
				onPress={handleLogout}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
	},
	profileContainer: {
		alignItems: 'center',
		marginBottom: 30,
	},
	profileImageContainer: {
		width: 120,
		height: 120,
		borderRadius: 60,
		overflow: 'hidden',
		marginBottom: 10,
	},
	profileImage: {
		width: '100%',
		height: '100%',
	},
	profileIconContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	profileIcon: {
		marginBottom: 10,
	},
	username: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	email: {
		fontSize: 16,
		color: GlobalStyles.colors.textSecondary,
	},
	buttonContainer: {
		maxHeight: 44,
		maxWidth: 200,
		marginTop: 0,
	},
})
export default ProfileScreen
