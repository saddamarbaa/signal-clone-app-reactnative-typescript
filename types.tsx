/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import {
	CompositeScreenProps,
	NavigatorScreenParams,
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type RootStackParamList = {
	Root: NavigatorScreenParams<RootTabParamList> | undefined
	NotFound: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, Screen>

export type RootTabParamList = {
	Login: undefined
	SignUp: undefined
	Home: undefined
	AddChat: undefined
	ResetPassword: undefined
	Chat: { id: string; chatName: string }
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<RootTabParamList, Screen>,
		NativeStackScreenProps<RootStackParamList>
	>

// Auth
export interface AuthLoginRequestType {
	email: string
	password: string
}

export interface AutRestPasswordRequestType {
	email: string
	password: string
}

export interface AuthRequestType extends AuthLoginRequestType {
	name: string
	confirmPassword: string
}

export interface MessagesResponseType {
	id: string
	timestamp?: {
		seconds?: number
		nanoseconds?: number
	}
	message: string
	displayName: string
	email: string
	photoURL: string
}

export type ChatRoomType = {
	id: string
	chatName: string
	timestamp?: {
		seconds?: number
		nanoseconds?: number
	}
	photoURL?: string
}
