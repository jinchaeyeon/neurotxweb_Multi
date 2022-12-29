import { Box } from "@mui/material";
import React, { useEffect } from "react";
import ExperimentMachineListPageHeader from "../../organisms/ExperimentsMachinePage/ExperimentMachineListPageHeader";
import ExperimentMachinePageFooter from "../../organisms/ExperimentsMachinePage/ExperimentMachinePageFooter";
import ExperimentMachinePageMiddle from "../../organisms/ExperimentsMachinePage/ExperimentMachinePageMiddle";
import ExperimentMachinePageHeader from "../../organisms/ExperimentsMachinePage/ExperimentMachinePageHeader";
import ExperimentMachineListPageMiddle from "../../organisms/ExperimentsMachinePage/ExperimentMachineListPageMiddle";
import ExperimentMachineListPageStimulation from "../../organisms/ExperimentsMachinePage/ExperimentMachineListPageStimulation";

function ExperimentsMachinePage() {
  const [state, setState] = React.useState(false);
  const [mornitoringState, setMornitoringState] = React.useState();
  const [data, setData] = React.useState([
    { t : 0, B3_5_EEG1: 0, B6_8_EEG2: 0, B9_11_PPG_avg: 0, PPGIR: 0 , B27_28_X: 0, B29_30_Y: 0, B31_32_Z: 0 }
  ]); //기기 데이터 형식 지정
  const [machine, setMachine] = React.useState();
  const [starttime, setStarttime] = React.useState();
  const [starttime2, setStarttime2] = React.useState();
  const [state2, setState2] = React.useState(true);
  const [valueLimit, setvalueLimit] = React.useState();
  const hightFunction = ( //연결페이지에서 데이터를 받아 차트페이지로 전송
    t,
    B3_5_EEG1,
    B6_8_EEG2,
    B9_11_PPG_avg,
    SPO2,
    B27_28_X,
    B29_30_Y,
    B31_32_Z,
    bluetoothService,
    starttime //타이머측정용
  ) => {
    setState(true); //연결 on
    setData([
      { t, B3_5_EEG1, B6_8_EEG2, B9_11_PPG_avg, SPO2, B27_28_X, B29_30_Y, B31_32_Z },
    ]);
    setMachine(bluetoothService);
    setStarttime(starttime);
  };

  const hightFunction3 = (status) => {
    setState2(status); //자극 설정 페이지 or 차트페이지 보여주기 상태
  }

  const hightFunction4 = (starttime, valueLimit) => {
    setStarttime2(starttime); //자극 설정시 타이머 체크
    setvalueLimit(valueLimit); //타이머값
  }

  const hightFunction2 = (text) => {
    setMornitoringState(text);
  }
  useEffect (()=> {

  }, [state2])
  return (
    <>
      {state == false ? (
        <>
          <Box style={{ backgroundColor: "#191919", padding: "1.rem 2rem", height: "auto" }}>
            <ExperimentMachinePageHeader />
            <ExperimentMachinePageMiddle propFunction={hightFunction} />
            <ExperimentMachinePageFooter />
          </Box>
        </>
      ) : (
        state2 == false ? (
          <>
            <Box style={{ backgroundColor: "#191919", padding: "1.rem 2rem", height: "auto" }}>
              <ExperimentMachinePageHeader />
              <ExperimentMachineListPageStimulation data={data} starttime={starttime} machine={machine} propFunction={hightFunction2} propFunction2={hightFunction3} propFunction3={hightFunction4}/>
              <ExperimentMachinePageFooter />
            </Box>
          </>
        ) : (
          <Box style={{ backgroundColor: "#191919", padding: "1.rem 2rem", height: "auto" }}>
            <ExperimentMachineListPageHeader data={data} machine={machine} propFunction2={hightFunction3}/>
            <ExperimentMachineListPageMiddle data={data} machine={machine} limit = {valueLimit} starttime = {starttime} starttime2={starttime2} state={mornitoringState}/>
            <ExperimentMachinePageFooter />
          </Box>
        )
       
      )}
    </>
  );
}

export default ExperimentsMachinePage;
