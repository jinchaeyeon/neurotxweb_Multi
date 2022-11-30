import React, { useEffect, useState, useRef } from "react";
import uPlot from "uplot";
import "/node_modules/uplot/dist/uPlot.min.css";
import {notchFilter} from "./notchFilter";
import { highpassFilter } from "@neurosity/pipes";
import { of } from 'rxjs';

let xs = [];
let ys = [];
const NOW = Math.floor(Date.now() / 1e3);
let LENGTH = 600;
export default function PlotEEG1(props) {
  const [shift, setShift] = useState(0);
  const [data, setData] = useState(getData(shift));
  const [plot, setPlot] = useState();
  const limit = props.limit;
  const plotRef = useRef();
  const requestRef = useRef();
  const previousTimeRef = useRef();

  function getData(min) {
    if (props.state == true || props.state == undefined) {
      if (xs.length == LENGTH) {
        xs.shift();
        ys.shift();
      }
      xs.push(NOW + min + LENGTH);
      ys.push(props.data);
      var num = [xs, ys];
      of(num).pipe(highpassFilter({ cutoffFrequency: 0.1, nbChannels: 4 }));
      of(num).pipe(notchFilter({ cutoffFrequency: 60, nbChannels: 10, samplingRate: 1000, filterHarmonics: true }));
    }
    return num;
  }

  function getLength() {
    if (limit[1] == 0) {
      if (limit[0] == 30) {
        LENGTH = 1800;
      } else if (limit[0] == 60) {
        LENGTH = 3600;
      } else if (limit[0] == 300) {
        LENGTH = 18000;
      }
    }
    else {
      LENGTH = 1800;
    }
  }
  useEffect(() => {
    getLength();
    let animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        if (!plot) return;
        setShift((prevShift) => prevShift + 1);
        setData((prev) => getData(shift));
        plot.setData(data);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      animate = () => {};
      cancelAnimationFrame(requestRef.current);
    };
  }, [data, plot, shift, limit]);

  useEffect(() => {
    getLength();
    const plot = new uPlot(props.options, data, plotRef.current);
    setPlot(plot);

    return () => {
      plot.destroy();
    };
  }, []);

  return (
    <div>
      <div ref={plotRef} />
    </div>
  );
}
