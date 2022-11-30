import { Box } from "@mui/material";
import React from "react";
import ExperimentResultPageHeader from "../../organisms/ExperimentsResultPage/ExperimentResultPageHeader";
import ExperimentResultPageFooter from "../../organisms/ExperimentsResultPage/ExperimentResultPageFooter";
import ExperimentResultPageMiddle from '../../organisms/ExperimentsResultPage/ExperimentResultPageMiddle';
function ExperimentsResultPage() {
  const id = window.location.href.split("/");
  return (
    <Box style={{ backgroundColor: "#191919", padding: "1.rem 2rem", height: "auto" }}>
      <ExperimentResultPageHeader id={id[5]} />
      <ExperimentResultPageMiddle />
      <ExperimentResultPageFooter />
    </Box>
  );
}

export default ExperimentsResultPage;
