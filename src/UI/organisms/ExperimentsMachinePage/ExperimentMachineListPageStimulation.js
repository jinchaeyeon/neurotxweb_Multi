import * as React from "react";
import {
  Box,
  Button,
  Grid,
  Slider,
  TextField,
  Paper,
  Card,
  CardContent,
  Typography
} from "@mui/material";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Api from "../../../API/API";
import cookie from "../../../API/cookie";
const protocol_exp_id = window.location.href.split("/")[5];
var bluetoothService = null;
const WRITE_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
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
function ExperimentMachineListPageStimulation(props) {
  const machine = props.machine;
  const data = props.data[0].t;
  const [valueWidth, setValueWidth] = React.useState(0);
  const [valueDuration, setValueDuration] = React.useState(20);
  const [valueAmplitude, setValueAmplitude] = React.useState(0);
  const [valueTime, setValueTime] = React.useState(0);
  const [valueLimit, setValueLimit] = React.useState(15);

  //각 설정 값 slider
  const handleWidthSliderChange = (event, newValue) => {
    setValueWidth(newValue);
  };

  const handleDurationSliderChange = (event, newValue) => {
    setValueDuration(newValue);
  };

  const handleAmplitudeSliderChange = (event, newValue) => {
    if(newValue == 0) {
      setValueAmplitude(0);
    }
    else if(newValue == 409.5) {
      setValueAmplitude(5);
    }
    else if(newValue == 819) {
      setValueAmplitude(50);
    }
    else if(newValue == 1228.5) {
      setValueAmplitude(400);
    }
    else if(newValue == 1638) {
      setValueAmplitude(800);
    }
    else if(newValue == 2047.5) {
      setValueAmplitude(1100);
    }
    else if(newValue == 2457) {
      setValueAmplitude(1500);
    }
    else if(newValue == 2866.5) {
      setValueAmplitude(1900);
    }
    else if(newValue == 3276) {
      setValueAmplitude(2400);
    }
    else if(newValue == 3685.5) {
      setValueAmplitude(2700);
    }
    else {
      setValueAmplitude(3100);
    }
  };

  //0일 경우 duration이랑 같은 time으로 지정
  const handleTimeSliderChange = (event, newValue) => {
    if (newValue == 0) {
      newValue = valueDuration;
    }
    setValueTime(newValue);
  };


  const handleLimitSliderChange = (event, newValue) => {
    setValueLimit(newValue);
  };

  //각 자극 리스트 클릭 시 자극 설정
  const handleup = () => {
    AddStimulus(valueAmplitude, valueWidth, valueDuration, valueTime, valueLimit);
  };

  const handleup2 = () => {
    AddStimulus(1100, 100, 50, 50, 30);
  };

  const handleup3 = () => {
    AddStimulus(3100, 100, 50, 50, 30);
  };

  React.useEffect(() => {
  }, [valueAmplitude, valueWidth, valueDuration, valueTime, valueLimit]);

  //자극 전송
  function AddStimulus(Amplitude, width, duration, Time, limit) {
    var sti_intensity = width;
    sti_intensity = parseInt(sti_intensity);
    var sti_interval = duration;
    sti_interval = parseInt(sti_interval);
    var sti_height = Amplitude;
    sti_height = parseInt(sti_height);
    var sti_long = Time;
    sti_long = parseInt(sti_long);

    var obj={
      "proto_exp_id": protocol_exp_id,
      "intensity": sti_intensity,
      "interval": sti_interval,
      "height": sti_height,
      "long": sti_long,
      "time": data,
      
    };

    bluetoothService = machine;
    bluetoothService
      .getCharacteristic(WRITE_UUID)
      .then(function (characteristic) {
        var deviceChar = characteristic;
        const cmd_intense2 = "910|2"; //전송시 자극모드 변환
        var uint8array_intense2 = new TextEncoder().encode(cmd_intense2);
        deviceChar
          .writeValueWithoutResponse(uint8array_intense2)
          .then(function () {
            const cmd_intense = "102|" + sti_intensity;
            var uint8array_intense = new TextEncoder().encode(cmd_intense);
            deviceChar
              .writeValueWithoutResponse(uint8array_intense)
              .then(function () {
                const cmd_interval = "104|" + sti_interval;
                var uint8array_interval = new TextEncoder().encode(cmd_interval);
                deviceChar
                  .writeValueWithoutResponse(uint8array_interval)
                  .then(function () {
                    const cmd_height = "106|" + sti_height;
                    var uint8array_height = new TextEncoder().encode(cmd_height);
                    deviceChar.writeValueWithoutResponse(uint8array_height)
                      .then(function () {
                        const cmd_long = "110|" + sti_long;
                        var uint8array_long = new TextEncoder().encode(cmd_long);
                        deviceChar.writeValueWithoutResponse(uint8array_long);
                      });
                  });
              });
          });
      });
      const getData = async () => {
        const infoData = await Api.getPostStimulus(obj ,defaultValue);
        console.log(infoData);
      };
      getData();  
    alert("자극 전달 완료");
    props.propFunction2(true);
    props.propFunction3(new Date(), valueLimit); //타이머 설정을 위해 props 전달
  }

  //각 설정값 표시 법
  function widthAmplitude() { 
    if (valueAmplitude == 0) {
      return "0mA";
    } else if (valueAmplitude < 50) {
      return "0.1mA";
    } else if (valueAmplitude == 50) {
      return "0.2mA";
    } else if (valueAmplitude == 400) {
      return "0.3mA";
    } else if (valueAmplitude == 800) {
      return "0.4mA";
    } else if (valueAmplitude == 1100) {
      return "0.5mA";
    } else if (valueAmplitude == 1500) {
      return "0.6mA";
    } else if (valueAmplitude == 1900) {
      return "0.7mA";
    } else if (valueAmplitude == 2400) {
      return "0.8mA";
    } else if (valueAmplitude == 2700) {
      return "0.9mA";
    } else {
      return "1.0mA";
    }
  }

  function widthTime() {
    if (valueTime == valueDuration) {
      return "Off";
    } else if (valueTime == 500) {
      return "500ms";
    } else if (valueTime == 1000) {
      return "1000ms";
    } else if (valueTime == 1500) {
      return "1500ms";
    } else if (valueTime == 2000) {
      return "2000ms";
    } else {
      return "2500ms";
    }
  }


  return (
    <Paper
      style={{ height: "100vh", width: "100%", backgroundColor: "#131313" }}
    >
      <Box style={{ color: "#CCCCCC" }}>
        <Box
          style={{
            padding: "0px 10px 30px 10px",
            borderRadius: 5,
            width: "90%",
            marginRight: "5%",
            marginLeft: "5%",
          }}
        ><Box>
            <h4
              style={{
                marginTop: 5,
                marginBottom: 5,
                fontFamily: "GmarketSansMedium",
              }}
            >
              진폭 (Amplitude, mA)
            </h4>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <VolumeUp />
              </Grid>
              <Grid item xs>
                <Slider
                  value={typeof valueAmplitude === "number" ? valueAmplitude : 0}
                  onChange={handleAmplitudeSliderChange}
                  aria-labelledby="input-slider"
                  min={0}
                  max={3700}
                  step={409.5}
                />
              </Grid>
              <Grid item>
                <h3>{widthAmplitude()}</h3>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <h4
              style={{
                marginTop: 0,
                marginBottom: 5,
                fontFamily: "GmarketSansMedium",
              }}
            >
              파형폭 (Phase width, µs)
            </h4>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <VolumeUp />
              </Grid>
              <Grid item xs>
                <Slider
                  value={typeof valueWidth === "number" ? valueWidth : 0}
                  onChange={handleWidthSliderChange}
                  aria-labelledby="input-slider"
                  min={0}
                  max={300}
                  step={50}
                />
              </Grid>
              <Grid item>
                <h3>{valueWidth}µs</h3>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <h4
              style={{
                marginTop: 5,
                marginBottom: 5,
                fontFamily: "GmarketSansMedium",
              }}
            >
              주기 (Pulse duration, ms)
            </h4>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <VolumeUp />
              </Grid>
              <Grid item xs>
                <Slider
                  value={typeof valueDuration === "number" ? valueDuration : 0}
                  onChange={handleDurationSliderChange}
                  aria-labelledby="input-slider"
                  min={20}
                  max={200}
                  step={20}
                />
              </Grid>
              <Grid item>
                <h3>{valueDuration}ms</h3>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <h4
              style={{
                marginTop: 5,
                marginBottom: 5,
                fontFamily: "GmarketSansMedium",
              }}
            >
              꺼짐 간격 (Off-time, ms)
            </h4>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <VolumeUp />
              </Grid>
              <Grid item xs>
                <Slider
                  value={typeof valueTime === "number" ? valueTime : 0}
                  onChange={handleTimeSliderChange}
                  aria-labelledby="input-slider"
                  min={0}
                  max={2500}
                  step={500}
                />
              </Grid>
              <Grid item>
                <h3>{widthTime()}</h3>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <h4
              style={{
                marginTop: 5,
                marginBottom: 5,
                fontFamily: "GmarketSansMedium",
              }}
            >
              타이머 (Timer, min)
            </h4>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <VolumeUp />
              </Grid>
              <Grid item xs>
                <Slider
                  value={typeof valueLimit === "number" ? valueLimit : 0}
                  onChange={handleLimitSliderChange}
                  aria-labelledby="input-slider"
                  min={15}
                  max={60}
                  step={15}
                />
              </Grid>
              <Grid item>
                <h3>{valueLimit}min</h3>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: 5 }}>
            <Typography sx={{ fontSize: 25, fontFamily: "GmarketSansMedium" }} color="white" >
              자극 메뉴얼
            </Typography>
            <Grid container>
              <Grid item lg={4} md={4} sm={4} xs={1}>
                <Card sx={{ width: "90%", backgroundColor: "#393939" }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 20, fontFamily: "GmarketSansMedium" }} color="white" >
                      자율조절 모드
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      진폭 (Amplitude, mA): {widthAmplitude()}
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      파형폭 (phase width, µs): {valueWidth}µs
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      주기 (pulse duration, ms): {valueDuration}ms
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      꺼짐 간격 (off-time, ms): {valueTime}ms
                    </Typography>
                    <Typography sx={{ mb: 1, fontSize: 13, fontFamily: "GmarketSansMedium" }} color="white">
                      타이머 (timer, min): {valueLimit}min
                    </Typography>
                    <Button
                      style={{
                        color: "black",
                        borderRadius: 10,
                        backgroundColor: "#CCCCCC",
                        fontFamily: "GmarketSansMedium",
                        float: "right",
                        marginBottom: 15
                      }}
                      onClick={handleup}
                    >
                      자극 사용
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={4} md={4} sm={4} xs={1}>
                <Card sx={{ width: "90%", backgroundColor: "#393939" }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 20, height: 168, fontFamily: "GmarketSansMedium" }} color="white" >
                      수면유도 모드 - 약
                    </Typography>
                    <Button
                      style={{
                        color: "black",
                        borderRadius: 10,
                        backgroundColor: "#CCCCCC",
                        fontFamily: "GmarketSansMedium",
                        float: "right",
                        marginBottom: 15
                      }}
                      onClick={handleup2}
                    >
                      자극 사용
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={4} md={4} sm={4} xs={1}>
                <Card sx={{ width: "90%", backgroundColor: "#393939" }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 20, height: 168, fontFamily: "GmarketSansMedium" }} color="white" >
                      수면유도 모드 - 강
                    </Typography>
                    <Button
                      style={{
                        color: "black",
                        borderRadius: 10,
                        backgroundColor: "#CCCCCC",
                        fontFamily: "GmarketSansMedium",
                        float: "right",
                        marginBottom: 15
                      }}
                      onClick={handleup3}
                    >
                      자극 사용
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default ExperimentMachineListPageStimulation;
