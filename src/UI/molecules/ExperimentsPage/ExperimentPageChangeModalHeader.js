import * as React from "react";
import {
  Box,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function ExperimentPageChangeModalHeader(props) {
  return (
    <Box style={{color: "#CCCCCC", height: 62}}>
        <h4 style={{display: 'inline'}}>실험 프로토콜 변경</h4>
        <CloseIcon style={{float: 'right'}} onClick={() => props.propFunction(false)}/>
    </Box>
  );
}
