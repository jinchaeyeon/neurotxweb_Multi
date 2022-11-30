import { Box } from '@mui/material';
import React from 'react';
import LicensePageHeader from '../../organisms/LicensePage/LicensePageHeader';
import LicensePageMiddle from '../../organisms/LicensePage/LicensePageMiddle';
import LicensePageFooter from '../../organisms/LicensePage/LicensePageFooter';

function UserPage() {
  return (
    <Box style={{backgroundColor: "#191919", padding: '1.rem 2rem'}}>
        <LicensePageHeader />
        <LicensePageMiddle />
        <LicensePageFooter />
    </Box>
  );
}

export default UserPage;