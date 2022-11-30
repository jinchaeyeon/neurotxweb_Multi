import * as React from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";
import Hidden from '@mui/material/Hidden';
import Api from "../../../API/API";
import cookie from "../../../API/cookie";

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

export default function ExperimentSubPageChangeModalMiddle(props) {
  const [name, setName] = React.useState("");
  const [sex, setSex] = React.useState("W");
  const [birthday, setBirthday] = React.useState("");
  const [maindiagnosis, setMaindiagnosis] = React.useState("");
  const [link, setLink] = React.useState("");
  const [file, setFile] = React.useState("");
  const FileInput = React.useRef();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  const handleBirthdayChange = (event) => {
    setBirthday(event.target.value);
  };

  const handleMaindiagnosisChange = (event) => {
    setMaindiagnosis(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const FileChange = (e) => {
    const Files = e.target.files[0];
    const FormDatas = new FormData();
    FormDatas.append('fileData', Files);
    const getData = async () => {
      const infoBody = await Api.getAPI_PostFile(
        FormDatas,
        defaultValue
      );
      if (infoBody.status == 200) {
        alert('upload!');
      }
    };
    getData();
    setFile(Files);
  };

  const handleup = () => {
    if (name == "" || name == null || name == undefined) {
      alert("이름은 필수 항목입니다.");
    } else if (sex == "" || sex == null || sex == undefined) {
      alert("성별은 필수 항목입니다.");
    } else if (birthday == "" || birthday == null || birthday == undefined) {
      alert("생년월일은 필수 항목입니다.");
    } else if (
      birthday.length != 8
    ) {
      alert("숫자 8자리로 입력해주세요")
    } else if (link == "" || link == null || link == undefined) {
      alert("링크는 필수 항목입니다.");
    } else if (
      link.substring(0, 7) != "http://" && link.substring(0, 8) != "https://"
    ) {
      alert("링크 형식이 맞지 않습니다.");
    } else {
      props.propFunction(name, sex, birthday, maindiagnosis, link, file, defaultValue);
    }
  };
  return (
    <Box style={{ color: "#CCCCCC", height: 300 }}>
      <Box
        style={{
          padding: "10px 10px 30px 10px",
          marginBottom: 24,
          border: "1px solid black",
          borderRadius: 5,
        }}
      >
        <Box style={{ display: "block", height: 37 }}>
          <Hidden lgUp>
            <h6 style={{ display: "inline", paddingLeft: "5%", fontFamily: 'GmarketSansMedium' }}>이름:</h6>
          </Hidden>
          <Hidden lgDown>
            <h4 style={{ display: "inline", paddingLeft: "15%", fontFamily: 'GmarketSansMedium' }}>이름:</h4>
          </Hidden>
          <TextField
            value={name}
            size="small"
            style={{
              float: "right",
              width: "37%",
              marginRight: "10%",
              backgroundColor: "white",
            }}
            onChange={handleNameChange}
            inputProps={{ style: { fontFamily: 'GmarketSansMedium' } }}
          />
        </Box>
        <Box style={{ display: "block", height: 37, marginTop: 10 }}>
          <Hidden lgUp>
            <h6 style={{ display: "inline", paddingLeft: "5%", fontFamily: 'GmarketSansMedium' }}>성별:</h6>
          </Hidden>
          <Hidden lgDown>
            <h4 style={{ display: "inline", paddingLeft: "15%", fontFamily: 'GmarketSansMedium' }}>성별:</h4>
          </Hidden>
          <FormControl
            style={{ float: "right", width: "37%", marginRight: "10%" }}
          >
            <Select
              size="small"
              value={sex}
              style={{
                backgroundColor: "white",
                fontFamily: 'GmarketSansMedium'
              }}
              onChange={handleSexChange}
            >
              <MenuItem style={{ fontFamily: 'GmarketSansMedium' }} value={"M"}>남성</MenuItem>
              <MenuItem style={{ fontFamily: 'GmarketSansMedium' }} value={"W"}>여성</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box style={{ display: "block", height: 37, marginTop: 10 }}>
          <Hidden lgUp>
            <h6 style={{ display: "inline", paddingLeft: "5%", fontFamily: 'GmarketSansMedium' }}>생년월일(8자리):</h6>
          </Hidden>
          <Hidden lgDown>
            <h4 style={{ display: "inline", paddingLeft: "15%", fontFamily: 'GmarketSansMedium' }}>생년월일(8자리):</h4>
          </Hidden>
          <TextField
            value={birthday}
            size="small"
            type="number"
            style={{
              float: "right",
              width: "37%",
              marginRight: "10%",
              backgroundColor: "white",
            }}
            onChange={handleBirthdayChange}
            inputProps={{ style: { fontFamily: 'GmarketSansMedium' } }}
          />
        </Box>
        <Box style={{ display: "block", height: 37, marginTop: 10 }}>
          <Hidden lgUp>
            <h6 style={{ display: "inline", paddingLeft: "5%", fontFamily: 'GmarketSansMedium' }}>주진단명:</h6>
          </Hidden>
          <Hidden lgDown>
            <h4 style={{ display: "inline", paddingLeft: "15%", fontFamily: 'GmarketSansMedium' }}>주진단명:</h4>
          </Hidden>
          <TextField
            value={maindiagnosis}
            size="small"
            style={{
              float: "right",
              width: "37%",
              marginRight: "10%",
              backgroundColor: "white",
            }}
            onChange={handleMaindiagnosisChange}
            inputProps={{ style: { fontFamily: 'GmarketSansMedium' } }}
          />
        </Box>
        <Box style={{ display: "block", height: 37, marginTop: 10 }}>
          <Hidden lgUp>
            <h6 style={{ display: "inline", paddingLeft: "5%", fontFamily: 'GmarketSansMedium' }}>설문조사 링크:</h6>
          </Hidden>
          <Hidden lgDown>
            <h4 style={{ display: "inline", paddingLeft: "15%", fontFamily: 'GmarketSansMedium' }}>설문조사 링크:</h4>
          </Hidden>
          <TextField
            value={link}
            size="small"
            style={{
              float: "right",
              width: "37%",
              marginRight: "10%",
              backgroundColor: "white",
            }}
            onChange={handleLinkChange}
            inputProps={{ style: { fontFamily: 'GmarketSansMedium' } }}
          />
        </Box>
        <Box style={{ display: "block", height: 37, marginTop: 10 }}>
          <Hidden lgUp>
            <h6 style={{ display: "inline", paddingLeft: "5%", fontFamily: 'GmarketSansMedium' }}>동의서 파일선택:</h6>
          </Hidden>
          <Hidden lgDown>
            <h4 style={{ display: "inline", paddingLeft: "15%", fontFamily: 'GmarketSansMedium' }}>동의서 파일선택:</h4>
          </Hidden>
          <input
            style={{
              float: "right",
              width: "37%",
              marginRight: "10%",
              backgroundColor: "white",
              fontFamily: 'GmarketSansMedium'
            }}
            id="file"
            name="file"
            type="file"
            ref={FileInput}
            onChange={FileChange}
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
          save
        </Button>
      </Box>
    </Box>
  );
}
