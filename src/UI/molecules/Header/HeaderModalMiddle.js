import * as React from "react";
import { Box, TextField, Button } from "@mui/material";
import Api from "../../../API/API";
import cookie from "../../../API/cookie";

var defaultValue;

let user_id = cookie.getCookie('userAccount') ? cookie.getCookie('userAccount') : '';
var api_token=cookie.getCookie('accessToken');

if(user_id){
  defaultValue  = {
      key: api_token
  }
}

export default function HeaderModalMiddle(props) {
  const [pw, setPW] = React.useState("");
  const [check, setCheck] = React.useState("");

  const handlePWChange = (event) => {
    setPW(event.target.value);
  };
  const handleCheckChange = (event) => {
    setCheck(event.target.value);
  };

  const handleup = async() => {
    if (pw === check) {
      const user= cookie.getCookie('userAccount') ?cookie.getCookie('userAccount') : null;
      const infoBody = await Api.getAPI_ChangePassword(pw, user,defaultValue);
      // alert("변경되었습니다.")
      // props.propFunction(false);
    }
    else {
      alert("비밀번호가 동일하지 않습니다.")
    }
  };

  return (
    <Box style={{ color: "#CCCCCC", height: 132 }}>
      <Box
        style={{
          padding: "10px 10px 30px 10px",
          marginBottom: 24,
          border: "1px solid black",
          borderRadius: 5,
        }}
      >
        <Box style={{ display: "block", height: 37, marginTop: 10 }}>
          <h4 style={{ display: "inline", paddingLeft: "15%",fontFamily: 'GmarketSansMedium' }}>
            변경할 비밀번호 :
          </h4>
          <TextField
            value={pw}
            size="small"
            type="password"
            style={{
              float: "right",
              width: "40%",
              marginRight: "10%",
              backgroundColor: "white",
            }}
            onChange={handlePWChange}
            inputProps={{style:{fontFamily: 'GmarketSansMedium'}}}
          />
        </Box>
        <Box style={{ display: "block", height: 37, marginTop: 10 }}>
          <h4 style={{ display: "inline", paddingLeft: "15%",fontFamily: 'GmarketSansMedium' }}>
            비밀번호 확인 :
          </h4>
          <TextField
            value={check}
            size="small"
            type="password"
            style={{
              float: "right",
              width: "40%",
              marginRight: "10%",
              backgroundColor: "white",
            }}
            onChange={handleCheckChange}
            inputProps={{style:{fontFamily: 'GmarketSansMedium'}}}
          />
        </Box>
      </Box>
      <Box>
        <Button
          style={{
            color: "white",
            borderRadius: 10,
            backgroundColor: "#2877b9",
            marginRight: 5,
            float: "right",
            fontFamily: 'GmarketSansMedium'
          }}
          onClick={handleup}
        >
          비밀번호 수정
        </Button>
      </Box>
    </Box>
  );
}
