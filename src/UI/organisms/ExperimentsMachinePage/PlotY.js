import React, { useEffect, useState, useRef } from "react";
import uPlot from "uplot";
import "/node_modules/uplot/dist/uPlot.min.css";

const NOW = Math.floor(Date.now() / 1e3);
let LENGTH = 1000;
let xs = [];
let ys = [];
export default function PlotY(props) {
  const [shift, setShift] = useState(0);
  const [data, setData] = useState(getData(shift));
  const [plot, setPlot] = useState();
  const limit = props.limit;
  const plotRef = useRef();
  const requestRef = useRef();
  const previousTimeRef = useRef();

  function getData(min) {
    //데이터가 1개씩 들어올때마다 배열에 저장
    if (props.state == true|| props.state == undefined) {
      if (xs.length == LENGTH) {
        xs.shift();
        ys.shift();
      }
      xs.push(NOW + min + LENGTH);
      ys.push(props.data);
    }
    return [xs, ys];
  }

  function getLength() {//보여줄 데이터 크기 지정
    if (limit[1] == 4) {
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
      //데이터가 다찼을경우 shift
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
  }, [data, plot, shift]);

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
