import { SafeAreaView, StyleSheet, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { zodResolver } from '@hookform/resolvers/zod'
import { Control, useForm } from 'react-hook-form'

import { Card, FormButton, FormInput } from '../components'
import { restPasswordSchemaValidation } from '../utils'
import { AutConfirmEmailRequestType, ConfirmEmailScreenProps } from '../types'

export function ConfirmEmailScreen({
	route,
	navigation,
}: ConfirmEmailScreenProps) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<AutConfirmEmailRequestType>({
		resolver: zodResolver(restPasswordSchemaValidation),
	})

	const onConfirmPressed = async () => {
		// api call
		navigation.navigate('SignIn')
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
					<Text style={styles.text}>Confirm your email</Text>

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
						buttonTitle="Confirm"
						onPress={handleSubmit(onConfirmPressed)}
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

export default ConfirmEmailScreen
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
