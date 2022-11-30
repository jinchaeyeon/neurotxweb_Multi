import { Box, TextField, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Api from "../../../API/API";
import cookie from "../../../API/cookie";

function LoginPage() {
  const publicUrl = process.env.PUBLIC_URL;
  const [ID, setID] = React.useState("");
  const [PW, setPW] = React.useState("");
  const handleChangeID = (event) => {
    setID(event.target.value);
  };
  const handleChangePW = (event) => {
    setPW(event.target.value);
  };
  function deleteAllCookies() {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + '=;max-age=0'
    }
  }
  const handlesubmit = async () => {
    const getData = async () => {
      const infoBody = await Api.getAPI_AccountLogin_Syns(ID, PW);
      if (infoBody != null) {
        const infoBody2 = await Api.getUserData(infoBody.data.access_token);
        if (infoBody2.status == 200) {
          if (cookie.getCookie('accessToken') != "") {
            if (cookie.getCookie('accessToken') != infoBody.data.access_token) {
              deleteAllCookies();
              cookie.setCookie("is_Login", 0, 1);
            } else {
              cookie.setCookie("is_Login", 1, 1);
              cookie.setCookie("userAccount", ID, 1);
              cookie.setCookie("userID", infoBody2.data.id, 1);
              cookie.setCookie("accessToken", infoBody.data.access_token, 1);
              cookie.setCookie('is_staff', infoBody2.data.is_staff, 1);
            }
          }
          else {
            cookie.setCookie("is_Login", 1, 1);
            cookie.setCookie("userAccount", ID, 1);
            cookie.setCookie("userID", infoBody2.data.id, 1);
            cookie.setCookie("accessToken", infoBody.data.access_token, 1);
            cookie.setCookie('is_staff', infoBody2.data.is_staff, 1);
          }
          window.location.href ="/";
        }
        else {
          alert('서버 오류입니다. neurotx@neurotx.org로 연락 주세요');
        }
      }
      else { alert('ID와 비밀번호를 확인해주세요.') }
    };
    getData();
  };
  return (
    <Box
      style={{
        display: "block",
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundColor: "#F0F0F0",
      }}
    >
      <Box
        style={{
          width: 381,
          height: "100%",
          position: "absolute",
          left: "35%",
          textAlign: "center",
        }}
      >
        <Box
          style={{
            position: "relative",
            top: "25%",
            width: 381,
            height: 320,
            margin: 0,
            padding: 0,
          }}
        >
          <img
            style={{ marginBottom: 30 }}
            alt="home icon"
            src={`${publicUrl}/logoLogin.png`}
          />
          <TextField
            fullWidth
            value={ID}
            onChange={handleChangeID}
            style={{ marginBottom: 10 }}
            inputProps={{ style: { fontFamily: "GmarketSansMedium" } }}
            placeholder="user ID"
          />
          <TextField
            fullWidth
            value={PW}
            type="password"
            onChange={handleChangePW}
            placeholder="Password"
            inputProps={{ style: { fontFamily: "GmarketSansMedium" } }}
          />
          <Button
            variant="contained"
            style={{
              width: "100%",
              backgroundColor: "#3c486c",
              marginTop: 20,
              fontFamily: "GmarketSansMedium",
            }}
            onClick={handlesubmit}
          >
            Log in
          </Button>
          <Link to="/SignUp" style={{ textDecoration: "none" }}>
            <Button
              variant="text"
              style={{ float: "right", fontFamily: "GmarketSansMedium" }}
            >
              Sign Up
            </Button>
          </Link>
          <Link to="/FindID" style={{ textDecoration: "none" }}>
            <Button
              variant="text"
              style={{ float: "right", fontFamily: "GmarketSansMedium" }}
            >
              Find ID
            </Button>
          </Link>
        </Box>
        <Box
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 20,
            width: "100%",
            textAlign: "center",
          }}
        >
          <h6 style={{ marginBottom: 0, color: "#212529" }}>Version. 1.0.0</h6>
          <h5 style={{ marginTop: 0, color: "#A7A7A7" }}>
            Copyright 2020 ⓒ NeuroTx All RIGHT RESERVED
          </h5>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
