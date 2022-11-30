import { Box } from '@mui/material';
import React from 'react';
import ExperimentsPageFooter from '../../organisms/ExperimentsPage/ExperimentPageFooter';
import ExperimentsPageHeader from '../../organisms/ExperimentsPage/ExperimentPageHeader';
import ExperimentPageMiddle from '../../organisms/ExperimentsPage/ExperimentPageMiddle';

function ExperimentsPage() {
  return (
    <Box style={{backgroundColor: "#191919", padding: '1.rem 2rem'}}>
        <ExperimentsPageHeader />
        <ExperimentPageMiddle />
        <ExperimentsPageFooter />
    </Box>
  );
}

export default ExperimentsPage;