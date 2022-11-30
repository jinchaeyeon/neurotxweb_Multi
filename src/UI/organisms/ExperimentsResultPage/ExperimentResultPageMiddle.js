import React from "react";
import { FormControl, NativeSelect, Box } from "@mui/material";
import getRealTimeChart from "../ExperimentsMachinePage/realtime_chart";

const d3 = document.createElement("script");

d3.src = "https://d3js.org/d3.v4.min.js";
d3.async = true;
const GRAPH_WIDTH_SEC_DEFAULT = 10;

var graph_width_sec = [];
var lineArr = [];
var lineArr_display = [];
var signal_frequency_list = [];
var chart = [];

function ExperimentResultPageMiddle(props) {
  const signal_names = ["EEG1", "EEG2", "PPG", "X", "Y", "Z"];
  function init() {
    for (var i = 0; i < 6; i++) {
      chart[i] = getRealTimeChart();
      lineArr[i] = [];
      graph_width_sec[i] = GRAPH_WIDTH_SEC_DEFAULT;
      lineArr_display[i] = [];
      signal_frequency_list[i] = 50;
    }
  }

  {
    init();
  }

  function roop(i){
    return(
      <Box style={{ border: " 2px solid white", marginTop: 20, width: "90%", height: 60, marginLeft: 50}}>
      <h3 style={{ color: "white", display: "inline" }}>{signal_names[i]}</h3>
      </Box>
    )
  }

  return (
    <div id="chartlist" style={{ width: "100%", height: "68vh"}}>
        {roop(0)}
        {roop(1)}
        {roop(2)}
        {roop(3)}
        {roop(4)}
        {roop(5)}
      {/* <div id="chart'+i.toString()+'"></div>
        <hr /> */}
    </div>
  );
}

export default ExperimentResultPageMiddle;
