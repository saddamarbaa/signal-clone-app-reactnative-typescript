import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { View, Text } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../constants'
import { LoginScreen } from '../screens'

export function WelcomeScreen() {
	return (
		<View>
			<Text>App</Text>
		</View>
	)
}

export function SignupScreen() {
	return (
		<View>
			<Text>App</Text>
		</View>
	)
}

const Stack = createNativeStackNavigator()

function AuthStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				// headerStyle: { backgroundColor: GlobalStyles?.colors.primary500 },
				headerTintColor: 'white',
				// contentStyle: { backgroundColor: GlobalStyles?.colors.primary100 },
			}}>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen name="Signup" component={SignupScreen} />
		</Stack.Navigator>
	)
}

function AuthenticatedStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: GlobalStyles?.colors.primary500 },
				headerTintColor: 'white',
				contentStyle: { backgroundColor: GlobalStyles?.colors.primary100 },
			}}>
			<Stack.Screen name="Welcome" component={WelcomeScreen} />
		</Stack.Navigator>
	)
}

export function AppNavigator() {
	// const MyTheme = {
	// 	...DefaultTheme,
	// 	colors: {
	// 		...DefaultTheme.colors,
	// 		primary: 'rgb(255, 45, 85)',
	// 		background: GlobalStyles.colors.primary700,
	// 	},
	// }

	return (
		<NavigationContainer>
			<AuthStack />
		</NavigationContainer>
	)
}

export default AppNavigator
