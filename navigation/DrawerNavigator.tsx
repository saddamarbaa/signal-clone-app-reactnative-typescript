import * as React from 'react'
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons'

import { RootStackParamList } from '../types'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator()

// Dummy Screens
const CategoriesScreen = () => {
	return <h1>Categories Screen</h1>
}

const FavoritesScreen = () => {
	return <h1>Favorites Screen</h1>
}

export function DrawerNavigator() {
	return (
		<Drawer.Navigator
			screenOptions={({ route }) => ({
				headerShown: true,
				headerTitleAlign: 'center',
				// sceneContainerStyle: { backgroundColor: colors.secondary },
				drawerContentStyle: {
					// backgroundColor: colors.main,
				},
				// drawerInactiveTintColor: colors.white,
				// drawerActiveTintColor: colors.main,

				drawerActiveBackgroundColor: '#e4baa1',
			})}>
			<Drawer.Screen
				name="Favorites"
				component={FavoritesScreen}
				options={{
					drawerIcon: ({ color, size }) => (
						<Ionicons name="star" color={color} size={size} />
					),
				}}
			/>
		</Drawer.Navigator>
	)
}

export default DrawerNavigator
