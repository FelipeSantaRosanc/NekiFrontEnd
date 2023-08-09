import jwt_decode from "jwt-decode";
import { createContext, useState } from "react";
import { UsuarioLoginType } from "../model/UsuarioLogintype";


interface DataContextType {
  dadosUsuarioLogin?: UsuarioLoginType;
  armazenaDadosUsuarioLogin: (jwt: any) => void;
}

//criando contexto
export const DataContext = createContext<DataContextType | undefined>(undefined);

//criando provider
export const DataProvider = ({ children }) => {
  const [dadosUsuarioLogin, setDadosUsuarioLogin] = useState<UsuarioLoginType>();

  const armazenaDadosUsuarioLogin = (jwt: any) => {
    var tokenDecodificado: any = jwt_decode(jwt);

    //armazenando apenas a chave usuário do json decodificado
    var usuario = tokenDecodificado.user;

    //está transferindo a string json contida dentro da variável usuario num objeto
    usuario = JSON.parse(usuario);

    setDadosUsuarioLogin({
      id: usuario?.id,
      login: usuario?.login,
      lastLoginDate: usuario?.lastLoginDate,
      token: jwt,
    });
  };

  return (
    <DataContext.Provider
      value={{ dadosUsuarioLogin, armazenaDadosUsuarioLogin }}
    >
      {children}
    </DataContext.Provider>
  );
};
