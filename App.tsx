import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListaUsuarios from "./pages/ListaUsuarios";
import CriarUsuario from "./pages/CriarUsuario";
import EditarUsuario from "./pages/EditarUsuario";
import { RootStackParamList } from "./types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ListaUsuarios" component={ListaUsuarios} options={{ title: "Usuários" }} />
        <Stack.Screen name="CriarUsuario" component={CriarUsuario} options={{ title: "Criar Usuário" }} />
        <Stack.Screen name="EditarUsuario" component={EditarUsuario} options={{ title: "Editar Usuário" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
