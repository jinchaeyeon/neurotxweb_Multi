import { Box, Hidden } from '@mui/material';
import React from 'react';

function UserPageFooter() {
  return (
    <Box style={{ width: "100%", height: "7vh", marginTop: 20 }}>
      <Hidden mdDown>
        <h6 style={{ marginBottom: 0, color: "#A7A7A7" }}>Version. 1.0.0</h6>
        <h5 style={{ marginTop: 0, color: "#A7A7A7" }}>
          Copyright 2020 ⓒ NeuroTx All RIGHT RESERVED
        </h5>
      </Hidden>
      <Hidden mdUp>
        <h6 style={{ marginBottom: 0, color: "#A7A7A7", fontSize: 6 }}>Version. 1.0.0</h6>
        <h5 style={{ marginTop: 0, color: "#A7A7A7", fontSize: 8 }}>
          Copyright 2020 ⓒ NeuroTx All RIGHT RESERVED
        </h5>
      </Hidden>
    </Box>
  );
}

export default UserPageFooter;