import * as React from "react";
import {
  Button,
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  Box
} from "@mui/material";
import Api from "../../../API/API";
import cookie from "../../../API/cookie";
import Hidden from '@mui/material/Hidden';

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

const columns = [
  { id: "Serial", label: "Serial", minWidth: 50 },
  { id: "licensekey", label: "license key", minWidth: 250 },
  {
    id: "usedby",
    label: "used by",
    minWidth: 100,
  },
  {
    id: "usedfrom",
    label: "used from",
    minWidth: 150,
  },
  {
    id: "button",
    label: "-",
    minWidth: 100,
  },
];

function createData(Serial, licensekey, usedby, usedfrom, button) {
  return { Serial, licensekey, usedby, usedfrom, button };
}

export default function LicensePageMiddle() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteAccount = (row) => {
    const getData = async () => {
      const infoBody = await Api.getAPI_LicenseDelete(
        row.Serial,
        defaultValue
      );
      if (infoBody != null) {
        alert("삭제되었습니다")
      }
    };
    getData();
  };

  const AddLicense = () => {
    const getData = async () => {
      const infoBody = await Api.getAPI_ADDLicenseKey(defaultValue);
      if (infoBody != null) {
        alert("라이센스 키가 생성되었습니다")
      }
    };
    getData();
  };

  function cell(value, row) {
    if (value == undefined) {
      return (
        <Box>
          <Hidden lgDown>
            <Button
              style={{
                color: "#CCCCCC",
                borderRadius: 10,
                backgroundColor: "#393939",
              }}
              onClick={() => handleDeleteAccount(row)}
            >
              Delete
            </Button>
          </Hidden>
          <Hidden lgUp>
            <Button
              style={{
                color: "#CCCCCC",
                borderRadius: 10,
                backgroundColor: "#393939",
                fontSize: 5,
                width: 20,
                height: 35,
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
    const getData = async () => {
      let d = [];
      const infoBody = await Api.getAPI_LicenseList(
        undefined,
        undefined,
        "dateTime",
        "DESC",
        1,
        10,
        defaultValue
      );
      infoBody.data.map((item) => {
        var usedby = "";
        var usedfrom = "";
        if (item.username == null) {
          usedby = "not in use";
        } else {
          usedby = item.username;
        }
        if (item.used_from == null) {
          usedfrom = "not in use";
        } else {
          usedfrom = item.used_from;
        }
        d.push(
          createData(item.id, item.license_key, usedby, usedfrom, undefined)
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
      <Button
        style={{
          float: "right",
          color: "#CCCCCC",
          borderRadius: 10,
          backgroundColor: "#5e646b",
          marginBottom: 10,
          fontFamily: "GmarketSansMedium",
        }}
        onClick={AddLicense}
      >
        + Add Key
      </Button>
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
                    key={row.Serial}
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
