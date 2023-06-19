import React, { createContext, useReducer, useContext, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Define the User type
import { AuthUserType } from '../../types'
import { auth } from '../../config/firebase'

// Define the state shape for authentication
type AuthState = {
	isAuthenticated: boolean
	user: AuthUserType | null
}

// Define the action types as constants
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

// Define the possible actions for authentication
type AuthAction =
	| { type: typeof LOGIN; payload: { user: AuthUserType } }
	| { type: typeof LOGOUT }

// Define the context type
type AuthContextProps = {
	state: AuthState
	login: (user: AuthUserType) => void
	logout: () => void
}

// Create the AuthContext
const AuthContext = createContext<AuthContextProps>({
	state: {
		isAuthenticated: false,
		user: null,
	},
	login: () => {},
	logout: () => {},
})

// Define the reducer function to handle state updates
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.user,
			}
		case LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				user: null,
			}
		default:
			return state
	}
}

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	// Set the initial state
	const initialState: AuthState = {
		isAuthenticated: false,
		user: null,
	}

	// Use the authReducer with the initial state
	const [state, dispatch] = useReducer(authReducer, initialState)

	// Define the login action
	const login = async (user: AuthUserType) => {
		try {
			await AsyncStorage.setItem('user', JSON.stringify(user))
			dispatch({ type: LOGIN, payload: { user } })
			// Store the user in AsyncStorage
		} catch (error) {
			console.log('Error storing user data:', error)
		}
	}

	// Define the logout action
	const logout = async () => {
		// Remove the user from AsyncStorage
		auth.signOut()
		try {
			await AsyncStorage.removeItem('user')
		} catch (error) {
			console.log('Error removing user data:', error)
		}

		dispatch({ type: LOGOUT })
	}

	// Create the authContextValue object
	const authContextValue: AuthContextProps = {
		state,
		login,
		logout,
	}

	// Provide the authContextValue to the children components
	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	)
}

// Custom hook to access the AuthContext
export const useAuthContext = () => useContext(AuthContext)
