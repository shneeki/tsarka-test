import React from "react";
import LoginForm from "./Login/LoginForm";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import NotFoundPage from "./NotFoundPage";
import WebsiteList from "./Websites/WebsiteList";

import RequireAuth from "./Login/RequireAuth";
import LoginPage from "./Login/LoginPage";
import { AuthProvider } from "./Login/auth";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <WebsiteList />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
