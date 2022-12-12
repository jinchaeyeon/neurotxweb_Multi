import * as React from "react";
import { Button, Paper } from "@mui/material";
import { CollectionsBookmarkOutlined } from "@mui/icons-material";

var pt;
var g_recv_idx = 0;
var ir1 = 0;
var red1 = 0;
var t1 = 0;
var ac = 0;
export default function ExperimentMachinePageMiddle(props) {
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
  function detectPeak(time, data) {
    var peaksTime = [];
    var peaks = [];
    peaksTime.push(time);
    peaks.push(data);

    return {
      time: peaksTime,
      peak: peaks
    };
  }

  function detectValley(time, data) {
    var valleyTime = [];
    var valleys = [];
    valleyTime.push(time);
    valleys.push(data);
    return {
      time: valleyTime,
      valley: valleys
    };
  }

  var spo21 = 0;
  function getSpo2(t, ir, red, t1, ir1, red1) {
      var maxIR = detectPeak(t, ir);
      var maxRED = detectPeak(t, red);
      var minIR = detectValley(t, ir);
      var minRED = detectValley(t, red);
  
      var minIR1 = detectValley(t1, ir1);
      var minRED1 = detectValley(t1, red1);
  
      var ACIR = [];
      var DCIR = [];
      var ACRED = [];
      var DCRED = [];
      var occurTime = [];
  
      var x1 = minRED1.time;
      var y1 = minRED1.valley;
      var x2 = minRED.time;
      var y2 = minRED.valley;
      var x0 = maxRED.time;
      var y0 = maxRED.peak;
  
      var result = getACDC(x1, y1, x2, y2, x0, y0);
      ACRED.push(result.AC);
      DCRED.push(result.DC);
  
      var x1 = minIR1.time;
      var y1 = minIR1.valley;
      var x2 = minIR.time;
      var y2 = minIR.valley;
      var x0 = maxIR.time;
      var y0 = maxIR.peak;
      var result1 = getACDC(x1, y1, x2, y2, x0, y0);
      ACIR.push(result1.AC);
      DCIR.push(result1.DC);

      var R = (ACRED[0] * DCIR[0]) / (ACIR[0] * DCRED[0]);
      if(isNaN(R, NaN) == false) {
        if(107 - 17 * R > 100){
          spo21 = 100;
        }else{
          spo21 = 107 - 17 * R;
        }
      } else {
        return spo21;
      }
    return spo21;
  }

  function getACDC(x1, y1, x2, y2, x0, y0) {
    var y = (y2 - y1) / (x2 - x1) * (x0 - x1) + y1;
    return {
        DC: y,
        AC: y0 -y
    };
  }


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
                const cmd = "910|1";
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

                      if (pt) {
                        var DATA = [];
                        DATA[0] = event.target.value.buffer.slice(0, 33 - 1);
                        DATA[1] = event.target.value.buffer.slice(33, 66 - 1);
                        DATA[2] = event.target.value.buffer.slice(66, 99 - 1);
                        DATA[3] = event.target.value.buffer.slice(99, 132 - 1);
                        DATA[4] = event.target.value.buffer.slice(132, 165 - 1);

                        var B9_11_PPG_avg = 0;
                        var PPGIR_avg = 0;
                        for (var i = 0; i < DATA.length; i++) {
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
                          var B3_5_EEG1 = td.getInt24(2);
                          var B6_8_EEG2 = td.getInt24(5);
                          var B9_11_PPG = td.getInt24(8);
                          var PPGIR = td.getInt24(14);
                          var PPGIR_avg = PPGIR + PPGIR_avg;
                          var B9_11_PPG_avg = B9_11_PPG + B9_11_PPG_avg;
                          var spo2 = getSpo2(t, PPGIR, B9_11_PPG, t1, ir1, red1);
                          var B27_28_X = td.getUint16(26);
                          var B29_30_Y = td.getUint16(28);
                          var B31_32_Z = td.getUint16(30);
                          red1 = B9_11_PPG;
                          ir1 = PPGIR;
                          t1 = t;
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
