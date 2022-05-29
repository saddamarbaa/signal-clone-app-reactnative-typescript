import {
	View,
	Text,
	StyleSheet,
	Image,
	TextInput,
	Button,
	Pressable,
	KeyboardAvoidingView,
} from 'react-native'
import React from 'react'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { LoginSchemaValidation } from '../utils'
import { RootTabScreenProps, AuthLoginRequestType } from '../types'
import { auth, signInWithEmailAndPassword } from '../config/firebase'

export default function LoginScreen({
	navigation,
}: RootTabScreenProps<'Login'>) {
	const user = auth.currentUser

	console.log(user)
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<AuthLoginRequestType>({
		resolver: yupResolver(LoginSchemaValidation),
	})

	const onSubmit = (data: AuthLoginRequestType) => {
		console.log(JSON.stringify(data, null, 2))

		signInWithEmailAndPassword(auth, data.email, data.password)
			.then((userCredential) => {
				// signIn successful.
				const user = userCredential.user
				console.log(user)
				// Redirect to the Home Screen
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				alert(errorMessage)
			})
	}

	return (
		<KeyboardAvoidingView style={styles.wrapper} behavior="padding">
			<View style={styles.container}>
				<Image
					source={require('../assets/Signal2.png')}
					style={{ width: 200, height: 100 }}
				/>
				<View style={styles.inputContainer}>
					<View style={styles.control}>
						<Text style={styles.error}>{errors.email?.message}</Text>
						<Controller
							control={control}
							name="email"
							render={({ field: { onChange, value, onBlur } }) => (
								<TextInput
									style={errors.email ? styles.invalid : styles.input}
									placeholder={errors.email ? '' : 'Email'}
									value={value}
									onBlur={onBlur}
									onChangeText={(value) => onChange(value)}
								/>
							)}
						/>
					</View>
					<View style={styles.control}>
						<Text style={styles.error}>{errors.password?.message}</Text>
						<Controller
							control={control}
							name="password"
							render={({ field: { onChange, value, onBlur } }) => (
								<TextInput
									style={errors.password ? styles.invalid : styles.input}
									placeholder={errors.password ? '' : 'Password'}
									secureTextEntry
									value={value}
									onBlur={onBlur}
									onChangeText={(value) => onChange(value)}
								/>
							)}
						/>
					</View>
				</View>
				<View style={styles.button}>
					<Button title="Log In" onPress={handleSubmit(onSubmit)} />
				</View>
				<View>
					<Pressable
						style={styles.customButton}
						onPress={() => navigation.navigate('SignUp')}>
						<Text style={styles.text}>Create New Account?</Text>
					</Pressable>
				</View>
			</View>
			{/* <View style={{ height: 100 }}></View> */}
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	container: {
		width: '80%',
		maxWidth: 450,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 16,
		borderRadius: 6,
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.4,
		shadowRadius: 2,
	},
	inputContainer: {
		flex: 1,
		width: '100%',
	},
	control: {
		marginBottom: 20,
		color: '#1c1e21',
	},
	input: {
		flex: 1,
		height: 40,
		borderWidth: 1,
		padding: 10,
		borderColor: '#a6a6a6',
		borderRadius: 6,
		flexDirection: 'row',
		backgroundColor: '#fff',
		outlineStyle: 'none',
		width: '100%',
		web: {
			outlineStyle: 'none',
		},
	},
	invalid: {
		flex: 1,
		height: 40,
		borderWidth: 1,
		padding: 10,
		borderColor: 'red',
		borderRadius: 6,
		flexDirection: 'row',
		backgroundColor: '#ffc2c2',
		outlineStyle: 'none',
		width: '100%',
		web: {
			outlineStyle: 'none',
		},
	},
	button: {
		width: '100%',
		marginBottom: 7,
	},
	customButton: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		// backgroundColor: 'black',
	},
	text: {
		fontSize: 14,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: '#3A76F0',
		textDecorationLine: 'underline',
	},
	error: {
		width: '100%',
		// color: 'red',
		color: '#ff9700',
		fontWeight: 'bold',
		marginBottom: 6,
	},
})
