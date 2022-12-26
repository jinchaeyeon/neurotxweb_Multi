import * as React from "react";
import {
  Button,
  Box,
  Modal,
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
} from "@mui/material";
import UserPageModalHeader from "../../molecules/UserPage/UserPageModalHeader";
import UserPageModalMiddle from "../../molecules/UserPage/UserPageModalMiddle";
import Api from "../../../API/API";
import cookie from "../../../API/cookie";
import Hidden from '@mui/material/Hidden';

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

//module 스타일
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

//테이블 열
const columns = [
  { id: "UserID", label: "UserID", minWidth: 150 },
  { id: "Email", label: "Email", minWidth: 200 },
  {
    id: "LastLogin",
    label: "Last Login",
    minWidth: 150,
  },
  {
    id: "RegistrationDate",
    label: "Registration Date",
    minWidth: 150,
  },
  {
    id: "button",
    label: "-",
    minWidth: 250,
  },
];

//테이블 데이터 생성
function createData(UserID, Email, LastLogin, RegistrationDate, button, id) {
  return { UserID, Email, LastLogin, RegistrationDate, button, id };
}

export default function UserPageMiddle() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openTrue, setOpenTrue] = React.useState(false);
  const [openFalse, setOpenFalse] = React.useState(false);
  const [state, setState] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  //모듈 open
  const handleOpenTrue = (row) => {
    setOpenTrue(true);
    setState(row);
  };
  //모듈 close
  const handleCloseTrue = () => setOpenTrue(false);
  //이메일 정보 수정
  const handleEmail = (data, text) => {
    const getData = async () => {
      const infoBody = await Api.getAPI_UserModify(
        data.Email.id,
        text,
        defaultValue
      );
      if (infoBody != null) {
        alert("수정되었습니다")
      }
    };
    getData();
    handleCloseTrue();
    handleCloseFalse();
  };

  const handleOpenFalse = (row) => {
    setOpenFalse(true);
    setState(row);
  };
  const handleCloseFalse = () => setOpenFalse(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //유저 관리자 정보 수정
  const handleAccount = (row) => {
    const getData = async () => {
      const infoBody = await Api.getAPI_UserAdmin(
        row.id,
        !row.button,
        defaultValue
      );
      if (infoBody != null) {
        alert("수정되었습니다")
      }
    };
    getData();
  };

  //유저 삭제
  const handleDeleteAccount = (row) => {
    const getData = async () => {
      const infoBody = await Api.getAPI_UserDelete(
        row.id,
        defaultValue
      );
      if (infoBody != null) {
        alert("삭제되었습니다")
      }
    };
    getData();
  };

  function cell(value, row) {
    if (value == true) {
      return (
        <Box>
          <Hidden lgDown>
            <Button
              style={{
                color: "#CCCCCC",
                borderRadius: 10,
                backgroundColor: "#5e646b",
                marginRight: 5,
                fontFamily: "GmarketSansMedium",
              }}
              onClick={() => handleAccount(row)}
            >
              make User
            </Button>
            <Button
              style={{
                color: "#CCCCCC",
                borderRadius: 10,
                backgroundColor: "#5e646b",
                marginRight: 5,
                fontFamily: "GmarketSansMedium",
              }}
              onClick={() => handleOpenTrue(row)}
            >
              modify
            </Button>
            <Modal
              open={openTrue}
              onClose={handleCloseTrue}
              BackdropProps={{ style: { opacity: 0.2 } }}
            >
              <Box sx={style}>
                <UserPageModalHeader propFunction={handleCloseTrue} />
                <UserPageModalMiddle Email={state} propFunction={() => handleEmail(row)} />
              </Box>
            </Modal>
          </Hidden>
          <Hidden lgUp>
            <Button
              style={{
                color: "#CCCCCC",
                borderRadius: 10,
                backgroundColor: "#5e646b",
                marginRight: 5,
                fontFamily: "GmarketSansMedium",
                fontSize: 5,
                width: 20,
                height: 35,
              }}
              onClick={() => handleAccount(row)}
            >
              make User
            </Button>
            <Button
              style={{
                color: "#CCCCCC",
                borderRadius: 10,
                backgroundColor: "#5e646b",
                marginRight: 5,
                fontFamily: "GmarketSansMedium",
                fontSize: 5,
                width: 20,
                height: 35,
              }}
              onClick={() => handleOpenTrue(row)}
            >
              modify
            </Button>
            <Modal
              open={openTrue}
              onClose={handleCloseTrue}
              BackdropProps={{ style: { opacity: 0.2 } }}
            >
              <Box sx={style}>
                <UserPageModalHeader propFunction={handleCloseTrue} />
                <UserPageModalMiddle Email={state} propFunction={() => handleEmail(row)} />
              </Box>
            </Modal>
          </Hidden>
        </Box>
      );
    } else if (value == false) {
      return (
        <Box>
          <Hidden lgUp>
            <Button
              style={{
                color: "white",
                borderRadius: 10,
                backgroundColor: "#2877b9",
                marginRight: 5,
                fontSize: 5,
                width: 20,
                height: 35,
                fontFamily: "GmarketSansMedium",
              }}
              onClick={() => handleAccount(row)}
            >
              make ADMIN
            </Button>
            <Button
              style={{
                color: "#CCCCCC",
                borderRadius: 10,
                backgroundColor: "#5e646b",
                fontFamily: "GmarketSansMedium",
                marginRight: 5,
                fontSize: 5,
                width: 20,
                height: 35,
              }}
              onClick={() => handleOpenFalse(row)}
            >
              modify
            </Button>
            <Modal
              open={openFalse}
              onClose={handleCloseFalse}
              BackdropProps={{ style: { opacity: 0.2 } }}
            >
              <Box sx={style}>
                <UserPageModalHeader propFunction={handleCloseFalse} />
                <UserPageModalMiddle Email={state} propFunction={handleEmail} />
              </Box>
            </Modal>
            <Button
              style={{
                color: "#CCCCCC",
                borderRadius: 10,
                fontSize: 5,
                width: 20,
                height: 35,
                backgroundColor: "#393939",
                fontFamily: "GmarketSansMedium",
              }}
              onClick={() => handleDeleteAccount(row)}
            >
              Delete
            </Button>
          </Hidden>
          <Hidden lgDown>
            <Button
              style={{
                color: "white",
                borderRadius: 10,
                backgroundColor: "#2877b9",
                marginRight: 5,
                fontFamily: "GmarketSansMedium",
              }}
              onClick={() => handleAccount(row)}
            >
              make ADMIN
            </Button>
            <Button
              style={{
                color: "#CCCCCC",
                borderRadius: 10,
                backgroundColor: "#5e646b",
                fontFamily: "GmarketSansMedium",
                marginRight: 5,
              }}
              onClick={() => handleOpenFalse(row)}
            >
              modify
            </Button>
            <Modal
              open={openFalse}
              onClose={handleCloseFalse}
              BackdropProps={{ style: { opacity: 0.2 } }}
            >
              <Box sx={style}>
                <UserPageModalHeader propFunction={handleCloseFalse} />
                <UserPageModalMiddle Email={state} propFunction={handleEmail} />
              </Box>
            </Modal>
            <Button
              style={{
                color: "#CCCCCC",
                borderRadius: 10,
                backgroundColor: "#393939",
                fontFamily: "GmarketSansMedium",
              }}
              onClick={() => handleDeleteAccount(row)}
            >
              Delete
            </Button>
          </Hidden>
        </Box>
      );
    } else {
      return value;
    }
  }

  React.useEffect(() => {
    //주기적으로 유저 리스트 조회
    const getData = async () => {
      let d = [];
      const infoBody = await Api.getAPI_UserList(
        undefined,
        undefined,
        "dateTime",
        "DESC",
        1,
        10,
        defaultValue
      );
      infoBody.data.map((item) => {
        d.push(
          createData(
            item.username,
            item.email,
            undefined,
            undefined,
            item.is_staff,
            item.id
          )
        );
      });
      setRows(d);
      return d;
    };
    setInterval(() => getData(), 500);
  }, []);

  return (
    <Paper
      style={{ height: "70vh", width: "100%", backgroundColor: "#131313" }}
    >
      <TableContainer
        style={{
          height: "65vh",
          backgroundColor: "#131313",
        }}
      >
        <Table>
          <TableHead style={{ backgroundColor: "#2877b9" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    minWidth: column.minWidth,
                    color: "white",
                    fontFamily: "GmarketSansMedium",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: "#131313" }}>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.UserID}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          style={{
                            color: "#c0c0c0",
                            fontFamily: "GmarketSansMedium",
                          }}
                        >
                          {cell(value, row)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={{
          backgroundColor: "#131313",
          paddingRight: 20,
          color: "white",
          borderBottom: "2px solid #333333",
        }}
        component="div"
        rowsPerPageOptions={[10]}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
}
