import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { getUsuarios, saveUsuarios } from "../storage";
import { Usuario } from "../types/usuario";
import { ScreenProps } from "../types/navigation";

export default function CriarUsuario({ navigation }: ScreenProps<"CriarUsuario">) {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");

  const salvar = async () => {
    if (!id || !nome) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    const usuarios = await getUsuarios();
    if (usuarios.some((u: Usuario) => u.id === id)) {
      Alert.alert("Erro", "Já existe um usuário com esse ID");
      return;
    }

    const novo: Usuario = {
      id,
      nome,
      url: "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png",
    };

    await saveUsuarios([...usuarios, novo]);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput placeholder="ID" value={id} onChangeText={setId} style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} />
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} />
      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}
