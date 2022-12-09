import React, { useEffect } from "react";
import { FormControl, NativeSelect, Box } from "@mui/material";
import getRealTimeChart from "./realtime_chart";
import PlotEEG1 from "./PlotEEG1";
import PlotEEG2 from "./PlotEEG2";
import PlotPPG from "./PlotPPG";
import PlotX from "./PlotX";
import PlotY from "./PlotY";
import PlotZ from "./PlotZ";
import Api from "../../../API/API";
import cookie from "../../../API/cookie";
import PlotPPGIR from "./PlotPPGIR";

var g_recv_idx = 800;
var last = 0;
const d3 = document.createElement("script");
d3.src = "https://d3js.org/d3.v4.min.js";
d3.async = true;
var chart = [];
const id = window.location.href.split("/")[5];
var willBeUploadedDataArr = [];

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

function ExperimentMachineListPageMiddle(props) {
  const datas = props.data;
  const state = props.state;
  const machine = props.machine;
  const [limit, setLimit] = React.useState([]);
  const signal_names = ["EEG1", "EEG2", "PPG","SPO2", "X", "Y", "Z"];
  const widths = window.innerWidth * 0.6;
  const [Timer, setTimer] = React.useState(0);
  const [timestatus, settimeStatus] = React.useState(false);
  let endtime;
  const starttime = props.starttime;
  const limits = props.limit;
  const [timestatus2, settimeStatus2] = React.useState(false);
  const starttime2 = props.starttime2;
  let endtime2;
  setInterval(() => {
    setTimer(Timer + 30);
  }, 30000);
  React.useEffect(() => {
    if (starttime2 == undefined) {
      if (!timestatus) {
        endtime = new Date();
        if (((endtime - starttime) / 1000) > 30) {
          console.log("down2");
          settimeStatus(true);
          bluetoothService = machine;
          bluetoothService
            .getCharacteristic(WRITE_UUID)
            .then(function (characteristic) {
              var deviceChar = characteristic;
              const cmd_intense = "100|0";
              var uint8array_intense = new TextEncoder().encode(cmd_intense);
              deviceChar
                .writeValueWithoutResponse(uint8array_intense);
            });
        }
      }
    } else {
      if (!timestatus2) {
        endtime2 = new Date();
        if (((endtime2 - starttime2) / (1000 * 60)) > limits) {
          settimeStatus2(true);
          console.log("down");
          bluetoothService = machine;
          bluetoothService
            .getCharacteristic(WRITE_UUID)
            .then(function (characteristic) {
              var deviceChar = characteristic;
              const cmd_intense = "910|1";
              var uint8array_intense = new TextEncoder().encode(cmd_intense);
              deviceChar
                .writeValueWithoutResponse(uint8array_intense)
                .then(function () {
                  const cmd_interval = "100|0";
                  var uint8array_interval = new TextEncoder().encode(cmd_interval);
                  deviceChar
                    .writeValueWithoutResponse(uint8array_interval);
                });
            });
        }
      }
    }
  },[Timer, starttime2])
  const opts = {
    width: widths,
    height: 200,
    pxAlign: false,
    scales: {
      x: {
        time: false,
      },
      y: {
        auto: true,
      },
    },
    axes: [
      {
        show: false,
      },
    ],
    series: [
      { label: "데이터 갯수" },
      {
        label: "값",
        stroke: "blue",
      },
    ],
  };

  function init() {
    for (var i = 0; i < 6; i++) {
      chart[i] = getRealTimeChart();
    }
    var upload_timer = window.setInterval(uploadData, 4000);
  }

  {
    init();
  }

  function uploadData() {
    const signal_names2 = [
      "B3_5_EEG1",
      "B6_8_EEG2",
      "B9_11_PPG_avg",
      "SPO2",
      "B27_28_X",
      "B29_30_Y",
      "B31_32_Z",
    ];
    if (state != "Pause") {
      for (var i = 0; i < 6; i++) {
        willBeUploadedDataArr.push({
          proto_exp_id: id,
          code: signal_names[i],
          time: datas["t"],
          v: datas[signal_names2[i]],
        });
      }

      if (g_recv_idx <= last) {
         const getData = async () => {
          const infoData = await Api.getAPI_PostData(willBeUploadedDataArr,defaultValue);
        };
        getData();
        g_recv_idx = g_recv_idx+ 600;
        willBeUploadedDataArr = [];
      }
      last = datas["t"];
    }
  }

  function list(i) {
    if (datas == undefined) {
      return 0;
    } else if (i == 0) {
      return (
        <PlotEEG1
          options={opts}
          data={datas[0]["B3_5_EEG1"]}
          state={state}
          limit={limit}
        />
      );
    } else if (i == 1) {
      return (
        <PlotEEG2
          options={opts}
          data={datas[0]["B6_8_EEG2"]}
          state={state}
          limit={limit}
        />
      );
    } else if (i == 2) {
      return (
        <PlotPPG
          options={opts}
          data={datas[0]["B9_11_PPG_avg"]}
          state={state}
          limit={limit}
        />
      );
    }  else if (i == 3) {
      return (
        <PlotPPGIR
          options={opts}
          data={datas[0]["SPO2"]}
          state={state}
          limit={limit}
        />
      );
    } else if (i == 4) {
      return (
        <PlotX
          options={opts}
          data={datas[0]["B27_28_X"]}
          state={state}
          limit={limit}
        />
      );
    } else if (i == 5) {
      return (
        <PlotY
          options={opts}
          data={datas[0]["B29_30_Y"]}
          state={state}
          limit={limit}
        />
      );
    } else {
      return (
        <PlotZ
          options={opts}
          data={datas[0]["B31_32_Z"]}
          state={state}
          limit={limit}
        />
      );
    }
  }

  const handleChanges = (event) => {
    var string = event.target.value.split(",");
    setLimit([string[0], string[1]]);
  };

  function roop(i) {
    return (
      <Box>
        <h3
          style={{
            color: "white",
            display: "inline",
            marginLeft: 50,
            marginTop: 20,
          }}
        >
          {signal_names[i]}
        </h3>
        <FormControl
          style={{
            float: "right",
            display: "inline",
            marginRight: "8%",
          }}
        >
          <NativeSelect
            inputProps={{
              name: "age",
              id: "uncontrolled-native",
              fontFamily: "GmarketSansMedium",
            }}
            style={{
              textAlign: "right",
              backgroundColor: "white",
              width: 100,
              fontFamily: "GmarketSansMedium",
            }}
            onChange={handleChanges}
          >
            <option style={{ fontFamily: "GmarketSansMedium" }} value={[10, i]}>
              10sec
            </option>
            <option style={{ fontFamily: "GmarketSansMedium" }} value={[30, i]}>
              30sec
            </option>
            <option
              style={{ fontFamily: "GmarketSansMedium" }}
              value={[60, i]}
            >
              1min
            </option>
          </NativeSelect>
        </FormControl>
        <Box
          style={{
            border: " 2px solid white",
            marginTop: 20,
            width: "80%",
            height: 250,
            marginLeft: 50,
            backgroundColor: "white",
            marginBottom: 30,
          }}
        >
          <Box style={{ marginLeft: 30 }}>{list(i)}</Box>
        </Box>
      </Box>
    );
  }
  return (
    <div id="chartlist" style={{ width: "100%", height: "auto" }}>
      {roop(0)}
      {roop(1)}
      {roop(2)}
      {roop(3)}
      {roop(4)}
      {roop(5)}
      {roop(6)}
    </div>
  );
}

export default ExperimentMachineListPageMiddle;
