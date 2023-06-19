import React from 'react'
import {
	View,
	TextInput,
	StyleSheet,
	Text,
	StyleProp,
	ViewStyle,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Control, Controller } from 'react-hook-form'
import { GlobalStyles } from '../../constants'

type FormInputProps = {
	name?: string
	control?: Control
	error?: boolean
	errorMessage?: string
	value?: string
	onChangeText?: (text: string) => void
	placeholder: string
	iconType?: React.ComponentProps<typeof AntDesign>['name']
	inputStyle?: StyleProp<ViewStyle>
	inputContainerStyle?: StyleProp<ViewStyle>
	label?: string
} & TextInput['props']

export function FormInput({
	error,
	errorMessage,
	name,
	control,
	placeholder,
	iconType,
	inputContainerStyle,
	label,
	...rest
}: FormInputProps) {
	const renderIcon = () => (
		<View style={[styles.iconStyle, error && styles.iconStyleOnerror]}>
			<AntDesign
				name={iconType}
				size={25}
				color={
					error
						? GlobalStyles.colors.error500
						: GlobalStyles.colors.textSecondary
				}
			/>
		</View>
	)

	return (
		<View style={styles.control}>
			{errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
			{!errorMessage && label && <Text style={styles.label}>{label}</Text>}
			<View style={styles.inputWrapper}>
				<View
					style={[
						styles.inputContainer,
						error && styles.inputField,
						inputContainerStyle,
					]}>
					{iconType && renderIcon()}
					<Controller
						control={control}
						name={name as string}
						render={({ field: { onChange, value, onBlur } }) => (
							<TextInput
								placeholder={error ? '' : placeholder}
								style={styles.input}
								numberOfLines={1}
								autoFocus
								placeholderTextColor={GlobalStyles.colors.textSecondary}
								value={value}
								onBlur={onBlur}
								onChangeText={(value) => onChange(value)}
								{...rest}
							/>
						)}
					/>
				</View>
			</View>
		</View>
	)
}

export default FormInput

const styles = StyleSheet.create({
	control: {
		marginTop: 5,
		marginBottom: 5,
		color: GlobalStyles.colors.textPrimary,
		width: '100%',
	},
	inputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	inputContainer: {
		width: '100%',
		maxHeight: 80,
		borderColor: '#ccc',
		borderRadius: 5,
		borderWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	inputField: {
		borderColor: GlobalStyles.colors.error100,
		backgroundColor: GlobalStyles.colors.error100,
		maxHeight: 70,
	},
	iconStyle: {
		padding: 10,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRightColor: '#ccc',
		borderRightWidth: 1,
		width: 50,
	},
	iconStyleOnerror: {
		padding: 10,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRightColor: GlobalStyles.colors.iconErrorBorder,
		borderRightWidth: 1,
		width: 50,
	},
	input: {
		padding: 10,
		flex: 1,
		fontSize: 16,
		color: GlobalStyles.colors.textPrimary,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},

	label: {
		width: '100%',
		color: GlobalStyles.colors.textPrimary,
		fontSize: 17,
		fontWeight: 'bold',
		paddingHorizontal: 2,
		marginBottom: 5,
	},
	error: {
		width: '100%',
		color: GlobalStyles.colors.iconErrorBorder,
		fontWeight: 'bold',
		marginBottom: 0,
		textAlign: 'right',
		paddingHorizontal: 13,
	},
})
