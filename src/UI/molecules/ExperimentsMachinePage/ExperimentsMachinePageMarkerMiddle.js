import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, TextField,Grid, Card,CardContent } from "@mui/material";
import Api from '../../../API/API';
import cookie from '../../../API/cookie';

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
var count = 0;
export default function ExperimentPageMarkerMiddle(props) {
  const protocol_exp_id = window.location.href.split("/")[5];
  const [time, setTime] = React.useState(props.data);
  const t = props.t;
  const regtime = props.regtime;
  const [list, setList] = React.useState([]);
  const [text, setText] = React.useState("");
  //마커 수정 및 추가
  const handleup = () => {
    list.map((items) => {
        if(items.regtime == time) {
            const obj = {
                proto_exp_id : protocol_exp_id,
                memo: text,
                time: t,
                regtime: regtime.getTime()
            }
            const getData = async () => {
                const infoData = await Api.getModifyMarker(items.serial,obj, defaultValue);
            };
            getData();
            count= count + 1;
        }
    })

    if(count == 0) {
        const obj = {
            proto_exp_id : protocol_exp_id,
            memo: text,
            time: t,
            regtime: regtime.getTime()
        }
        const getData = async () => {
            const infoData = await Api.getAPI_PostMarker(obj,defaultValue);
          };
          getData();
    }
    props.propFunction(false);
    count = 0;
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  function pad2(n) {
    return (n < 10 ? '0' : '') + n; 
  }

  //시간 표기 변경
  function timetotxt(regtime) {
    var tdate=new Date();
    tdate.setTime(regtime);
    return tdate.getFullYear() +'-'+
    pad2(tdate.getMonth() + 1) + '-'+
    pad2(tdate.getDate()) +' '+
    pad2(tdate.getHours()) +':'+
    pad2(tdate.getMinutes()) +':'+
    pad2(tdate.getSeconds());
  }

  const handledelete = (id) => {
    //마커 삭제
    const getData = async () => {
        const infoData = await Api.getAPI_deleteMarker(id,defaultValue);
      };
      getData();
  }

  const handleModify = ( id, memo, times) => {
    setTime(times);
    setText(memo);
  }
  
  React.useEffect(()=>{
    const getData = async () => {
        const infoData = await Api.getAPI_getMarker(protocol_exp_id,defaultValue);
        setList(infoData.data)
      };
      getData();
})
  return (
    <Box style={{ color: "#CCCCCC", height: 300, display: "inline" }}>
      <Box
        style={{
          padding: "0px 10px 30px 10px",
          borderRadius: 5,
          width: "90%",
          marginRight: 10,
        }}
      >
        <h4>시간: {timetotxt(time)}</h4>
        <h4>내용</h4>
        <TextField
        multiline
        rows={3}
          size="small"
          fullWidth
          style={{
            display: "inline-block",
            backgroundColor: "white",
          }}
          inputProps={{ style: { fontFamily: "GmarketSansMedium" } }}
          onChange={handleChange}
          value={text}
          variant="standard"
        />
        <h4>Event Marker List</h4>
        <Box>
        <Grid container spacing={2} alignItems="center">
            {list.map((items, index) => (
              <Grid item xs={4} sm={4} md={4} key={index}>
                <Card key={index}>
                  <CardContent>
                    <h5>{timetotxt(items.regtime)}</h5>
                    <h6>memo: {items.memo}</h6>
                    <Button
                      onClick={() => handledelete(items.serial)}
                      style={{
                        marginTop: 0,
                        marginBottom: 0,
                        fontFamily: "GmarketSansMedium",
                      }}
                      variant="outlined"
                      size="small"
                    >
                      삭제
                    </Button>
                    <Button
                      onClick={() => handleModify(items.serial, items.memo, items.regtime)}
                      style={{
                        marginTop: 0,
                        marginBottom: 0,
                        fontFamily: "GmarketSansMedium",
                        float: 'right'
                      }}
                      variant="outlined"
                      size="small"
                    >
                      수정
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Button
        style={{
          color: "white",
          borderRadius: 10,
          backgroundColor: "#2877b9",
          marginRight: 5,
          float: "right",
          fontFamily: "GmarketSansMedium",
        }}
        onClick={handleup}
      >
        save
      </Button>
    </Box>
  );
}
