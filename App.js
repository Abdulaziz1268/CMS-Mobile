import { NavigationContainer } from "@react-navigation/native"
import AppRoute from "./components/Routes/AppRoute"
import AuthRoute from "./components/Routes/AuthRoute"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const App = () => {
  const [isLogged, setIsLogged] = useState(false)

  const handleLoggin = () => {
    setIsLogged(true)
  }

  const handleLogout = () => {
    setIsLogged(false)
  }

  useEffect(()=> {
    AsyncStorage.getItem('token') && setIsLogged(true)
  }, [])
  return (
    <NavigationContainer>
      {isLogged ? <AppRoute handleLogout={handleLogout} /> : <AuthRoute handleLoggin={handleLoggin}/>}
    </NavigationContainer>
  )
}

export default App
