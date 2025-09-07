import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { getUsuarios, saveUsuarios } from "../storage";
import { Usuario } from "../types/usuario";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation"; 

type EditarUsuarioProps = NativeStackScreenProps<RootStackParamList, "EditarUsuario">;

export default function EditarUsuario({ route, navigation }: EditarUsuarioProps) {
  const { usuario } = route.params;
  const [nome, setNome] = useState(usuario.nome);

  const salvar = async () => {
    if (!nome.trim()) {
      Alert.alert("Erro", "Nome não pode estar vazio");
      return;
    }

    try {
      const usuarios = await getUsuarios();
      const atualizados = usuarios.map((u: Usuario) =>
        u.id === usuario.id ? { ...u, nome } : u
      );
      await saveUsuarios(atualizados);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o usuário");
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome"
        style={{
          borderWidth: 1,
          borderColor: "#ed145b",
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }}
      />
      <Button title="Salvar Alterações" onPress={salvar} />
    </View>
  );
}
