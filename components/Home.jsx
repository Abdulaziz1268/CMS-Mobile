import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import { Toaster, toast } from "sonner-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Formik } from "formik"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Picker } from "@react-native-picker/picker"
import axios from "axios"

const Home = () => {
  const [modal, setModal] = useState(false)
  const [reporter, setReporter] = useState("")
  const [depPickerValue, setDepPickerValue] = useState("Admin")
  const [sevPickerValue, setSevPickerValue] = useState("Normal")
  const [departments, setDepartments] = useState([])

  const toggleModal = () => {
    setModal(true)
  }

  useEffect(() => {
    axios.get("https://cms-hwdq.onrender.com/departmentList").then((result) => {
      setDepartments(result.data)
    })
  })

  const getReporter = async () => {
    const reporterName = await AsyncStorage.getItem("fname")
    setReporter(reporterName)
  }

  return (
    <GestureHandlerRootView>
      <View style={styles.homeContainer}>
        <ImageBackground
          source={require("../assets/mobile-home.png")}
          style={styles.background}
        >
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => toggleModal()}
            >
              <Text style={styles.buttonText}>+ Add</Text>
            </TouchableOpacity>
          </View>
          <Toaster position="bottom-center" />
          <Text style={styles.homeHeader}>WELCOME{"\n"} TO</Text>
          <Text style={styles.homeHeaderName}>CMS</Text>
        </ImageBackground>

        <Modal visible={modal} animationType="slide">
          <Formik
            initialValues={{
              department: "",
              severity: "",
              description: "",
              file: null,
              reporter: reporter || "",
            }}
            onSubmit={(val) => {
              axios
                .post("https://cms-hwdq.onrender.com/complaint", val)
                .then((result) => {
                  console.log(result)
                  setModal(false)
                })
                .catch((error) => {
                  setModal(false)
                  console.log(error)
                })
            }}
          >
            {({ handleChange, handleSubmit, setFieldValue, values }) => (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Department:</Text>
                  <Picker
                    selectedValue={values.department}
                    onValueChange={(itemValue) =>
                      setFieldValue("department", itemValue)
                    }
                    style={styles.input}
                  >
                    {departments.map((item) => (
                      <Picker.Item
                        key={item._id}
                        label={item.name}
                        value={item.name}
                      />
                    ))}
                  </Picker>
                  <Text style={styles.label}>Severity:</Text>
                  <Picker
                    selectedValue={values.severity}
                    onValueChange={(itemValue) =>
                      setFieldValue("severity", itemValue)
                    }
                    style={styles.input}
                  >
                    <Picker.Item label="Very Severe" value="Very Severe" />
                    <Picker.Item label="Severe" value="Severe" />
                    <Picker.Item label="Normal" value="Normal" />
                    <Picker.Item label="Easy" value="Easy" />
                    <Picker.Item label="Very Easy" value="Very Easy" />
                  </Picker>
                  <Text style={styles.label}>Description:</Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(item) => setFieldValue("description", item)}
                    value={values.description}
                    style={styles.input}
                  />
                  <Text style={styles.label}>File:</Text>
                  <TextInput style={styles.input} />
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.submitButton}
                  >
                    <Text style={styles.submitText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            )}
          </Formik>
        </Modal>
      </View>
    </GestureHandlerRootView>
  )
}

export default Home

const styles = StyleSheet.create({
  background: {
    height: "100%",
  },
  homeHeader: {
    fontSize: 40,
    color: "#005ccc",
    fontFamily: "serif",
    marginLeft: 20,
    marginTop: 100,
  },
  homeHeaderName: {
    fontSize: 90,
    color: "#005ccc",
    fontFamily: "serif",
    marginLeft: 20,
  },
  topBar: {
    marginTop: 30,
    height: 50,
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    width: 80,
    height: 40,
    backgroundColor: "#005ccc",
    borderRadius: 30,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "white",
  },
  inputContainer: {
    padding: 40,
  },
  input: {
    borderWidth: 2,
    borderColor: "lightgray",
    borderRadius: 10,
    marginBottom: 30,
  },
  label: {
    marginBottom: 10,
  },
  submitText: {
    textAlign: "center",
    color: "white",
  },
  submitButton: {
    backgroundColor: "#005ccc",
    height: 50,
    justifyContent: "center",
    borderRadius: 30,
  },
})
