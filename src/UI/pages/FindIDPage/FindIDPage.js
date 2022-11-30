import { Box, TextField, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Api from "../../../API/API";

function FindIDPage() {
  const [Email, setEmail] = React.useState("");
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleFindID = async() => {
    if(Email != null){
      const infoBody = await Api.getAPI_FindID(Email);
      if (infoBody != null) {
        alert("회원님의 아이디는 " + infoBody.data + "입니다.")
        window.location.href="/";
      }
    }else{
      alert("모든 빈칸은 다 채워주세요.")
    }
  }
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
         <Box style={{height: 27, width: "100%", borderBottom: "1px solid #c1c1c1", color: "#212529"}}>
            <h3>아이디 찾기</h3>
         </Box>
         <Box style={{height: 27, width: "100%", borderBottom: "1px solid #c1c1c1"}}>
            <h5>아이디를 찾는데 문제가 있으신가요? 관리자에게 요청하세요.</h5>
         </Box>
          <TextField
            fullWidth
            value={Email}
            onChange={handleChangeEmail}
            style={{ marginBottom: 10 }}
            placeholder="E-mail"
            inputProps={{style:{fontFamily: 'GmarketSansMedium'}}}
          />
            <Button
              variant="contained"
              style={{ marginRight: 5, marginTop: 20, backgroundColor: "#2877b9",fontFamily: 'GmarketSansMedium' }}
              onClick={handleFindID}
            >
              확인
            </Button>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              style={{ marginRight: 5, marginTop: 20, backgroundColor: "#868e96",fontFamily: 'GmarketSansMedium' }}
            >
              닫기
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
          <h5 style={{ marginTop: 0, color: "#A7A7A7" }}>
            Copyright 2020 ⓒ NeuroTx All RIGHT RESERVED
          </h5>
        </Box>
      </Box>
    </Box>
  );
}

export default FindIDPage;
