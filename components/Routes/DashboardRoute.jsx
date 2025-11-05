import { createStackNavigator } from "@react-navigation/stack"

const stack = createStackNavigator()

export default function DashboardStack() {
  return (
    <stack.Navigator>
      <stack.Screen name="Deparments" component={DepartmentScreen} />
      <stack.Screen name="Users" component={UsersScreen} />
      <stack.Screen name="Complaints" component={ComplaintScreen} />
    </stack.Navigator>
  )
}
