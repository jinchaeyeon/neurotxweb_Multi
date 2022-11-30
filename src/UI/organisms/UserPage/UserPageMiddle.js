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
  minWidth: 400,
  bgcolor: "#383b40",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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

function createData(UserID, Email, LastLogin, RegistrationDate, button, id) {
  return { UserID, Email, LastLogin, RegistrationDate, button, id};
}

export default function UserPageMiddle() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openTrue, setOpenTrue] = React.useState(false);
  const [openFalse, setOpenFalse] = React.useState(false);
  const [state, setState] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  const handleOpenTrue = (row) => {
    setOpenTrue(true);
    setState(row);
  };
  const handleCloseTrue = () => setOpenTrue(false);
  const handleEmail = (data, text) => {
    const getData = async () => {
      const infoBody = await Api.getAPI_UserModify(
        data.Email.id,
        text,
        defaultValue
      );
      if(infoBody != null) {
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

  const handleAccount = (row) => {
    const getData = async () => {
      const infoBody = await Api.getAPI_UserAdmin(
        row.id,
        !row.button,
        defaultValue
      );
      if(infoBody != null) {
        alert("수정되었습니다")
      }
    };
    getData();
  };

  const handleDeleteAccount = (row) => {
    const getData = async () => {
      const infoBody = await Api.getAPI_UserDelete(
        row.id,
        defaultValue
      );
      if(infoBody != null) {
        alert("삭제되었습니다")
      }
    };
    getData();
  };

  function cell(value, row) {
    if (value == true) {
      return (
        <Box>
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
        </Box>
      );
    } else if (value == false) {
      return (
        <Box>
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
        </Box>
      );
    } else {
      return value;
    }
  }

  React.useEffect(() => {
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
          width: "95%",
          height: "65vh",
          marginLeft: 50,
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
