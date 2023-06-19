import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
	NativeStackNavigationProp,
	NativeStackScreenProps,
} from '@react-navigation/native-stack'
import {
	DrawerNavigationProp,
	DrawerScreenProps,
} from '@react-navigation/drawer'

// Define the types for your stack navigator screens
export type RootStackParamList = {
	AuthenticatedStack: undefined
	SignIn: undefined
	SignUp: undefined
	ForgotPassword: undefined
	ConfirmEmail: undefined
	NewPassword: undefined
	Home: undefined
	Details: {
		id: string | number
		otherParam?: string
	}
	AddChat: undefined
	Profile: {
		userId: string
	}
	Chat: { id: string; chatName: string }
}

export type ForgotPasswordScreenProps = NativeStackScreenProps<
	RootStackParamList,
	'ForgotPassword'
>

export type SignInScreenProps = NativeStackScreenProps<
	RootStackParamList,
	'SignIn'
>

export type SignUpScreenProps = NativeStackScreenProps<
	RootStackParamList,
	'SignUp'
>

export type ConfirmEmailScreenProps = NativeStackScreenProps<
	RootStackParamList,
	'ConfirmEmail'
>

export type AuthenticatedStackScreenProps = NativeStackScreenProps<
	RootStackParamList,
	'AuthenticatedStack'
>

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>

export type ProfileScreenProps = NativeStackScreenProps<
	RootStackParamList,
	'Profile'
>

export type DetailsScreenProps = NativeStackScreenProps<
	RootStackParamList,
	'Details'
>


export type AddChatScreenProps = NativeStackScreenProps<
	RootStackParamList,
	'AddChat'
>



export type ChatScreenProps = NativeStackScreenProps<
	RootStackParamList,
	'Chat'
>
