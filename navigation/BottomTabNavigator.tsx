import * as React from 'react'
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { RootStackParamList } from '../types'
import { GlobalStyles } from '../constants'
// import { AllExpensesScreen, RecentExpensesScreen } from '../screens'
import { StyleSheet } from 'react-native'
// import { FormButton } from '../components'

const Tab = createBottomTabNavigator<RootStackParamList>()

export function BottomTabNavigator() {
	return (
		<Tab.Navigator
			screenOptions={({ route, navigation }) => ({
				headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				headerTitleStyle: { color: 'white' },
				headerTintColor: 'white',
				headerTitleAlign: 'center',
				headerShown: true,
				tabBarShowLabel: true,
				// tabBarActiveTintColor: GlobalStyles.colors.accent500,
				tabBarInactiveTintColor: 'white',
				tabBarStyle: {
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: GlobalStyles.colors.primary500,
				},
				// headerRight: ({ tintColor }) => (
				// 	<FormButton
				// 		isIconButton
				// 		iconName="add"
				// 		iconSize={24}
				// 		iconColor={tintColor}
				// 		onPress={() => {	navigation.navigate('MangeExpense')}}
				// 		buttonContainerStyle={styles.buttonContainerStyle}
				// 	/>
				// ),
			})}>
			{/* <Tab.Screen
				name="RecentExpenses"
				component={RecentExpensesScreen}
				options={({ route }) => ({
					title: 'Recent Expenses',
					tabBarLabel: 'Recent',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="hourglass" size={24} color={color} />
					),
				})}
			/>
			<Tab.Screen
				name="AllExpenses"
				component={AllExpensesScreen}
				options={({ route }) => ({
					title: 'All Expenses',
					tabBarLabel: 'Expenses',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="calendar" size={size} color={color} />
					),
				})}
			/> */}
		</Tab.Navigator>
	)
}

export default BottomTabNavigator

const styles = StyleSheet.create({
	buttonContainerStyle: {},
})
