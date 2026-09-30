import { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import api from "../api/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const accessTokenRef = useRef(null);

  const updateAccessToken = (token) => {
    accessTokenRef.current = token;
    setAccessToken(token);
  };

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (accessTokenRef.current) {
          config.headers.Authorization = `Bearer ${accessTokenRef.current}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          originalRequest &&
          !originalRequest._retry &&
          !originalRequest.skipAuthRefresh
        ) {
          originalRequest._retry = true;

          try {
            const res = await api.post(
              "/auth/refresh-token",
              {},
              { skipAuthRefresh: true },
            );
            const newAccessToken = res.data.data.accessToken;

            updateAccessToken(newAccessToken);
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            updateAccessToken(null);
            setUser(null);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      try {
        const res = await api.post(
          "/auth/refresh-token",
          {},
          { skipAuthRefresh: true },
        );
        if (isMounted) {
          updateAccessToken(res.data.data.accessToken);
          setUser(res.data.data.user);
        }
      } catch {
        if (isMounted) {
          updateAccessToken(null);
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsAuthLoading(false);
        }
      }
    };

    restoreSession();
    return () => {
      isMounted = false;
    };
  }, []);

  const value = {
    user,
    accessToken,
    isAuthLoading,
    isAuthenticated: !!user,
    setUser,
    setAccessToken: updateAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
