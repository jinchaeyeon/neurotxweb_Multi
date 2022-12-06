import * as React from "react";
import { Button, Paper } from "@mui/material";

var pt;
var g_recv_idx = 0;

export default function ExperimentMachinePageMiddle(props) {
  function handleprops(
    t,
    B3_5_EEG1,
    B6_8_EEG2,
    B9_11_PPG_avg,
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
                          var B9_11_PPG_avg = B9_11_PPG + B9_11_PPG_avg;
                          var B27_28_X = td.getUint16(26);
                          var B29_30_Y = td.getUint16(28);
                          var B31_32_Z = td.getUint16(30);
                        }
                        handleprops(
                          t,
                          B3_5_EEG1,
                          B6_8_EEG2,
                          parseInt(B9_11_PPG_avg / DATA.length),
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
