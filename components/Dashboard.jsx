import axios from "axios"
import { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import DataCotext from "./Contexts/dataContext"
import DeparmentScreen from "../Screens/DeparmentScreen"

const Dashboard = () => {
  const [counts, setCounts] = useState({
    depCount: 0,
    comCount: 0,
    userCount: 0,
  })
  const [users, setUsers] = useState({})
  const [departments, setDepartments] = useState({})
  const [complaints, setComplaints] = useState({})

  useEffect(() => {
    axios.get("https://cms-hwdq.onrender.com/departmentList").then((result) => {
      setDepartments(result.data)
      setCounts((prevCount) => ({
        ...prevCount,
        depCount: result.data.length,
      }))
    })
    axios.get("https://cms-hwdq.onrender.com/complaintList").then((result) => {
      setComplaints(result.data)
      setCounts((prevCount) => ({
        ...prevCount,
        comCount: result.data.length,
      }))
    })
    axios.get("https://cms-hwdq.onrender.com/userList").then((result) => {
      setUsers(result.data)
      setCounts((prevCount) => ({
        ...prevCount,
        userCount: result.data.length,
      }))
    })
  }, [])
  return (
    <View style={styles.dashboardContainer}>
      <Text>Dashboard</Text>

      <DataCotext.Provider value={{ departments, users, complaints }}>
        <DeparmentScreen />
        <View style={styles.metrics}>
          <TouchableOpacity style={styles.countBox}>
            <Text style={styles.countText}>Departments</Text>
            <Text style={styles.countText}>{counts.depCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.countBox}>
            <Text style={styles.countText}>Complaints</Text>
            <Text style={styles.countText}>{counts.comCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.countBox}>
            <Text style={styles.countText}>Users</Text>
            <Text style={styles.countText}>{counts.userCount}</Text>
          </TouchableOpacity>
        </View>
      </DataCotext.Provider>
      <View style={styles.chart}></View>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  dashboardContainer: {
    marginTop: 30,
    backgroundColor: "white",
    height: "100%",
    padding: 20,
  },
  metrics: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
  },
  countBox: {
    width: "48%",
    height: 120,
    backgroundColor: "#005ccc",
    justifyContent: "center",
    borderRadius: 20,
  },
  countText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },
})
