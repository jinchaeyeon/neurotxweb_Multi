import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Header from "../organisms/Header/Header";
import Sidebar from "../organisms/Sidebar/Sidebar";
import ExperimentsPage from "../pages/ExperimentsPage/ExperimentsPage";
import UserPage from "../pages/UserPage/UserPage";
import LicensePage from "../pages/LicensePage/LicensePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import FindIDPage from "../pages/FindIDPage/FindIDPage";
import ExperimentsSubPage from "../pages/ExperimentsSubPage/ExperimentsSubPage";
import ExperimentsMachinePage from "../pages/ExperimentsMachinePage/ExperimentsMachinePage";
import ExperimentsResultPage from "../pages/ExperimentsResultPage/ExperimentsResultPage";
import "./App.css";
import Box from "@mui/material/Box";
import cookie from "../../API/cookie";
import WebGLPage from "../pages/WebGLPage/WebGLPage";

const App = () => {
  var user_id = cookie.getCookie("userAccount");
  setInterval(() =>  {
    if (cookie.getCookie("is_Login") == 0) {
      alert("중복 로그인입니다. 다시 로그인 해주세요.");
      cookie.deleteCookie();
      cookie.setCookie("is_Login", 1, 1);
      window.location.href = "/";
    }
  }, 1000);
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                user_id == "" ? (
                  <Box style={{ display: "flex", width: "100%" }}>
                    <Box style={{ width: "100%" }}>
                      <LoginPage />
                    </Box>
                  </Box>
                ) : (
                  <Box style={{ display: "flex", width: "100%" }}>
                    <Sidebar />
                    <Box style={{ width: "100%" }}>
                      <Header />
                      <ExperimentsPage />
                    </Box>
                  </Box>
                )
              }
            />
            <Route
              path="/Login"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Box style={{ width: "100%" }}>
                    <LoginPage />
                  </Box>
                </Box>
              }
            />
            <Route
              path="/SignUp"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Box style={{ width: "100%" }}>
                    <SignUpPage />
                  </Box>
                </Box>
              }
            />
            <Route
              path="/FindID"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Box style={{ width: "100%" }}>
                    <FindIDPage />
                  </Box>
                </Box>
              }
            />
            <Route
              path="/ExperimentsSub/:id"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Sidebar />
                  <Box style={{ width: "100%" }}>
                    <Header />
                    <ExperimentsSubPage />
                  </Box>
                </Box>
              }
            />
            <Route
              path="/ExperimentsSub/:id/:subid"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Sidebar />
                  <Box style={{ width: "100%" }}>
                    <Header />
                    <ExperimentsMachinePage />
                  </Box>
                </Box>
              }
            />
            <Route
              path="/ExperimentsResult/:id/:subid"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Sidebar />
                  <Box style={{ width: "100%" }}>
                    <Header />
                    <ExperimentsResultPage />
                  </Box>
                </Box>
              }
            />
            <Route
              path="/User"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Sidebar />
                  <Box style={{ width: "100%" }}>
                    <Header />
                    <UserPage />
                  </Box>
                </Box>
              }
            />
            <Route
              path="/License"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Sidebar />
                  <Box style={{ width: "100%" }}>
                    <Header />
                    <LicensePage />
                  </Box>
                </Box>
              }
            />
            <Route
              path="/WebGLPage"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Box style={{ width: "100%" }}>
                    <WebGLPage />
                  </Box>
                </Box>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
