import React from 'react';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PinOutlinedIcon from '@mui/icons-material/PinOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
//사이드바 데이터 및 경로
export const SidebarData = [
  {
    title: 'Experiments',
    icon: <InsertChartOutlinedIcon style={{color: '#2877b9'}}/>,
    iconClosed: <KeyboardArrowDownOutlinedIcon />,
    iconOpened: <KeyboardArrowUpOutlinedIcon />,
    subNav: [
      {
        title: 'List',
        path: '/',
      },
    ]
  },
  {
    title: 'Member(ADMIN)',
    icon: <PeopleOutlineIcon style={{color: '#2877b9'}}/>,
    iconClosed: <KeyboardArrowDownOutlinedIcon />,
    iconOpened: <KeyboardArrowUpOutlinedIcon />,
    subNav: [
      {
        title: 'Users',
        path: '/User',
      },
    ]
  },
  {
    title: 'License(ADMIN)',
    icon: <PinOutlinedIcon style={{color: '#2877b9'}}/>,
    iconClosed: <KeyboardArrowDownOutlinedIcon/>,
    iconOpened: <KeyboardArrowUpOutlinedIcon />,
    subNav: [
      {
        title: 'List',
        path: '/License',

      },
    ]
  },
  {
    title: 'WebGL Chart',
    icon: <InsertChartOutlinedIcon style={{color: '#2877b9'}}/>,
    iconClosed: <KeyboardArrowDownOutlinedIcon />,
    iconOpened: <KeyboardArrowUpOutlinedIcon />,
    subNav: [
      {
        title: 'Chart A(bin)',
        path: '/WebGLPage',

      },
      {
        title: 'Chart B(JSON)',
        path: '/WebGLPage',

      },
    ]
  },
];
