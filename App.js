import { NavigationContainer } from "@react-navigation/native"
import AppRoute from "./components/Routes/AppRoute"
import AuthRoute from "./components/Routes/AuthRoute"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const App = () => {
  const [isLogged, setIsLogged] = useState(false)
  const [useFingerPrintScanner, setUseFingerPrintScanner] = useState(false)

  const handleLoggin = () => {
    setIsLogged(true)
  }

  const handleFingerPrintScanner = (state) => {
    setUseFingerPrintScanner(state)
  }

  const handleLogout = () => {
    setIsLogged(false)
  }

  useEffect(()=> {
    const checkToken = async () => {
      const tokenExist = await AsyncStorage.getItem('token') 

      return tokenExist ? setIsLogged(true) : setIsLogged(false)
    
    }
    checkToken()
  }, [])
  return (
    <NavigationContainer>
      {isLogged ? 
        <AppRoute handleLogout={handleLogout} handleFingerPrintScanner={handleFingerPrintScanner} /> 
        : <AuthRoute handleLoggin={handleLoggin} useFingerPrintScanner={useFingerPrintScanner}/>}
    </NavigationContainer>
  )
}

export default App
