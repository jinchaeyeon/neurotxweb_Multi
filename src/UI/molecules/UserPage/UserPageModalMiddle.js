import * as React from "react";
import { Box, TextField, Button } from "@mui/material";

export default function UserPageModalMiddle(props) {
  const [text, setText] = React.useState(props.Email.Email);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleup = () => {
    if (text != "") {
      var reg_email =
        /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
      if (!reg_email.test(text)) {
        alert("이메일 형식이 아닙니다.");
      } else {
        return props.propFunction(props, text);
      }
      
    } else {
      alert("필수항목입니다.");
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
        <h4 style={{ display: "inline", paddingLeft: "15%",fontFamily: 'GmarketSansMedium' }}>Email :</h4>
        <TextField
          value={text}
          size="small"
          style={{
            float: "right",
            width: "50%",
            marginRight: "20%",
            backgroundColor: "white",
          }}
          onChange={handleChange}
          inputProps={{style:{fontFamily: 'GmarketSansMedium'}}}
        />
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
          save
        </Button>
      </Box>
    </Box>
  );
}
