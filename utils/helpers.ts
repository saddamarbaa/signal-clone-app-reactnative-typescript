import AsyncStorage from '@react-native-async-storage/async-storage'

import { Dimensions } from 'react-native'
export const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height

export function truncate(text: string, maxLength: number): string {
	if (text.length > maxLength) {
		return text.substring(0, maxLength - 3) + '...'
	}
	return text
}

// Storing data
export const storeUserInAsyncStorage = async (value: any) => {
	try {
		await AsyncStorage.setItem('user', JSON.stringify(value))
	} catch (error) {
		console.log(error)
	}
}

// Getting data
export const getUserFromAsyncStorage = async (): Promise<any> => {
	try {
		const userData = await AsyncStorage.getItem('user')
		if (userData) {
			return JSON.parse(userData)
		} else {
			return null
		}
	} catch (error) {
		console.log(error)
		return null
	}
}
