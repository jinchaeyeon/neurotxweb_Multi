import React from "react";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { Box, Drawer } from '@mui/material'
import { useEffect } from 'react';
import Api from "../../../API/API";
import cookie from "../../../API/cookie";
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

//user_id cookie
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

//관리자 여부
const is_staff = cookie.getCookie('is_staff') ? cookie.getCookie('is_staff') : "false";

const Sidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const publicUrl = process.env.PUBLIC_URL;
  //사이드바 state
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);
  const content = (
    <Box style={{ width: 250, height: "auto", display: "block", backgroundColor: "#333333" }}>
      <Box
        style={{
          display: "flex",
          height: 66,
          alignItems: "center",
          marginLeft: 40
        }}
      >
        <a href="/">
          <img
            style={{ width: "auto", height: 30 }}
            alt="home icon"
            src={`${publicUrl}/logo.png`}
          />
        </a>
      </Box>
      <Box>
        <Box>
          {SidebarData.map((item, index) => {
            //관리자일 경우 전체 보여주기, 아닐경우 리스트랑 webgl만 보여주기
            if (is_staff == "true") {
              return <SubMenu item={item} key={index} />;
            }
            else {
              if (item.title == "Member(ADMIN)" || item.title == "License(ADMIN)") { }
              else {
                return <SubMenu item={item} key={index} />;
              }
            }
          })}
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        anchor="left"
        onClose={onMobileClose}
        open={openMobile}
        variant="temporary"
        PaperProps={{
          sx: {
            width: 250,
            display: "block",
            backgroundColor: "#333333"
          }
        }}
      >
        {content}
      </Drawer>
    </>
  );
};


Sidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

Sidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};


export default Sidebar;