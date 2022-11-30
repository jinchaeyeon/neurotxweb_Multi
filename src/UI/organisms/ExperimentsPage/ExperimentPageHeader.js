import { Box } from '@mui/material';
import React from 'react';
import CloudIcon from '@mui/icons-material/Cloud';

function ExperimentPageHeader() {
  return (
    <Box style={{ width: "100%", height: "10.7vh"}}>
        <CloudIcon style={{color: '#2877b9', marginRight: 8, marginLeft: 50, marginTop: 20}}/>
        <h2 style={{color: 'white', display: 'inline'}}>프로토콜 관리</h2>
    </Box>
  );
}

export default ExperimentPageHeader;