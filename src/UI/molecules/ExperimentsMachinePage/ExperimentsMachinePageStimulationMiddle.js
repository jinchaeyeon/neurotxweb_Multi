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

export default function ExperimentsMachinePageStimulationMiddle(props) {
  const protocol_exp_id = window.location.href.split("/")[5];
  const [list, setList] = React.useState([]);
  
  React.useEffect(()=>{
    const getData = async () => {
        const infoData = await Api.getAPI_Stimulus(protocol_exp_id,defaultValue);
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
        <Box>
        <Grid container spacing={2} alignItems="center">
            {list.map((items, index) => (
              <Grid item xs={4} sm={4} md={4} key={index}>
                <Card key={index}>
                  <CardContent>
                    <h5>height: {items.height}</h5>
                    <h5>intensity: {items.intensity}</h5>
                    <h5>interval: {items.interval}</h5>
                    <h5>long: {items.long}</h5>
                    <h5>proto_exp_id: {items.proto_exp_id}</h5>
                    <h5>regdate: {items.regdate}</h5>
                    <h5>serial: {items.serial}</h5>
                    <h5>time: {items.time}</h5>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
