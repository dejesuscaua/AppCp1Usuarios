import AsyncStorage from "@react-native-async-storage/async-storage";
import { Usuario } from "./types/usuario";

const STORAGE_KEY = "@usuarios";

export const getUsuarios = async (): Promise<Usuario[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveUsuarios = async (usuarios: Usuario[]): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
};
