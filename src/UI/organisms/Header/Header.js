import * as React from 'react';
import { Box, Button, Menu, MenuItem, Modal, IconButton } from "@mui/material";
import { useState } from "react";
import HeaderModalHeader from '../../molecules/Header/HeaderModalHeader';
import HeaderModalMiddle from '../../molecules/Header/HeaderModalMiddle';
import cookie from '../../../API/cookie';
import DehazeIcon from '@mui/icons-material/Dehaze';
import PropTypes from 'prop-types';
import Api from "../../../API/API";
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  minWidth: 200,
  bgcolor: "#383b40",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Header = ({ onMobileNavOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openTrue, setOpenTrue] = React.useState(false);
  const [state, setState] = React.useState([]);

  const handleCloseTrue = () => {
    setOpenTrue(false);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenTrue(true);
  };
  const handleClose2 = () => {
    setAnchorEl(null);
  };

  const Logout = async () => {
    const getData = async () => {
      const infoBody = await Api.getAPI_logout(
        parseInt(cookie.getCookie("userID")),
        defaultValue
      );
    };
    getData();
    cookie.deleteCookie("userAccount");
    cookie.deleteCookie("userID");
    cookie.deleteCookie("accessToken");
    cookie.deleteCookie('is_staff');
    cookie.setCookie("is_Login", 0, 1);
    window.location.href = "/";
  }

  return (
    <>
      <Box
        style={{
          width: "100%",
          height: "10.7vh",
          backgroundColor: "#191919",
          borderBottom: "2px solid #333333",
        }}
      >
        <IconButton color="inherit" onClick={onMobileNavOpen}>
          <DehazeIcon style={{ color: "white", marginTop: 18, height: 40, marginLeft: 20 }} />
        </IconButton>
        <Button
          style={{
            float: "right",
            marginRight: 20,
            color: "#CCCCCC",
            borderRadius: 40,
            backgroundColor: "#393939",
            height: 40,
            marginTop: 18,
            fontFamily: 'GmarketSansMedium'
          }}
          onClick={Logout}
        >
          Log Out
        </Button>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{
            float: "right",
            marginRight: 20,
            color: "#CCCCCC",
            borderRadius: 40,
            backgroundColor: "#393939",
            height: 40,
            marginTop: 18,
            fontFamily: 'GmarketSansMedium'
          }}
        >
          {cookie.getCookie('userAccount')}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose2}
          PaperProps={{
            style: {
              backgroundColor: "#A3A5B5",
            },
          }}
        >
          <MenuItem onClick={handleClose} style={{ fontFamily: 'GmarketSansMedium' }}>Change Password</MenuItem>
        </Menu>
        <Modal
          open={openTrue}
          onClose={handleCloseTrue}
          BackdropProps={{ style: { opacity: 0.2 } }}
        >
          <Box sx={style}>
            <HeaderModalHeader propFunction={handleCloseTrue} />
            <HeaderModalMiddle propFunction={handleCloseTrue} />
          </Box>
        </Modal>
      </Box>
    </>
  );
}

Header.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default Header;
