import * as React from "react";
import {
  Box,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function HeaderModalHeader(props) {
  return (
    <Box style={{color: "#CCCCCC", height: 62}}>
        <h4 style={{display: 'inline',fontFamily: 'GmarketSansMedium'}}>유저 정보 수정</h4>
        <CloseIcon style={{float: 'right'}} onClick={() => props.propFunction(false)}/>
    </Box>
  );
}
