import { createContext, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { notification } from "../../types/notification";
import { User } from "../../types/user";
import { IAuthProvider, IContext, IUser } from "./types";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";
import { toast } from "react-toastify";

export const AuthContext = createContext<IContext>({} as IContext);

export function AuthProvider({ children }: IAuthProvider) {
  let navigate = useRouter();
  const [user, setUser] = useState<IUser | null>();
  const [loadingUserFromLocalStorage, setLoadingUserFromLocalStorage] =
    useState(true);

  useEffect(() => {
    const user = getUserLocalStorage();
    if (user) {
      setUser(user);
    }
    setLoadingUserFromLocalStorage(false);
  }, []);

  useEffect(() => {
    window.addEventListener("focus", () => {
      let user = getUserLocalStorage();
      setUser(user);
    });
  }, []);

  const { data: notificationNew } = useQuery({
    queryKey: ["notifications-new"],
    queryFn: async () => {
      let user = getUserLocalStorage();
      if (!user?.email) return null;
      const response = await api.get<notification[]>(
        `/notificacao/usuario/${user.email}`
      );
      if(notificationNew && response.data.length > notificationNew.length ) {
        toast.info("Você tem novas notificações", {
          position: "bottom-right",
          onClick: () => navigate.push("/sys"),
        });
      }
      return response.data;
    },
    enabled: !!user?.token,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60, // 1 minute
    refetchInterval: 1000 * 60, // 1 minute to refetch automatically
  });

  const { data: userInfo } = useQuery<User>({
    queryKey: ["meUser"],
    queryFn: async () => {
      let user = getUserLocalStorage();
      if (!user) {
        logout();
        if (window.location.href.indexOf("sys") > -1) {
          window.location.href = "/entrar?error=invalidCredentials";
        }
        return null;
      }
      const response = await api
        .get(`/usuario/email/${user.email}`)
        .catch((error) => {
          if (
            error.response.status === 401 ||
            error.response.status === 403 ||
            error.response.status === 500
          ) {
            logout();
          } else {
            return error;
          }
        });
      return response?.data;
    },
    enabled: !!user,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  let authorities = useRef<string[]>([]);
  if (userInfo?.roles) {
    let authoritiesAux: string[] = [];
    userInfo?.roles?.forEach((role: any) => {
      authoritiesAux.push(role.nomeRole);
    });
    authorities.current = authoritiesAux;
  }

  async function signin(email: string, password: string) {
    const response = await LoginRequest(email, password);

    const payload = {
      token: response.Authorization.replace("Bearer ", ""),
      email,
      type: response.usertype,
    };

    setUser(payload);
    setUserLocalStorage(payload);
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
    queryClient.removeQueries({queryKey: ["meUser"]});
    queryClient.setQueryData(["meUser"], undefined);
    queryClient.invalidateQueries({queryKey: ["meUser"]});
    if (navigate.asPath.includes("sys")) navigate.push("/entrar");
  }

  return (
    <AuthContext.Provider
      value={{
        ...user,
        signin,
        logout,
        loadingUserFromLocalStorage,
        userInfo,
        authorities: authorities.current,
        notificationNew,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
