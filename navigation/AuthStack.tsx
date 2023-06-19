import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
	ConfirmEmailScreen,
	ForgotPasswordScreen,
	SignInScreen,
	SignUpScreen,
} from '../screens'
import { RootStackParamList } from '../types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function AuthStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen name="SignIn" component={SignInScreen} />
			<Stack.Screen name="SignUp" component={SignUpScreen} />
			<Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
			<Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
		</Stack.Navigator>
	)
}
