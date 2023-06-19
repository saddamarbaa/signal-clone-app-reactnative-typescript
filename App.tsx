import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import { AuthProvider as ContextProvider } from './globalStates'
import { AppNavigator } from './navigation'

export default function App() {
	return (
		<>
			<SafeAreaProvider>
				<StatusBar style="light" />
				<ContextProvider>
					<AppNavigator />
				</ContextProvider>
			</SafeAreaProvider>
		</>
	)
}
