import { View, Text, FlatList } from "react-native"
import React, { useContext } from "react"
import { Dashboard } from "../components/Dashboard"

export default function DeparmentScreen() {
  const { departments } = useContext()
  console.log(departments)
  return (
    <View>
      {/* <FlatList 
      data={departments}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
            
        )}
      /> */}
    </View>
  )
}
