import { Box, Card, CardContent, Grid, TextField, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Api from "../../../API/API";
import Hidden from '@mui/material/Hidden';

function SignUpPage() {
  const publicUrl = process.env.PUBLIC_URL;
  const [ID, setID] = React.useState("");
  const [Name, setName] = React.useState("");
  const [PW, setPW] = React.useState("");
  const [PWCheck, setPWCheck] = React.useState("");
  const [License, setLicense] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const handleChangeID = (event) => {
    setID(event.target.value);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangePW = (event) => {
    setPW(event.target.value);
  };
  const handleChangePWCheck = (event) => {
    setPWCheck(event.target.value);
  };
  const handleChangeLicense = (event) => {
    setLicense(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  function _getCurrentDateTime() {
    var today = new Date();
    var mm = today.getMonth() + 1; // getMonth() is zero-based
    var dd = today.getDate();
    var h = today.getHours();
    var M = today.getMinutes();
    var s = today.getSeconds();
    var d = [
      today.getFullYear(),
      "-",
      (mm > 9 ? "" : "0") + mm,
      "-",
      (dd > 9 ? "" : "0") + dd,
      " ",
      (h > 9 ? "" : "0") + h,
      ":",
      (M > 9 ? "" : "0") + M,
      ":",
      (s > 9 ? "" : "0") + s,
    ].join("");
    return d;
  }
  const handlesubmit = async () => {
    if (
      ID != null &&
      Name != null &&
      PW != null &&
      PWCheck != null &&
      License != null &&
      Email != null
    ) {
      if (PW == PWCheck) {
        const date = _getCurrentDateTime();
        const infoBody = await Api.getAPI_SignUp(
          ID,
          PW,
          Email,
          Name,
          false,
          date,
          License
        );
        if (infoBody != null) {
          alert("가입되었습니다. 로그인 후 이용해 주세요.");
          window.location.href = "/";
        }
      } else {
        alert("입력하신 두개의 비밀번호가 서로 다릅니다.");
      }
    } else {
      alert("모든 빈칸은 다 채워주세요");
    }
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
          width: "60%",
          height: "100vh",
          position: "absolute",
          left: "20vw",
          textAlign: "center",
        }}
      >
        <Box
          style={{
            position: "relative",
            top: "25%",
            width: "100%",
            height: "30%",
            margin: 0,
            padding: 0,
          }}
        >
          <img
            style={{ marginBottom: 30, maxWidth: "30vw", height: "5vh" }}
            alt="home icon"
            src={`${publicUrl}/logoLogin.png`}
          />
          <Card style={{ width: "100%" }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item md={6} xs={6}>
                  <TextField
                    fullWidth
                    label="User Id"
                    variant="outlined"
                    onChange={handleChangeID}
                    inputProps={{ style: { fontFamily: "GmarketSansMedium" } }}
                  />
                </Grid>
                <Grid item md={6} xs={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    onChange={handleChangeName}
                    inputProps={{ style: { fontFamily: "GmarketSansMedium" } }}
                  />
                </Grid>
                <Grid item md={6} xs={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="Password"
                    variant="outlined"
                    onChange={handleChangePW}
                    inputProps={{ style: { fontFamily: "GmarketSansMedium" } }}
                  />
                </Grid>
                <Grid item md={6} xs={6}>
                  <TextField
                    fullWidth
                    label="Password Check"
                    variant="outlined"
                    type="Password"
                    onChange={handleChangePWCheck}
                    inputProps={{ style: { fontFamily: "GmarketSansMedium" } }}
                  />
                </Grid>
                <Grid item md={6} xs={6}>
                  <TextField
                    fullWidth
                    label="LicenseKey"
                    variant="outlined"
                    onChange={handleChangeLicense}
                    inputProps={{ style: { fontFamily: "GmarketSansMedium" } }}
                  />
                </Grid>
                <Grid item md={6} xs={6}>
                  <TextField
                    fullWidth
                    label="E-mail"
                    variant="outlined"
                    onChange={handleChangeEmail}
                    inputProps={{ style: { fontFamily: "GmarketSansMedium" } }}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <Hidden lgUp>
                    <Box style={{ float: "right" }}>
                      <Button
                        variant="contained"
                        style={{
                          marginRight: 5,
                          backgroundColor: "#2877b9",
                          fontFamily: "GmarketSansMedium",
                          fontSize: 5,
                          width: 20,
                          height: 35
                        }}
                        onClick={handlesubmit}
                      >
                        Sign Up
                      </Button>
                      <Link to="/" style={{ textDecoration: "none" }}>
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#868e96",
                            fontFamily: "GmarketSansMedium",
                            fontSize: 5,
                            width: 20,
                            height: 35
                          }}
                        >
                          Cancel
                        </Button>
                      </Link>
                    </Box>
                  </Hidden>
                  <Hidden lgDown>
                    <Box style={{ float: "right" }}>
                      <Button
                        variant="contained"
                        style={{
                          marginRight: 5,
                          backgroundColor: "#2877b9",
                          fontFamily: "GmarketSansMedium",
                        }}
                        onClick={handlesubmit}
                      >
                        Sign Up
                      </Button>
                      <Link to="/" style={{ textDecoration: "none" }}>
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#868e96",
                            fontFamily: "GmarketSansMedium",
                          }}
                        >
                          Cancel
                        </Button>
                      </Link>
                    </Box>
                  </Hidden>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
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
          <Hidden mdDown>
            <h6 style={{ marginBottom: 0, color: "#212529" }}>Version. 1.0.0</h6>
            <h5 style={{ marginTop: 0, color: "#A7A7A7" }}>
              Copyright 2020 ⓒ NeuroTx All RIGHT RESERVED
            </h5>
          </Hidden>
          <Hidden mdUp>
            <h6 style={{ marginBottom: 0, color: "#212529", fontSize: 6 }}>Version. 1.0.0</h6>
            <h5 style={{ marginTop: 0, color: "#A7A7A7", fontSize: 8 }}>
              Copyright 2020 ⓒ NeuroTx All RIGHT RESERVED
            </h5>
          </Hidden>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUpPage;
