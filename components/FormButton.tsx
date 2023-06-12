import React from 'react'
import {
	Text,
	StyleSheet,
	View,
	StyleProp,
	ViewStyle,
	Pressable,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { windowHeight } from '../utils'

type ButtonType = {
	buttonTitle?: string
	onPress?: () => void
	btnType?: string
	buttonTextStyle?: StyleProp<ViewStyle>
	buttonContainerStyle?: StyleProp<ViewStyle>
	isIconButton?: boolean
	iconName?: string
	iconSize?: number
	iconColor?: string
	mode?: 'flat' | 'button'
	disabled?: boolean
	iconPressedStyle?: StyleProp<ViewStyle>
}

export function FormButton({
	buttonTitle,
	btnType,
	buttonTextStyle,
	buttonContainerStyle,
	isIconButton,
	iconName,
	iconSize,
	mode,
	iconColor,
	disabled,
	iconPressedStyle,
	...rest
}: ButtonType) {
	if (isIconButton) {
		return (
			<Pressable
				style={({ pressed }) => [
					styles.iconContainer,
					buttonContainerStyle,
					pressed ? iconPressedStyle || styles.iconPressed : null,
					disabled ? styles.disabledButton : null,
				]}
				disabled={disabled}
				{...rest}>
				<Ionicons
					name={iconName as 'add-circle'}
					size={iconSize}
					color={iconColor}
				/>
			</Pressable>
		)
	}

	return (
		<Pressable
			style={({ pressed }) => [
				styles.iconContainer,
				styles.buttonContainer,
				buttonContainerStyle,
				pressed && styles.buttonPressed,
				mode === 'flat' && styles.flat,
				disabled ? styles.disabledButton : null,
			]}
			disabled={disabled}
			{...rest}>
			<View style={styles.btnTxtWrapper}>
				<Text
					style={[
						styles.buttonText,
						mode === 'flat' && styles.flatText,
						buttonTextStyle,
					]}>
					{buttonTitle}
				</Text>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		marginTop: 16,
		width: '100%',
		height: windowHeight / 15,
		maxHeight: 45,
		backgroundColor: '#3561FE',
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		cursor: 'pointer',
	},
	buttonPressed: {
		backgroundColor: '#1d4ed8',
		opacity: 0.75,
		borderRadius: 5,
	},
	iconContainer: {
		padding: 6,
		marginHorizontal: 8,
		marginVertical: 2,
		borderRadius: 20,
		cursor: 'pointer',
	},
	iconPressed: {
		backgroundColor: '#1d4ed8',
	},
	buttonText: {
		fontSize: 18,
		textAlign: 'center',
		fontWeight: 'bold',
		color: '#ffffff',
		// fontFamily: 'Lato-Regular',
	},
	btnTxtWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	flat: {
		backgroundColor: 'transparent',
	},
	flatText: {
		color: '#2e64e5',
	},
	disabledButton: {
		opacity: 0.5,
		backgroundColor: 'gray',
	},
})

export default FormButton
