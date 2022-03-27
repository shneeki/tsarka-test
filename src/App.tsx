import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import NotFoundPage from "./NotFoundPage";

import RequireAuth from "./Login/RequireAuth";
import LoginPage from "./Login/LoginPage";
import { AuthProvider } from "./Login/auth";

import { useAppApolloClient } from "./Login/Apollo/ApolloClient";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import RequireNotAuth from "./Login/RequireNotAuth";
import WebsitesPage from "./Websites/WebsitesPage";

const App = () => {
  const client = useAppApolloClient();

  return (
    <div className="App">
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
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ApolloProvider>
    </div>
  );
};

export default App;
