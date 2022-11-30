import { Box } from '@mui/material';
import React from 'react';
import UserPageFooter from '../../organisms/UserPage/UserPageFooter';
import UserPageHeader from '../../organisms/UserPage/UserPageHeader';
import UserPageMiddle from '../../organisms/UserPage/UserPageMiddle';

function UserPage() {
  return (
    <Box style={{backgroundColor: "#191919", padding: '1.rem 2rem'}}>
        <UserPageHeader />
        <UserPageMiddle />
        <UserPageFooter />
    </Box>
  );
}

export default UserPage;