import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import { publicRoutes, privateRoutes } from "../src/routes";
import "./App.css";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { createTheme, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

function App() {
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const isAdmin = currentUser?.metadata.user.user_role === "admin";
  const isCustomer = currentUser?.metadata.user.user_role === "customer";
  const isStaff = currentUser?.metadata.user.user_role === "staff";
  const isReceptionist =
    currentUser?.metadata.user.user_role === "receptionist";

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          {currentUser &&
            isAdmin &&
            privateRoutes.map((route, index) => {
              if (route.type === "admin") {
                const Page = route.component;
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              }
            })}
          {currentUser &&
            isCustomer &&
            privateRoutes.map((route, index) => {
              if (route.type === "customer") {
                const Page = route.component;
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              }
            })}
          {currentUser &&
            isStaff &&
            privateRoutes.map((route, index) => {
              if (route.type === "staff") {
                const Page = route.component;
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              }
            })}
          {currentUser &&
            isReceptionist &&
            privateRoutes.map((route, index) => {
              if (route.type === "receptionist") {
                const Page = route.component;
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              }
            })}
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
