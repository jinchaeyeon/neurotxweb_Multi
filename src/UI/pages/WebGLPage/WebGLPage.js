import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react.js';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
function WebGLPage(props) {
		const options1 = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light1",
			title:{
				text: "EEG1"
			},
			data: [{
				type: "line",
				toolTipContent: "{y}",
				dataPoints: [
					{ x: 1, y: 64 },
					{ x: 2, y: 61 },
					{ x: 3, y: 64 },
					{ x: 4, y: 62 },
					{ x: 5, y: 64 },
					{ x: 6, y: 60 },
				]
			}]
    }

    const options2 = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light1",
			title:{
				text: "EEG2"
			},
			data: [{
				type: "line",
				toolTipContent: "{y}",
				dataPoints: [
					{ x: 1, y: 64 },
					{ x: 2, y: 61 },
					{ x: 3, y: 64 },
					{ x: 4, y: 62 },
					{ x: 5, y: 64 },
					{ x: 6, y: 60 },
					{ x: 7, y: 58 },
					{ x: 8, y: 59 },
					{ x: 9, y: 53 },
					{ x: 10, y: 54 },
					{ x: 11, y: 61 },
					{ x: 12, y: 60 },
					{ x: 13, y: 55 },
					{ x: 14, y: 60 },
					{ x: 15, y: 56 },
					{ x: 16, y: 60 },
				]
			}]
    }

    const options3 = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light1",
			title:{
				text: "PPG"
			},
			data: [{
				type: "line",
				toolTipContent: "{y}",
				dataPoints: [
					{ x: 1, y: 64 },
					{ x: 2, y: 61 },
					{ x: 3, y: 64 },
					{ x: 4, y: 62 },
					{ x: 5, y: 64 },
					{ x: 6, y: 60 },
					{ x: 7, y: 58 },
					{ x: 8, y: 59 },
					{ x: 9, y: 53 },
					{ x: 10, y: 54 },
					{ x: 11, y: 61 },
					{ x: 12, y: 60 },
					{ x: 13, y: 55 },
					{ x: 14, y: 60 },
					{ x: 15, y: 56 },
					{ x: 16, y: 60 },
					{ x: 17, y: 59.5 },
					{ x: 18, y: 63 },
					{ x: 19, y: 58 },
					{ x: 20, y: 54 },
					{ x: 21, y: 59 },
					{ x: 22, y: 64 },
					{ x: 23, y: 59 },
          { x: 24, y: 64 },
					{ x: 25, y: 61 },
					{ x: 26, y: 64 },
					{ x: 27, y: 62 },
					{ x: 28, y: 64 },
					{ x: 29, y: 60 },
					{ x: 30, y: 58 },
					{ x: 31, y: 59 },
					{ x: 32, y: 53 },
					{ x: 33, y: 54 },
					{ x: 34, y: 61 },
					{ x: 35, y: 60 },
					{ x: 36, y: 55 },
				]
			}]
    }

    const options4 = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light1",
			title:{
				text: "X"
			},
			data: [{
				type: "line",
				toolTipContent: "{y}",
				dataPoints: [
					{ x: 1, y: 64 },
					{ x: 2, y: 61 },
					{ x: 3, y: 64 },
					{ x: 4, y: 62 },
					{ x: 5, y: 64 },
					{ x: 6, y: 60 },
					{ x: 7, y: 58 },
					{ x: 8, y: 59 },
					{ x: 9, y: 53 },
					{ x: 10, y: 54 },
					{ x: 11, y: 61 },
					{ x: 12, y: 60 },
					{ x: 13, y: 55 },
					{ x: 14, y: 60 },
					{ x: 15, y: 56 },
					{ x: 16, y: 60 },
					{ x: 17, y: 59.5 },
					{ x: 18, y: 63 },
					{ x: 19, y: 58 },
					{ x: 20, y: 54 },
					{ x: 21, y: 59 },
					{ x: 22, y: 64 },
					{ x: 23, y: 59 },
          { x: 24, y: 64 },
					{ x: 25, y: 61 },
					{ x: 26, y: 64 },
					{ x: 27, y: 62 },
					{ x: 28, y: 64 },
				]
			}]
    }

    const options5 = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light1",
			title:{
				text: "Y"
			},
			data: [{
				type: "line",
				toolTipContent: "{y}",
				dataPoints: [
					{ x: 1, y: 64 },
					{ x: 2, y: 61 },
					{ x: 3, y: 64 },
					{ x: 4, y: 62 },
					{ x: 5, y: 64 },
					{ x: 6, y: 60 },
					{ x: 7, y: 58 },
					{ x: 8, y: 59 },
					{ x: 9, y: 53 },
					{ x: 10, y: 54 },
					{ x: 11, y: 61 },
					{ x: 12, y: 60 },
					{ x: 13, y: 55 },
					{ x: 14, y: 60 },
					{ x: 15, y: 56 },
					{ x: 16, y: 60 },
				]
			}]
    }

    const options6 = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light1",
			title:{
				text: "Z"
			},
			data: [{
				type: "line",
				toolTipContent: "{y}",
				dataPoints: [
					{ x: 1, y: 64 },
					{ x: 2, y: 61 },
					{ x: 3, y: 64 },
					{ x: 4, y: 62 },
					{ x: 5, y: 64 },
					{ x: 6, y: 60 },
				]
			}]
    }
  return (
    <div>
      <CanvasJSChart options={options1} />
      <CanvasJSChart options={options2} />
      <CanvasJSChart options={options3} />
      <CanvasJSChart options={options4} />
      <CanvasJSChart options={options5} />
      <CanvasJSChart options={options6} />
    </div>
  );
}

export default WebGLPage;
