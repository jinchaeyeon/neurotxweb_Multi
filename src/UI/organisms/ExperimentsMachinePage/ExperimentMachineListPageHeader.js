import { Box, Button, Modal } from "@mui/material";
import React from "react";
import CloudIcon from "@mui/icons-material/Cloud";
import { Link } from "react-router-dom";
import ExperimentsMachinePageMarkerHeader from '../../molecules/ExperimentsMachinePage/ExperimentsMachinePageMarkerHeader';
import ExperimentsMachinePageMarkerMiddle from '../../molecules/ExperimentsMachinePage/ExperimentsMachinePageMarkerMiddle';
import Api from "../../../API/API";
import cookie from "../../../API/cookie";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  minWidth: 600,
  bgcolor: "#383b40",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
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
var times;
var today = new Date();
var bluetoothService = null;
const WRITE_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
const protocol_exp_id = window.location.href.split("/")[5];

function ExperimentMachineListPageHeader(props) {
  const time = props.data[0].t;
  const machine = props.machine;
  const starttime = props.starttime;
  const Experimentsid = window.location.href.split("/");
  const [state, setState] = React.useState(true);
  const [openMarker, setOpenMarker] = React.useState(false);
  const handleOpenTrue = () => {
    props.propFunction2(false);
  };
  const handleMarkerOpenTrue = () => {
    times = new Date();
    setOpenMarker(true);
  };
  const handleMarkerCloseTrue = () => setOpenMarker(false);
  const handleState = () => {
    setState(!state);
    props.propFunction(!state);
  };

  const handleStateon = () => {
    var id = protocol_exp_id;

    var obj = {
      proto_exp_id: id,
      intensity: 0,
      interval: 0,
      height: 0,
      long: 0,
      time: time,
    };

    var sti_intensity = 0;
    sti_intensity = parseInt(sti_intensity);
    var sti_interval = 0;
    sti_interval = parseInt(sti_interval);
    var sti_height = 0;
    sti_height = parseInt(sti_height);
    var sti_long = 0;
    sti_long = parseInt(sti_long);

    bluetoothService = machine;
    bluetoothService
      .getCharacteristic(WRITE_UUID)
      .then(function (characteristic) {
        var deviceChar = characteristic;
        const cmd_intense = "910|1";
        var uint8array_intense2 = new TextEncoder().encode(cmd_intense)
        deviceChar
        .writeValueWithoutResponse(uint8array_intense2)
          .then(function (characteristic) {
            var deviceChar = characteristic;
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
    alert("자극이 종료되었습니다.")
  }

  const addTriger = async () => {
    var id = protocol_exp_id;

    var t = time;
    var obj = {
      proto_exp_id: id,
      "time": t
    };
    const getData = async () => {
      const infoData = await Api.getAPI_PostTrigger(obj, defaultValue);
      if (infoData.status == 200) {
        alert("트리거가 추가되었습니다.")
      }
    };
    getData();

  }

  return (
    <Box style={{ width: "93%", height: "10.7vh", marginBottom: 20 }}>
      <CloudIcon
        style={{
          color: "#2877b9",
          marginRight: 8,
          marginLeft: 50,
          marginTop: 20,
        }}
      />
      <h2 style={{ color: "white", display: "inline" }}>Mornitoring</h2>
      <Button
        variant="contained"
        style={{
          display: "inline",
          backgroundColor: "#5e646b",
          marginLeft: 50,
          fontFamily: "GmarketSansMedium",
        }}
        onClick={addTriger}
      >
        Trigger
      </Button>
      {state == true ? (
        <Button
          variant="contained"
          onClick={handleState}
          style={{
            display: "inline",
            backgroundColor: "#5e646b",
            marginLeft: 10,
            fontFamily: "GmarketSansMedium",
          }}
        >
          pause
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleState}
          style={{
            display: "inline",
            backgroundColor: "#5e646b",
            marginLeft: 10,
            fontFamily: "GmarketSansMedium",
          }}
        >
          start
        </Button>
      )}
      <Link to={`../ExperimentsResult/${Experimentsid[4]}/${Experimentsid[5]}`}>
        <Button
          variant="contained"
          style={{
            float: "right",
            display: "inline",
            backgroundColor: "#2877b9",
            marginTop: 25,
            fontFamily: "GmarketSansMedium",
          }}
        >
          실험 종료
        </Button>
      </Link>
      <Button
        variant="contained"
        style={{
          float: "right",
          display: "inline",
          backgroundColor: "#5e646b",
          marginTop: 25,
          marginRight: 20,
          fontFamily: "GmarketSansMedium",
        }}
        onClick={handleMarkerOpenTrue}
      >
        Marker
      </Button>
      <Modal
        open={openMarker}
        onClose={handleMarkerCloseTrue}
        BackdropProps={{ style: { opacity: 0.2 } }}
      >
        <Box sx={style}>
          <ExperimentsMachinePageMarkerHeader propFunction={handleMarkerCloseTrue} />
          <ExperimentsMachinePageMarkerMiddle regtime={today} t={time} data={times} propFunction={handleMarkerCloseTrue} />
        </Box>
      </Modal>
      <Button
        variant="contained"
        style={{
          float: "right",
          display: "inline",
          backgroundColor: "#5e646b",
          marginTop: 25,
          marginRight: 20,
          fontFamily: "GmarketSansMedium",
        }}
        onClick={handleOpenTrue}
      >
        자극 설정
      </Button>
      <Button
        variant="contained"
        style={{
          float: "right",
          display: "inline",
          backgroundColor: "#5e646b",
          marginTop: 25,
          marginRight: 20,
          fontFamily: "GmarketSansMedium",
        }}
        onClick={handleStateon}
      >
        자극 종료
      </Button>
    </Box>
  );
}

export default ExperimentMachineListPageHeader;
