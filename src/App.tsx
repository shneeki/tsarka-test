import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import "./App.css";

import { AuthProvider } from "./Login/auth";
import { ApolloProvider } from "@apollo/client";
import { useAppApolloClient } from "./Login/Apollo/ApolloClient";

import LoginPage from "./Login/LoginPage";
import WebsitesPage from "./Websites/WebsitesPage";

import RequireNotAuth from "./Login/RequireNotAuth";
import RequireAuth from "./Login/RequireAuth";

const App = () => {
  const client = useAppApolloClient();

  return (
    <>
      <ApolloProvider client={client}>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <WebsitesPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/login"
                element={
                  <RequireNotAuth>
                    <LoginPage />
                  </RequireNotAuth>
                }
              />
              <Route
                path="*"
                element={
                  <RequireAuth>
                    <WebsitesPage />
                  </RequireAuth>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
