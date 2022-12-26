import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
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
import Hidden from '@mui/material/Hidden';
import Api from "../../API/API";
//user_id cookie
var defaultValue;

let user_id = cookie.getCookie("userAccount")
  ? cookie.getCookie("userAccount")
  : "";
var api_token = cookie.getCookie("accessToken");

if (user_id) {
  defaultValue = {
    key: api_token,
  };
}
var data;
const App = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  var user_id = cookie.getCookie("userAccount");
  setInterval(() => { //중복 로그인 수시 체크
    console.log(user_id);
    if (user_id != "") { // 유저 정보 없을 시 로그인 필요
      const getData = async () => {
        const infoBody = await Api.getAPI_user( //유저 정보 조회
          parseInt(cookie.getCookie("userID")),
          defaultValue
        );
        if (infoBody.data.tokens == "NULL") { //토큰이 없을 시 중복로그인 설정
          alert("중복 로그인입니다. 다시 로그인 해주세요.");
          cookie.deleteCookie("userAccount");
          cookie.deleteCookie("userID");
          cookie.deleteCookie("accessToken");
          cookie.deleteCookie('is_staff');
          window.location.href = "/";
        }
      }
      getData();
    };
  }, 5000); //5초마다 측정
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                user_id == "" ? ( //유저정보로 로그인 페이지와 실험 페이지 구분
                  <Box style={{ display: "flex", width: "100%" }}>
                    <Box style={{ width: "100%" }}>
                      <LoginPage />
                    </Box>
                  </Box>
                ) : (
                  <Box style={{ display: "flex", width: "100%" }}>
                    <Sidebar
                      onMobileClose={() => setMobileNavOpen(false)}
                      openMobile={isMobileNavOpen}
                    />
                    <Box style={{ width: "100%" }}>
                      <Header onMobileNavOpen={() => setMobileNavOpen(true)} />
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
                  <Sidebar
                    onMobileClose={() => setMobileNavOpen(false)}
                    openMobile={isMobileNavOpen}
                  />
                  <Box style={{ width: "100%" }}>
                    <Header onMobileNavOpen={() => setMobileNavOpen(true)} />
                    <ExperimentsSubPage />
                  </Box>
                </Box>
              }
            />
            <Route
              path="/ExperimentsSub/:id/:subid"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Sidebar
                    onMobileClose={() => setMobileNavOpen(false)}
                    openMobile={isMobileNavOpen}
                  />
                  <Box style={{ width: "100%" }}>
                    <Header onMobileNavOpen={() => setMobileNavOpen(true)} />
                    <ExperimentsMachinePage />
                  </Box>
                </Box>
              }
            />
            <Route
              path="/ExperimentsResult/:id/:subid"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Sidebar
                    onMobileClose={() => setMobileNavOpen(false)}
                    openMobile={isMobileNavOpen}
                  />
                  <Box style={{ width: "100%" }}>
                    <Header onMobileNavOpen={() => setMobileNavOpen(true)} />
                    <ExperimentsResultPage />
                  </Box>
                </Box>
              }
            />
            <Route
              path="/User"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Sidebar
                    onMobileClose={() => setMobileNavOpen(false)}
                    openMobile={isMobileNavOpen}
                  />
                  <Box style={{ width: "100%" }}>
                    <Header onMobileNavOpen={() => setMobileNavOpen(true)} />
                    <UserPage />
                  </Box>
                </Box>
              }
            />
            <Route
              path="/License"
              element={
                <Box style={{ display: "flex", width: "100%" }}>
                  <Sidebar
                    onMobileClose={() => setMobileNavOpen(false)}
                    openMobile={isMobileNavOpen}
                  />
                  <Box style={{ width: "100%" }}>
                    <Header onMobileNavOpen={() => setMobileNavOpen(true)} />
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
