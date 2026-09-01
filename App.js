import {View} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Home from "./screens/Home";
import DetalhesLivro from "./screens/DetalhesLivro";
import Cadastro from "./screens/Cadastro";
import Login from "./screens/Login";
import AdicionarLivro from "./screens/AdicionarLivro";
import Usuarios from "./screens/Usuarios";
import EditarConta from "./screens/EditarConta";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Login"}>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="DetalhesLivro" component={DetalhesLivro} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="AdicionarLivro" component={AdicionarLivro} options={{ headerShown: false }} />
          <Stack.Screen name="Usuarios" component={Usuarios} options={{ headerShown: false }} />
          <Stack.Screen name="EditarConta" component={EditarConta} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}
