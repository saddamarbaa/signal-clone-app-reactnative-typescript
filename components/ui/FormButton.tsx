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
import { FontAwesome } from '@expo/vector-icons'

import { GlobalStyles } from '../../constants'

type ButtonType = {
	buttonTitle?: string
	onPress?: () => void
	btnType?: string
	buttonTextStyle?: any
	buttonContainerStyle?: StyleProp<ViewStyle>
	isIconButton?: boolean
	iconName?: string
	iconSize?: number
	iconColor?: string
	mode?: 'flat' | 'button'
	disabled?: boolean
	iconPressedStyle?: StyleProp<ViewStyle>
	buttonPressedStyle?: StyleProp<ViewStyle>
}

export function FormButton({
	buttonTitle,
	btnType,
	buttonTextStyle,
	buttonContainerStyle,
	isIconButton,
	iconName,
	iconSize,
	iconColor = 'white',
	mode,
	disabled,
	iconPressedStyle,
	buttonPressedStyle,
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
				pressed ? buttonPressedStyle || styles.buttonPressed : null,
				mode === 'flat' && styles.flat,
				disabled ? styles.disabledButton : null,
			]}
			disabled={disabled}
			{...rest}>
			<View style={styles.btnTxtWrapper}>
				{btnType && (
					<View style={styles.iconWrapper}>
						<FontAwesome
							name={btnType as any}
							size={iconSize || 22}
							color={iconColor}
						/>
					</View>
				)}
				<Text
					style={[
						styles.buttonText,
						mode === 'flat' && styles.flatText,
						buttonTextStyle,
					]}>
					{buttonTitle}
				</Text>
			</View>

			{/* <View style={styles.btnTxtWrapper}>
				{btnType && (
					<View style={styles.iconWrapper}>
						<Ionicons
							name={iconName as 'add-circle'}
							size={iconSize || 22}
							color={iconColor}
						/>
					</View>
				)}
				<Text
					style={[
						styles.buttonText,
						mode === 'flat' && styles.flatText,
						buttonTextStyle,
					]}>
					{buttonTitle}
				</Text>
			</View> */}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		marginTop: 16,
		flex: 1,
		width: '100%',
		backgroundColor: GlobalStyles.colors.primary500,
		padding: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		cursor: 'pointer',
	},
	buttonPressed: {
		backgroundColor: GlobalStyles.colors.primary600,
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
		backgroundColor: GlobalStyles.colors.primary500,
	},
	buttonText: {
		fontSize: 18,
		textAlign: 'center',
		fontWeight: 'bold',
		color: '#ffffff',
	},
	btnTxtWrapper: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconWrapper: {
		width: 30,
		marginRight: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	flat: {
		backgroundColor: 'transparent',
		flex: 1,
	},
	flatText: {
		fontSize: 16,
		color: GlobalStyles.colors.primary500,
	},
	disabledButton: {
		opacity: 0.5,
		backgroundColor: 'gray',
	},
})

export default FormButton
