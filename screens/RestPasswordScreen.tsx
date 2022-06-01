import {
	View,
	Text,
	StyleSheet,
	Image,
	TextInput,
	Button,
	Pressable,
	KeyboardAvoidingView,
	TouchableOpacity,
} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { RestPasswordSchemaValidation } from '../utils'
import { RootTabScreenProps, AutRestPasswordRequestType } from '../types'
import { auth, sendPasswordResetEmail } from '../config/firebase'

export default function LoginScreen({
	navigation,
}: RootTabScreenProps<'ResetPassword'>) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<AutRestPasswordRequestType>({
		resolver: yupResolver(RestPasswordSchemaValidation),
	})

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Back To Login',
			// headerStyle: { backgroundColor: 'blue', height: 150 },
			// headerTintColor: '#fff',
			// headerTitleStyle: { fontWeight: 'bold', fontSize: 40 },
			// headerTitleAlign: 'center',
		})
	}, [navigation])

	const onSubmit = (data: AutRestPasswordRequestType) => {
		console.log(JSON.stringify(data, null, 2))

		sendPasswordResetEmail(auth, data.email)
			.then(() => {
				alert(
					`Password reset link sent! to ${data.email} please check your email `,
				)
				setTimeout(() => {
					navigation.navigate('Login')
				}, 8000)
			})
			.catch((error) => {
				const errorCode = error?.code
				const errorMessage = error?.message
				alert(errorMessage || 'error')
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
				</View>
				<View style={{ width: '100%' }}>
					<TouchableOpacity
						style={styles.button}
						onPress={handleSubmit(onSubmit)}>
						<Text style={styles.loginText}>Rest Password</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.actions}>
					<Pressable
						style={styles.customButton}
						onPress={() => navigation.navigate('SignUp')}>
						<Text style={styles.text}>Create New Account?</Text>
					</Pressable>
					<Pressable
						style={styles.customButton}
						onPress={() => navigation.navigate('Login')}>
						<Text style={styles.text}>Back to Login?</Text>
					</Pressable>
				</View>
			</View>
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
	button: {
		width: '100%',
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: '#3A76F0',
		borderRadius: 6,
		borderColor: '#fff',
	},
	loginText: {
		color: '#fff',
		textAlign: 'center',
		paddingLeft: 10,
		paddingRight: 10,
		textTransform: 'uppercase',
		fontSize: 14,
		fontWeight: 'bold',
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
	actions: {
		width: '100%',
		marginTop: 5,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
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
	error: {
		width: '100%',
		// color: 'red',
		color: '#ff9700',
		fontWeight: 'bold',
		marginBottom: 6,
	},
})
