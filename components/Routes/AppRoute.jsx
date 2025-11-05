import { StyleSheet, Text, View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from "@expo/vector-icons"
import ComplaintList from "../complaintList"
import Home from "../Home"
import Setting from "../Setting"
import Dashboard from "../Dashboard"
import { useEffect, useState } from "react"
import Notification from "../Notifications"

const AppRoute = ({ handleLogout, handleFingerPrintScanner }) => {
  const [role, setRole] = useState("admin")

  useEffect(() => {
    const handleStorage = async () => {
      const storedData = await AsyncStorage.getItem("role")
      setRole(storedData)
    }
    handleStorage()
  }, [])

  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon

          if (route.name === "Home") {
            icon = focused ? "home" : "home-outline"
          } else if (route.name === "ComplaintList") {
            icon = focused ? "list" : "list-outline"
          } else if (route.name === "Dashboard") {
            icon = focused ? "stats-chart" : "stats-chart-outline"
          } else if (route.name === "Notification") {
            icon = focused ? "notifications" : "notifications-outline"
          } else {
            icon = focused ? "settings" : "settings-outline"
          }

          return <Ionicons name={icon} color={color} size={size} />
        },
        tabBarActiveTintColor: "#005ccc",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "white",
          borderRadius: 8,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />

      {role === '"admin"' && (
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
      )}
      {role === '"head"' && (
        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{ headerShown: false }}
        />
      )}

      <Tab.Screen
        name="ComplaintList"
        component={ComplaintList}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Setting" options={{ headerShown: false }}>
        {() => (
          <Setting
            handleLogout={handleLogout}
            handleFingerPrintScanner={handleFingerPrintScanner}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

export default AppRoute

const styles = StyleSheet.create({})
