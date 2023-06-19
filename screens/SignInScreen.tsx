import {
	Alert,
	Image,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
} from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { zodResolver } from '@hookform/resolvers/zod'
import { Control, useForm } from 'react-hook-form'

import { Card, FormButton, FormInput } from '../components'
import { AuthLoginRequestType, AuthUserType, SignInScreenProps } from '../types'
import { GlobalStyles } from '../constants'
import { signInSchemaValidation } from '../utils'
import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase'
import { FirebaseError } from 'firebase/app'
import { useAuthContext } from '../globalStates'

const Logo = require('../assets/images/Signal2.png')

export function SignInScreen({ route, navigation }: SignInScreenProps) {
	const {
		state: { isAuthenticated, user },
		login,
		logout,
	} = useAuthContext()

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<AuthLoginRequestType>({
		resolver: zodResolver(signInSchemaValidation),
	})

	const onSignInPressed = async (data: AuthLoginRequestType) => {
		try {
			console.log(JSON.stringify(data, null, 2))

			const userCredential = await signInWithEmailAndPassword(
				auth,
				data.email,
				data.password,
			)
			const user = userCredential.user

			// Extract the necessary user information
			const { uid, displayName, email, photoURL, emailVerified, isAnonymous } =
				user

			// Create the updated user object
			const updatedUser: AuthUserType = {
				name: displayName,
				email: email,
				uuid: uid,
				photoURL: photoURL || '',
				emailVerified: emailVerified || false,
				isAnonymous: isAnonymous || false,
			}

			// Update the user in the context
			login(updatedUser)
		} catch (error) {
			const errorCode = error.code
			const errorMessage = error.message
			alert(errorMessage)
		}
	}

	const onForgotPasswordPressed = () => {
		navigation.navigate('ForgotPassword')
	}

	const onSignUpPress = () => {
		navigation.navigate('SignUp')
	}

	const onSignInWithGooglePress = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider)
			const credential = GoogleAuthProvider.credentialFromResult(result)
			const token = credential?.accessToken
			const user = result.user
			navigation.replace('AuthenticatedStack')
			console.log(result, user)
		} catch (error: unknown) {
			console.log(error)
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
					<FormButton
						// disabled
						buttonTitle={'Sign In'}
						onPress={handleSubmit(onSignInPressed)}
						buttonContainerStyle={[styles.buttonContainer]}
					/>

					<FormButton
						// disabled={isFormInvalid}
						buttonTitle={'Forgot Password?'}
						mode="flat"
						onPress={onForgotPasswordPressed}
						buttonContainerStyle={[styles.buttonContainer, styles.navButton]}
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
								onPress={onSignInWithGooglePress}
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
						buttonTitle={"Don't have an account? Create Once"}
						mode="flat"
						onPress={onSignUpPress}
						buttonContainerStyle={[styles.buttonContainer, styles.navButton]}
					/>
				</Card>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default SignInScreen
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
})
