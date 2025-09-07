import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Image, TouchableOpacity } from "react-native";
import { getUsuarios, saveUsuarios } from "../storage";
import { Usuario } from "../types/usuario";
import { ScreenProps } from "../types/navigation";

export default function ListaUsuarios({ navigation }: ScreenProps<"ListaUsuarios">) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const carregar = async () => {
    const data = await getUsuarios();
    setUsuarios(data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", carregar);
    return unsubscribe;
  }, [navigation]);

  const remover = async (id: string) => {
    const filtrados = usuarios.filter((u) => u.id !== id);
    setUsuarios(filtrados);
    await saveUsuarios(filtrados);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Adicionar Usuário" onPress={() => navigation.navigate("CriarUsuario")} />
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
            <Image source={{ uri: item.url }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
            <Text>{item.nome}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("EditarUsuario", { usuario: item })}>
              <Text style={{ color: "#ed145b", marginLeft: 10 }}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => remover(item.id)}>
              <Text style={{ color: "red", marginLeft: 10 }}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
