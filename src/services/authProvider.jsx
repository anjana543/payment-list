import React, { useEffect, useState, createContext } from "react";
import Loader from "../components/Loader";
import Box from "../components/Box";
import { LOGIN_URL, USERNAME, PASSWORD, GRANT_TYPE } from "../utils/constant";
import { useTheme } from "styled-components";

const getUser = async () => {
  const data = `username=${USERNAME}&password=${PASSWORD}&grant_type=${GRANT_TYPE}`;
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  });
  if (!response.ok) {
    throw response;
  }
  return response.json();
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const theme = useTheme();
  const [state, setState] = useState({
    status: "pending",
    error: null,
    user: null,
  });

  useEffect(() => {
    getUser().then(
      (user) => setState({ status: "success", error: null, user }),
      (error) => setState({ status: "error", error, user: null })
    );
  }, []);

  return (
    <AuthContext.Provider value={state}>
      {state.status === "pending" ? (
        <Box p="20" m="30">
          <Loader size={100} color={theme?.colors?.primary_100} />
        </Box>
      ) : state.status === "error" ? (
        <Box p="20" m="30">
          Something went wrong with the authentication. Please check later!
        </Box>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
