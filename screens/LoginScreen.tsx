import React from 'react'
import {
	Button,
	Image,
	KeyboardAvoidingView,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import { useForm, Controller, Control } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { Card, FormInput } from '../components'
import { AuthLoginRequestType } from '../types'
import { signInSchemaValidation } from '../utils'
import FormButton from '../components/FormButton'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Logo = require('../assets/Signal2.png')

export function LoginScreen() {
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<AuthLoginRequestType>({
		resolver: zodResolver(signInSchemaValidation),
	})

	const onSubmit = (data: AuthLoginRequestType) => {
		console.log(data)
		// Perform login or form submission logic here
	}

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.root}>
			<ScrollView
				contentContainerStyle={styles.scrollViewContent}
				showsVerticalScrollIndicator={false}>
				<Card style={styles.container}>
					<Image source={Logo} style={styles.logo} />
					<FormInput
						label=""
						name="email"
						placeholder="Email"
						control={control as unknown as Control}
						error={!!errors.email}
						errorMessage={errors.email?.message}
						// iconType="mail"
						autoCapitalize="none"
						autoCorrect={false}
						keyboardType="email-address"
					/>

					<FormInput
						name="password"
						placeholder="Password"
						control={control as unknown as Control}
						error={!!errors.password}
						errorMessage={errors.password?.message}
						// iconType="lock"
						secureTextEntry={true}
						label=""
					/>

					<FormButton
						// disabled={isFormInvalid}
						buttonTitle={'Sign In'}
						onPress={handleSubmit(onSubmit)}
						buttonContainerStyle={[styles.buttonContainer]}
					/>

					<FormButton
						// disabled={isFormInvalid}
						buttonTitle={'Forgot Password?'}
						mode="flat"
						// onPress={handleSubmit(onSubmit)}
						buttonContainerStyle={[styles.buttonContainer, styles.navButton]}
					/>
				</Card>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default LoginScreen

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#F9FBFC',
	},
	container: {
		width: '80%',
		maxWidth: 450,
		alignItems: 'center',
		marginLeft: 'auto',
		marginRight: 'auto',
		padding: 20,
	},
	scrollViewContent: {
		flexGrow: 1,
		paddingTop: 40,
		paddingBottom: 40,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		width: 200,
		height: 100,
	},
	buttonContainer: {
		flex: 1,
		marginTop: 13,
	},
	navButton: {
		width: '100%',
		fontSize: 18,
		fontWeight: '500',
	},
})
