import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import ExperimentSubPageFooter from '../../organisms/ExperimentsSubPage/ExperimentSubPageFooter';
import ExperimentSubPageHeader from '../../organisms/ExperimentsSubPage/ExperimentSubPageHeader';
import ExperimentSubPageMiddle from '../../organisms/ExperimentsSubPage/ExperimentSubPageMiddle';
import Api from "../../../API/API";
import cookie from "../../../API/cookie";

var defaultValue;

let user_id = cookie.getCookie("userAccount")
  ? cookie.getCookie("userAccount")
  : "";
var api_token = cookie.getCookie("accessToken");

if (user_id) {
  defaultValue = {
    key: api_token,
  };
}

function ExperimentsSubPage() {
  const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
  const [name, setName] = React.useState("");

  const getData = async () => {
    let d = "";
    const infoBody = await Api.getAPI_ExperimentList("",defaultValue);
    infoBody.data.map((item) => {
      if(item.id == id) {
        var stitle = item.title;
        if (stitle.length > 25)
          stitle = stitle.substring(0, 24) + "..";
        d = stitle
      }
    });
    setName(d);
  };

  useEffect(() => {
    getData();
  },[])

  return (
    <Box style={{backgroundColor: "#191919", padding: '1.rem 2rem'}}>
        <ExperimentSubPageHeader id={name}/>
        <ExperimentSubPageMiddle id={id}/>
        <ExperimentSubPageFooter />
    </Box>
  );
}

export default ExperimentsSubPage;