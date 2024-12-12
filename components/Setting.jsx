import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import * as LocalAuthentication from 'expo-local-authentication'

const Settings = ({ handleLogout }) => {
    const [ fname, setFname ] = useState('')
    const [ switchOn, setSwithOn ] = useState(false)

    const logoutHandler = () => {
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('email')
        AsyncStorage.removeItem('fname')
        AsyncStorage.removeItem('role')
        handleLogout()
    }

    const toggleSwitch = async () => {
        try {
           const biometricSupported = await LocalAuthentication.hasHardwareAsync() 
           if(!biometricSupported) {
            return toast.error('biometrics not supported on this device')
           }
           setSwithOn( prevState => !prevState)
        } catch (error) {
            
        }
        
        
    }
    
    useEffect(() => {
        const handleStorage = async () => {
            const storedData =await AsyncStorage.getItem('fname')
            setFname(storedData)
        }
        handleStorage()
    }, [])
    console.log(AsyncStorage.getItem('fname'))
    return ( 
        <View style={styles.settingContainer}>
            <View style={styles.profile}>
                <Text style={styles.profileText}>{`Welcome ${fname}`}</Text>
            </View>
            <View style={styles.biometricsContainer}>
                <View style={styles.innerContainer}>
                    <MaterialIcons style={styles.biometrics} name="fingerprint" size={34} color="#005ccc" />
                    <Text style={styles.biometricsText}>Use biometrics</Text>
                </View>
                <Switch 
                    trackColor={{ false: "lightgray", true: "lightgray"}}
                    thumbColor={switchOn ? "#005ccc" : "gray"}
                    onValueChange={toggleSwitch}
                    value={switchOn}
                    style={styles.switch}
                />
            </View>
            <TouchableOpacity style={styles.logoutContainer} onPress={logoutHandler}>
                <MaterialIcons style={styles.logout} name="logout" size={34} color="#005ccc" />
                <Text style={styles.logoutText}>logout </Text>
            </TouchableOpacity>
        </View>
     );
}
 
export default Settings;

const styles = StyleSheet.create({
    settingContainer: {
        marginTop: 30,
        padding: 20,
        height: '100%'
    },
    profile: {
        backgroundColor: '#005ccc',
        height: '30%',
        marginBottom: 30,
        borderRadius: 20,
        justifyContent: 'center'
    },
    profileText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30
    },
    logoutContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: 120
    },
    logout: {
        marginRight: 10
    },
    logoutText: {
        fontSize: 20
    },
    biometricsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 350,
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    biometricsText: {
        fontSize: 20
    },
    biometrics: {
        marginRight: 10
    },
    switch: {
        marginRight: 10
    }
})