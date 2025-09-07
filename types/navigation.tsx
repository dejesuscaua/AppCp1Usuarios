import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Usuario } from "./usuario";

export type RootStackParamList = {
  ListaUsuarios: undefined;
  CriarUsuario: undefined;
  EditarUsuario: { usuario: Usuario };
};

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
