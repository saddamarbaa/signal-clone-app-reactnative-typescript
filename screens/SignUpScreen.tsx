import {
	Alert,
	Image,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { zodResolver } from '@hookform/resolvers/zod'
import { Control, useForm } from 'react-hook-form'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Card, FormButton, FormInput } from '../components'
import { getUserFromAsyncStorage, signUpSchemaValidation } from '../utils'
import { AuthRequestType, SignUpScreenProps } from '../types'
import { GlobalStyles } from '../constants'
import {
	auth,
	signInWithEmailAndPassword,
	googleProvider,
	signInWithPopup,
	GoogleAuthProvider,
	db,
	createUserWithEmailAndPassword,
	updateProfile,
} from '../config/firebase'

import { FirebaseError } from 'firebase/app'

const Logo = require('../assets/images/Signal2.png')

export function SignUpScreen({ route, navigation }: SignUpScreenProps) {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<AuthRequestType>({
		resolver: zodResolver(signUpSchemaValidation),
	})

	const onSignUpPress = async (data: AuthRequestType) => {
		try {
			// Create user with email and password
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password,
			)
			const user = userCredential.user

			// console.log('Signed in', userCredential)

			// Update Profile
			await updateProfile(user, {
				displayName: data.name,
				photoURL: 'https://www.mywebtuts.com/user-defualt-images.jpg',
			})

			// await AsyncStorage.setItem('user', user.displayName)

			console.log('User Profile Updated Successfully')
			// Redirect to login
			navigation.navigate('SignIn')
		} catch (error) {
			// Handle errors
			const errorCode = error.code
			const errorMessage = error.message
			Alert.alert(errorMessage)
		}
	}
	const onSignInPressed = () => {
		getUserFromAsyncStorage()
		navigation.navigate('SignIn')
	}

	const signInWithGoogleHandler = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider)
			const credential = GoogleAuthProvider.credentialFromResult(result)
			const token = credential?.accessToken
			const user = result.user
			navigation.replace('AuthenticatedStack')
			// console.log(result, user);
		} catch (error: unknown) {
			const firebaseError = error as FirebaseError
			const errorCode = firebaseError.code
			const errorMessage = firebaseError.message
			const email = firebaseError.customData?.email
			const credential = GoogleAuthProvider.credentialFromError(firebaseError)
			Alert.alert(errorMessage)
		}
	}

	const onSignInWithApplePress = () => {
		console.log('AppleLogin()')
	}

	const onSignInWithFacebookPress = () => {
		console.log('FacebookLogin()')
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
						name="name"
						placeholder="Name"
						control={control as unknown as Control}
						error={!!errors.name}
						errorMessage={errors.name?.message}
						iconType="user"
						autoCapitalize="none"
						autoCorrect={false}
						keyboardType="default"
					/>
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

					<FormInput
						name="password"
						placeholder="Password"
						control={control as unknown as Control}
						error={!!errors.password}
						errorMessage={errors.password?.message}
						iconType="lock"
						secureTextEntry={true}
						label=""
					/>

					<FormInput
						name="confirmPassword"
						placeholder="Confirm Password"
						control={control as unknown as Control}
						error={!!errors.confirmPassword}
						errorMessage={errors.confirmPassword?.message}
						iconType="lock"
						secureTextEntry={true}
						label=""
					/>

					<View style={styles.textPrivate}>
						<Text style={styles.color_textPrivate}>
							By registering, you confirm that you accept our
						</Text>
						<TouchableOpacity
							onPress={() =>
								alert(
									'Terms Clicked! (Redirect to Terms of service and Privacy screen',
								)
							}>
							<Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
								Terms of service
							</Text>
						</TouchableOpacity>
						<Text style={styles.color_textPrivate}> and </Text>
						<Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
							Privacy Policy
						</Text>
					</View>

					<FormButton
						// disabled
						buttonTitle="Sign Up"
						onPress={handleSubmit(onSignUpPress)}
						buttonContainerStyle={[styles.buttonContainer]}
					/>

					{Platform.OS === 'android' || 'web' ? (
						<>
							<FormButton
								buttonTitle="Sign In with Facebook"
								btnType="facebook"
								buttonContainerStyle={[
									{
										backgroundColor: '#e6eaf4',
									},
								]}
								iconSize={18}
								iconColor={GlobalStyles.colors.facebookLogin}
								buttonTextStyle={{
									color: GlobalStyles.colors.facebookLogin,
								}}
								buttonPressedStyle={{
									backgroundColor: 'white',
									opacity: 0.3,
								}}
								onPress={onSignInWithFacebookPress}
							/>

							<FormButton
								buttonTitle="Sign In with Google"
								btnType="google"
								buttonContainerStyle={[
									{
										backgroundColor: GlobalStyles.colors.error30,
									},
								]}
								iconSize={18}
								iconColor={GlobalStyles.colors.googleLogin}
								buttonTextStyle={{
									color: GlobalStyles.colors.googleLogin,
								}}
								buttonPressedStyle={{
									backgroundColor: GlobalStyles.colors.error200,
									opacity: 0.3,
								}}
								onPress={signInWithGoogleHandler}
							/>

							<FormButton
								buttonTitle="Sign In with Apple"
								btnType="apple"
								buttonContainerStyle={[
									{
										backgroundColor: GlobalStyles.colors.appleLogin,
									},
								]}
								iconSize={18}
								iconColor="#FBFBFB"
								buttonTextStyle={{
									color: '#FBFBFB',
								}}
								buttonPressedStyle={{
									backgroundColor: GlobalStyles.colors.gray500,
									opacity: 0.3,
								}}
								onPress={onSignInWithApplePress}
							/>
						</>
					) : null}

					<FormButton
						buttonTitle={'Have an account? Sign In'}
						mode="flat"
						onPress={onSignInPressed}
						buttonContainerStyle={[styles.buttonContainer, styles.navButton]}
					/>
				</Card>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default SignUpScreen
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
	logo: {
		width: 200,
		height: 100,
	},
	buttonContainer: {
		flex: 1,
		marginTop: 5,
	},
	navButton: {
		marginTop: 10,
	},
	textPrivate: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginVertical: 0,
		marginBottom: 10,
		justifyContent: 'center',
	},
	color_textPrivate: {
		fontSize: 14,
		fontWeight: '400',
		color: 'grey',
	},
})
