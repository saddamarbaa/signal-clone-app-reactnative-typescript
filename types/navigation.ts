import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
	NativeStackNavigationProp,
	NativeStackScreenProps,
} from '@react-navigation/native-stack'
import {
	DrawerNavigationProp,
	DrawerScreenProps,
} from '@react-navigation/drawer'

// Define the types for your stack navigator screens
export type RootStackParamList = {
	MangeExpense: { expenseId?: string }
	AllExpenses: undefined
	ExpenseOverView: { categoryId: string }
	RecentExpenses: undefined
}

export type MangeExpenseScreenProps = NativeStackScreenProps<
	RootStackParamList,
	'MangeExpense'
>
