import axios from "axios"
import { useEffect, useState } from "react"
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard
} from "react-native"
import { Formik } from "formik"
import Ionicons from '@expo/vector-icons/Ionicons';

const Notification = () => {
  const [messages, setMessages] = useState([])
  const [modal, setModal] = useState(false)
  const [idHolder, setIdHolder] = useState({})
  useEffect(() => {
    axios
      .get("https://cms-hwdq.onrender.com/unreadedComplaintList")
      .then((result) => {
        setMessages(result.data)
      })
headApi.get('unreadedcomplaintList')
.then(res => console.log(res)
  }, [])
  return (
    <View style={styles.notificationContainer}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItems}
            onPress={() => {
              setIdHolder(item)
              setModal(true)
            }}
          >
            <Text style={styles.item}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modal} animationType="slide">
        <View style={styles.closeIcon}>
          <Ionicons
            name="close"
            size={34}
            color="#005ccc"
            onPress={() => setModal(false)}
          />
        </View>
        <Formik
          initialValues={{
            solution: "",
          }}
          onSubmit={(val) => {
            axios.post(`https://cms-hwdq.onrender.com/solution/${idHolder._id}`, val )
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
                <Text style={styles.label}>
                  Description: {idHolder.description}
                </Text>
                <Text style={styles.label}>
                  Department: {idHolder.department}
                </Text>
                <Text style={styles.label}>Severity: {idHolder.severity}</Text>
                <Text style={styles.label}>Solution:</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(item) => setFieldValue("solution", item)}
                  value={values.solution}
                  style={styles.input}
                />
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
  )
}

export default Notification

const styles = StyleSheet.create({
  notificationContainer: {
    paddingTop: 30,
    height: "100%",
  },
  header: {
    textAlign: "center",
    marginVertical: 15,
    fontSize: 30,
    color: "#005ccc",
  },
  listItems: {
    padding: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "lightgray",
    marginVertical: 3,
    marginHorizontal: 5,
    textAlign: "center",
    backgroundColor: "#005ccc",
    height: 70,
    justifyContent: "center",
  },
  item: {
    marginBottom: 5,
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
    marginBottom: 20,
    fontSize: 20
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
  closeIcon: {
    alignItems: 'flex-end',
    width: '99%',
    paddingRight: 20,
    paddingTop: 20
  }
})
