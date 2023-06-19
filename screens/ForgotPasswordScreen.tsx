import { SafeAreaView, StyleSheet, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { zodResolver } from '@hookform/resolvers/zod'
import { Control, useForm } from 'react-hook-form'

import { Card, FormButton, FormInput } from '../components'
import { restPasswordSchemaValidation } from '../utils'
import { AutRestPasswordRequestType, ForgotPasswordScreenProps } from '../types'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../config/firebase'
import { FirebaseError } from 'firebase/app'
import { Alert } from 'react-native'

export function ForgotPasswordScreen({
	route,
	navigation,
}: ForgotPasswordScreenProps) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<AutRestPasswordRequestType>({
		resolver: zodResolver(restPasswordSchemaValidation),
	})

	const onResetPasswordPressed = async (data: AutRestPasswordRequestType) => {
		try {
			console.log(JSON.stringify(data, null, 2))
			const userCredential = await sendPasswordResetEmail(auth, data.email)

			Alert.alert(
				'Password Reset Link Sent',
				`A password reset link has been sent to ${data.email}. Please check your email.`,
				[
					{
						text: 'OK',
						onPress: () => navigation.navigate('SignIn'),
					},
				],
			)
		} catch (error: unknown) {
			const firebaseError = error as FirebaseError
			const errorCode = firebaseError?.code
			const errorMessage = firebaseError?.message
			Alert.alert('Error', errorMessage || 'Bad user credentials')
		}
	}

	const onSignInPressed = () => {
		navigation.navigate('SignIn')
	}

	return (
		<SafeAreaView style={styles.root}>
			<ScrollView
				contentContainerStyle={styles.scrollViewContent}
				showsVerticalScrollIndicator={false}>
				<Card style={styles.container}>
					<Text style={styles.text}>Reset your password</Text>

					<FormInput
						label=""
						name="email"
						placeholder="Email"
						control={control as unknown as Control}
						error={!!errors.email}
						errorMessage={errors.email?.message}
						iconType="mail"
						autoCapitalize="none"
						autoCorrect={false}
						keyboardType="email-address"
					/>

					<FormButton
						buttonTitle={'Send'}
						onPress={handleSubmit(onResetPasswordPressed)}
						buttonContainerStyle={[styles.buttonContainer]}
					/>

					<FormButton
						buttonTitle={'Back to Sign in?'}
						mode="flat"
						onPress={onSignInPressed}
						buttonContainerStyle={[styles.buttonContainer, styles.navButton]}
					/>
				</Card>
			</ScrollView>
		</SafeAreaView>
	)
}

export default ForgotPasswordScreen
const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#F9FBFC',
	},
	container: {
		width: '85%',
		maxWidth: 450,
		alignItems: 'center',
		marginLeft: 'auto',
		marginRight: 'auto',
		padding: 20,
		paddingTop: 0,
	},
	inputContainerStyle: {
		marginTop: 0,
	},
	scrollViewContent: {
		flexGrow: 1,
		paddingTop: 40,
		paddingBottom: 40,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonContainer: {
		flex: 1,
		marginTop: 5,
	},
	navButton: {
		marginTop: 10,
		width: '100%',
		fontWeight: '500',
	},
	text: {
		fontSize: 25,
		// marginTop: 15,
		marginBottom: 25,
		color: '#051d5f',
	},
})
