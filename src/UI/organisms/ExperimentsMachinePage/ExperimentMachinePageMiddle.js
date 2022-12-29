import * as React from "react";
import { Button, Paper } from "@mui/material";
import { CollectionsBookmarkOutlined } from "@mui/icons-material";

var pt;
var g_recv_idx = 0;
var ir1 = 0;
var red1 = 0;
var t1 = 0;
var ac = 0;
//spo2계산 데이터 형식
var ppg = {
  time: [], //column "time(second)"
  RED:   [], //column "RED"
  IR:  [] //column "IR"
};
export default function ExperimentMachinePageMiddle(props) {
  //연결시 상위 components로 전송
  function handleprops(
    t,
    B3_5_EEG1,
    B6_8_EEG2,
    B9_11_PPG_avg,
    SPO2,
    B27_28_X,
    B29_30_Y,
    B31_32_Z,
    bluetoothService,
    starttime
  ) {
    props.propFunction(
      t,
      B3_5_EEG1,
      B6_8_EEG2,
      B9_11_PPG_avg,
      SPO2,
      B27_28_X,
      B29_30_Y,
      B31_32_Z,
      bluetoothService,
      starttime
    );
  }
  var bluetoothService = null;
  DataView.prototype.getUint24 = function (pos) {
    return (this.getUint16(pos) << 8) + this.getUint8(pos + 2);
  };
  DataView.prototype.getInt24 = function (pos) {
    return (this.getInt16(pos) << 8) + this.getUint8(pos + 2);
  };
  const CURRENT_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
  const NOTIFY_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
  const WRITE_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
  let options = {
    filters: [{ services: [CURRENT_SERVICE_UUID] }],
    optionalServices: ["generic_access"],
  };

  //spo2 계산식
  function getSpo2(ppg) {
    var maxIR = detectPeak(ppg.time, ppg.IR);
    var maxRED = detectPeak(ppg.time, ppg.RED);
    var minIR = detectValley(ppg.time, ppg.IR);
    var minRED = detectValley(ppg.time, ppg.RED);
  
    var ACIR = [];
    var DCIR = [];
    var ACRED = [];
    var DCRED = [];
    var occurTime = [];
  
    for (var i = 0; i < minRED.time.length - 1; i++) {
      var x1 = minRED.time[i];
      var y1 = minRED.valley[i];
      var x2 = minRED.time[i+1];
      var y2 = minRED.valley[i+1];
      var x0 = maxRED.time[i+1];
      var y0 = maxRED.peak[i+1];
      var result = getACDC(x1, y1, x2, y2, x0, y0);
      occurTime.push(x0);
      ACRED.push(result.AC);
      DCRED.push(result.DC);
    }
  
    for (var i = 0; i < minIR.time.length - 1; i++) {
      var x1 = minIR.time[i];
      var y1 = minIR.valley[i];
      var x2 = minIR.time[i+1];
      var y2 = minIR.valley[i+1];
      var x0 = maxIR.time[i+1];
      var y0 = maxIR.peak[i+1];
      var result = getACDC(x1, y1, x2, y2, x0, y0);
      ACIR.push(result.AC);
      DCIR.push(result.DC);
    }
  
    var spo2 = 0;
    var R = 0;
    var count = 0;
    for (var i = 0; i < ACRED.length; i++) {
      if(isNaN((ACRED[i] * DCIR[i]) / (ACIR[i] * DCRED[i]), NaN) == false) {
        R = (ACRED[i] * DCIR[i]) / (ACIR[i] * DCRED[i]);
      }
      var sum = -45.060 * R * R + 30.354 * R + 94.845;
      if(sum > 86) {
        count++;
        spo2 += sum;
      }
    }
    spo2 = spo2/count;
    if(isNaN(spo2, NaN) == true) {
      return 0;
    }
    return spo2;
  }
  
  function detectPeak(time, data) {
    var peaksTime = [];
    var peaks = [];

    for (var i = 1; i < data.length; i++) {
      if (i+1 < data.length && data[i-1] < data[i] && data[i] > data[i+1]) {
        peaksTime.push(time[i]);
        peaks.push(data[i]);
      }
    }
    return {
      time: peaksTime,
      peak: peaks
    };
  }

  function detectValley(time, data) {
  var valleyTime = [];
  var valleys = [];
    for (var i = 1; i < data.length; i++) {
      if (i+1 < data.length && data[i-1] > data[i] && data[i] < data[i+1]) {
        valleyTime.push(time[i]);
        valleys.push(data[i]);
      }
    }
    return {
      time: valleyTime,
      valley: valleys
    };
  }
  
  function getACDC(x1, y1, x2, y2, x0, y0) {
    var y = (y2-y1) / (x2-x1) * (x0-x1) + y1;
    return {
      DC: y,
      AC: y0 - y
    };
  }

  //기기 연결
  function connectDevice() {
    let starttime = new Date();
    navigator.bluetooth.requestDevice(options).then(function (device) {
      var wbdevice = device;
      return wbdevice.gatt.connect().then(function (server) {
        // Getting primary service from device with passed uuid
        return server
          .getPrimaryService(CURRENT_SERVICE_UUID)
          .then(function (service) {
            bluetoothService = service;
            service
              .getCharacteristic(WRITE_UUID)
              .then(function (characteristic) {
                var deviceChar = characteristic;
                const cmd = "910|1"; //연결시 자극 x, 데이터만 o
                var uint8array = new TextEncoder().encode(cmd);
                deviceChar.writeValueWithoutResponse(uint8array);
              });
              
            return service
              .getCharacteristic(NOTIFY_UUID)
              .then(function (characteristic) {
                var deviceChar = characteristic;

                return characteristic.startNotifications().then(function () {
                  g_recv_idx = 0;

                  characteristic.addEventListener(
                    "characteristicvaluechanged",
                    function (event) {
                      var xxx = new Date();

                      var ct = g_recv_idx + 1;

                      //데이터 수집(int형)
                      if (pt) {
                        var DATA = [];
                        DATA[0] = event.target.value.buffer.slice(0, 33 - 1);
                        DATA[1] = event.target.value.buffer.slice(33, 66 - 1);
                        DATA[2] = event.target.value.buffer.slice(66, 99 - 1);
                        DATA[3] = event.target.value.buffer.slice(99, 132 - 1);
                        DATA[4] = event.target.value.buffer.slice(132, 165 - 1);

                        var B9_11_PPG_avg = 0;
                        var PPGIR_avg = 0;
                        for (var i = 0; i < 1; i++) {
                          var t = g_recv_idx++;
                          var td = new DataView(DATA[i]);

                          let u8arr = new Uint8Array([
                            td.getUint8(0),
                            td.getUint8(1),
                            td.getUint8(2),
                            td.getUint8(3),
                            td.getUint8(4),
                            td.getUint8(5),
                            td.getUint8(6),
                            td.getUint8(7),
                            td.getUint8(8),
                            td.getUint8(9),
                            td.getUint8(10),
                            td.getUint8(11),
                            td.getUint8(12),
                            td.getUint8(13),
                            td.getUint8(14),
                            td.getUint8(15),
                            td.getUint8(16),
                            td.getUint8(17),
                            td.getUint8(18),
                            td.getUint8(19),
                            td.getUint8(20),
                            td.getUint8(21),
                            td.getUint8(22),
                            td.getUint8(23),
                            td.getUint8(24),
                            td.getUint8(25),
                            td.getUint8(26),
                            td.getUint8(27),
                            td.getUint8(28),
                            td.getUint8(29),
                            td.getUint8(30),
                            td.getUint8(31),
                          ]);
 
                          var B1 = td.getUint8(0);
                          var B2_SAMPLENUM = td.getUint8(1);
                          var B3_5_EEG1 = td.getInt24(2); //EEG1
                          var B6_8_EEG2 = td.getInt24(5); //EEG2
                          var B9_11_PPG = td.getInt24(8); //PPGRED
                          var PPGIR = td.getInt24(14); //PPGIR
                          var B9_11_PPG_avg = B9_11_PPG + B9_11_PPG_avg;
                          ppg.RED.push(B9_11_PPG);
                          ppg.time.push(t);
                          ppg.IR.push(PPGIR);
                          var spo2 = getSpo2(ppg); 
                          var B27_28_X = td.getUint16(26); //모션센서 X
                          var B29_30_Y = td.getUint16(28); //모션센서 Y
                          var B31_32_Z = td.getUint16(30); //모션센서 Z
                        }
                        handleprops(
                            t,
                            B3_5_EEG1,
                            B6_8_EEG2,
                            parseInt(B9_11_PPG_avg / DATA.length),
                            spo2,
                            B27_28_X,
                            B29_30_Y,
                            B31_32_Z,
                            service,
                            starttime
                        );
                      }
                      pt = ct;
                    }
                  );
                });
              });
          });
      });
    });
  }
  return (
    <Paper
      style={{ height: "70vh", width: "100%", backgroundColor: "#131313" }}
    >
      <h3
        style={{
          position: "absolute",
          color: "white",
          top: "40%",
          left: "35%",
          fontFamily: "GmarketSansMedium",
        }}
      >
        블루투스 기기의 전원을 켜고 아래의 Connect 버튼을 눌러 기기를
        연결해주세요.
      </h3>
      <Button
        onClick={connectDevice}
        style={{
          position: "absolute",
          color: "white",
          top: "50%",
          left: "48%",
          fontFamily: "GmarketSansMedium",
        }}
        variant="contained"
      >
        Connect
      </Button>
    </Paper>
  );
}
