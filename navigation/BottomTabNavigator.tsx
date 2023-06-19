import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { RootStackParamList } from '../types'
import {
	AddChatScreen,
	ChatScreen,
	HomeScreen,
	ProfileScreen,
} from '../screens'
import { FormButton } from '../components'
import { useAuthContext } from '../globalStates'
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { GlobalStyles } from '../constants'

const Tab = createBottomTabNavigator<RootStackParamList>()

export function BottomTabNavigator() {
	const { logout } = useAuthContext()
	const navigation = useNavigation()

	const handleGoBack = () => {
		navigation.goBack()
	}

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerStyle: { backgroundColor: GlobalStyles.colors.mainBackground },
				headerTintColor: GlobalStyles.colors.textSecondary,
				headerTitleAlign: 'center',
				headerShown: true,
				tabBarShowLabel: false,
				tabBarStyle: {
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				},
				headerLeft: ({ tintColor }) => (
					<FormButton
						isIconButton
						iconName="arrow-back"
						iconSize={27}
						iconColor={tintColor}
						onPress={handleGoBack}
						buttonContainerStyle={styles.buttonContainerStyle}
					/>
				),
			})}>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={({ route }) => ({
					title: 'Home',
					tabBarLabel: 'Home',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home" size={24} color={color} />
					),
				})}
			/>

			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={({ route }) => ({
					title: 'Profile',
					tabBarLabel: 'Profile',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person" size={24} color={color} />
					),
				})}
			/>

			<Tab.Screen
				name="AddChat"
				component={AddChatScreen}
				options={({ route }) => ({
					headerShown: true,
					title: 'Add Chat',
					tabBarButton: () => null,
				})}
			/>

			<Tab.Screen
				name="Chat"
				component={ChatScreen}
				options={({ route }) => ({
					title: '',
					tabBarButton: () => null,
				})}
			/>
		</Tab.Navigator>
	)
}

export default BottomTabNavigator

const styles = StyleSheet.create({
	buttonContainerStyle: {},
})
