import React, { useEffect, useState } from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'

import { GlobalStyles } from '../constants'
import { LoadingOverlay } from '../components'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuthContext } from '../globalStates'
import { AuthStack } from './AuthStack'
import { MainAppStack } from './MainAppStack'

export function AppNavigator() {
	const {
		state: { isAuthenticated, user },
		login,
		logout,
	} = useAuthContext()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const checkAuthenticationStatus = async () => {
			setIsLoading(true)
			try {
				// Perform async task here (e.g., check authentication status)
				// For example, retrieve the user from AsyncStorage
				const storedUser = await AsyncStorage.getItem('user')
				// If user exists, set isAuthenticated to true and update the user in context
				if (storedUser) {
					try {
						const parsedUser = JSON.parse(storedUser)
						login(parsedUser)
						setIsLoading(false)
					} catch (error) {
						console.error('Error parsing user data:', error)
						// Handle the parsing error by treating it as if no user is found
						login(null)
					}
				}
			} catch (error) {
				console.error('Error checking authentication status:', error)
			} finally {
				// Update isLoading state once finished
				setIsLoading(false)
			}
		}

		checkAuthenticationStatus()
	}, [])

	// console.log('Is Authenticated:', isAuthenticated)
	// console.log('User:', user)
	// console.log('Loading:', isLoading)

	if (isLoading) {
		return <LoadingOverlay />
	}

	const theme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			primary: GlobalStyles.colors.primary500,
			background: GlobalStyles.colors.mainBackground,
		},
	}

	return (
		<NavigationContainer theme={theme}>
			{user ? <MainAppStack /> : <AuthStack />}
		</NavigationContainer>
	)
}

export default AppNavigator
