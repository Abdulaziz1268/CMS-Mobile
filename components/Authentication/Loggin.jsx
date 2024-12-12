import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Formik } from "formik";
import yup from 'yup'
import Register from "./Register";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toaster, toast } from "sonner-native";

const Loggin = ({ navigation, handleLoggin }) => {
    
    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            onSubmit={ val => {
                axios.post('https://cms-hwdq.onrender.com/login', val)
                     .then( result => {
                        const token = result.data.token
                        const email = result.data.email
                        const fname = result.data.fname
                        const role = result.data.role
                        console.log(fname)
                        AsyncStorage.setItem("token", JSON.stringify(token))
                        AsyncStorage.setItem("email", JSON.stringify(email))
                        AsyncStorage.setItem("fname", JSON.stringify(fname))
                        AsyncStorage.setItem("role", JSON.stringify(role))
                        toast.success("Authentication successfull")
                        handleLoggin()
                        console.log(AsyncStorage.getItem('fname'))
                     })
                     .catch( error => {
                        console.log(error)
                        toast.error("Invalid credentials")
                    })
            }}
        >
            {formikProps => (
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View  style={styles.logginContainer}>
                        <Toaster position="bottom-center" />
                        <Text style={styles.logginHeader}>Loggin</Text>
                        <Text style={styles.inputLable}>Email:</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="email"
                            onChangeText={formikProps.handleChange('email')}
                            value={formikProps.values.email}
                        />
                        <Text style={styles.inputLable}>Password:</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="password"
                            onChangeText={formikProps.handleChange("password")}
                            value={formikProps.values.password}
                            secureTextEntry
                        />
                        <Text style={styles.dummyText}></Text>
                        <TouchableOpacity onPress={() => formikProps.handleSubmit()} style={styles.button}>
                            <Text style={styles.buttonText}>Loggin</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button}>
                            <Text style={styles.buttonText}>Create account</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </Formik>
    );
}
 
export default Loggin;

const styles = StyleSheet.create({
    logginHeader:{
        textAlign: 'center',
        fontSize: 40,
        fontWeight: '900',
        marginVertical: 50,
        marginTop: 100,
        color: '#005ccc'
    },
    logginContainer: {
        padding: 30,
        backgroundColor: 'white',
        height: '100%'
    },
    input: {
        borderWidth: 2,
        borderColor: 'lightgray',
        borderRadius: 10,
        marginBottom: 30
    },
    inputLable: {
        marginBottom: 10
    },
    dummyText: {
        marginBottom: 50
    },
    button: {
        backgroundColor: "#005ccc",
        marginBottom: 20,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    }
})