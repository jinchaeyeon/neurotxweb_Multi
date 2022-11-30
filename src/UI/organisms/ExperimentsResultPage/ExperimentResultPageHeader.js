import { Box, Button, Hidden } from "@mui/material";
import React from "react";
import CloudIcon from "@mui/icons-material/Cloud";

function ExperimentResultPageHeader(props) {
  const id = props.id;

  return (
    <Box style={{ width: "100%", height: "15vh" }}>
      <Hidden lgDown>
      <CloudIcon
        style={{
          color: "#2877b9",
          marginRight: 8,
          marginLeft: 40,
          marginTop: 20,
        }}
      />
      <h2 style={{ color: "white", display: "inline" }}>{id}</h2>
      <Button
        variant="contained"
        style={{
          float: "right",
          display: "inline",
          backgroundColor: "#5e646b",
          marginTop: 25,
          marginRight: "6%",
          fontFamily: 'GmarketSansMedium'
        }}
      >
        Export
      </Button>
      <Button
        variant="contained"
        style={{
          float: "right",
          display: "inline",
          backgroundColor: "#5e646b",
          marginRight: 20,
          marginTop: 25,
          fontFamily: 'GmarketSansMedium'
        }}
      >
        삭제 구간 설정
      </Button>
      </Hidden>
      <Hidden lgUp>
      <CloudIcon
        style={{
          color: "#2877b9",
          marginRight: 8,
          marginTop: 20,
          marginLeft: 10,
        }}
      />
      <h3 style={{ color: "white", display: "inline" }}>{id}</h3>
      <Button
        variant="contained"
        style={{
          float: "right",
          display: "inline",
          backgroundColor: "#5e646b",
          marginTop: 25,
          fontSize: 5,
          width: 80,
          height: 40,
          marginRight: "6%",
          fontFamily: 'GmarketSansMedium'
        }}
      >
        Export
      </Button>
      <Button
        variant="contained"
        style={{
          float: "right",
          display: "inline",
          backgroundColor: "#5e646b",
          marginRight: 20,
          marginTop: 25,
          fontSize: 5,
          width: 80,
          height: 40,
          fontFamily: 'GmarketSansMedium'
        }}
      >
        삭제 구간 설정
      </Button>
      </Hidden>
      <Hidden lgDown>
        <h5 style={{ color: "white", marginLeft: 50 }}>
          시작시간 : 2022-08-09 02:51:10/소요시간: 00:00
        </h5>
      </Hidden>
      <Hidden lgUp>
        <h6 style={{ color: "white", marginLeft: 50 }}>
          시작시간 : 2022-08-09 02:51:10 <br/> 소요시간: 00:00
        </h6>
      </Hidden>
    </Box>
  );
}

export default ExperimentResultPageHeader;
