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
  TextField,
  InputAdornment,
} from "@mui/material";
import ExperimentPageChangeModalHeader from "../../molecules/ExperimentsPage/ExperimentPageChangeModalHeader";
import ExperimentPageChangeModalMiddle from "../../molecules/ExperimentsPage/ExperimentPageChangeModalMiddle";
import ExperimentPageModalHeader from "../../molecules/ExperimentsPage/ExperimentPageModalHeader";
import ExperimentPageModalMiddle from "../../molecules/ExperimentsPage/ExperimentPageModalMiddle";
import { Link } from "react-router-dom";
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

//모듈 css
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

//테이블 헤더
const columns = [
  { id: "id", label: "번호", minWidth: 100 },
  { id: "name", label: "실험 프로토콜 명", minWidth: 200 },
  {
    id: "content",
    label: "상세설명",
    minWidth: 300,
  },
  {
    id: "manager",
    label: "담당자",
    minWidth: 100,
  },
  {
    id: "button",
    label: "-",
    minWidth: 250,
  },
];
//데이터 생성
function createData(id, name, content, manager, button) {
  return { id, name, content, manager, button };
}

export default function ExperimentPageMiddle() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openProtocol, setOpenProtocol] = React.useState(false);
  const [state, setState] = React.useState([]);
  const [Search, setSearch] = React.useState('');

  //검색
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  //검색어에 맞는 프로토콜 리스트 변환
  const handleSearchChange2 = (event) => {
    const getData = async () => {
      let d = [];
      const infoBody = await Api.getAPI_ExperimentList(Search,
        defaultValue);
      infoBody.data.map((item) => {
        var stitle = item.title;
        if (stitle.length > 25)
          stitle = stitle.substring(0, 24) + "..";
        var sdesc = item.desc;
        if (sdesc.length > 75)
          sdesc = sdesc.substring(0, 75) + "..";
        d.push(
          createData(
            item.id,
            stitle,
            sdesc,
            item.manager,
            "button"
          )
        );
      });
      setRows(d);
      return d;
    };
    getData();
    setPage(0);
  };

  const handleOpen = (row) => {
    setOpen(true);
    setState(row);
  };
  const handleClose = () => setOpen(false);

  const handleOpenProtocol = (row) => {
    setOpenProtocol(true);
    setState(row);
  };
  const handleProtocolClose = () => setOpenProtocol(false);

  //프로토콜 정보 수정
  const handleProtocol = (id, name, manager, content) => {
    const getData = async () => {
      const infoBody = Api.getAPI_ExperimentModify(id, name, manager, content, defaultValue);
      if (infoBody != null) {
        alert("수정되었습니다")
      }
    };
    getData();
    handleClose();
  };

  //페이지네이션
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //프로토콜 등록
  const handleAddProtocol = (name, manager, content) => {
    const getData = async () => {
      const infoBody = Api.getAPI_ExperimentCreate(name, manager, content, defaultValue);
      if (infoBody != null) {
        alert("등록되었습니다")
      }
    };
    getData();
    handleProtocolClose();
  };

  //프로토콜 삭제
  const handleDeleteAccount = (row) => {
    const getData = async () => {
      const infoBody = Api.getAPI_ExperimentDelete(row.id, defaultValue);
      if (infoBody != null) {
        alert("삭제되었습니다.")
      }
    };
    getData();
  };

  function cell(value, row) {
    if (value == "button") {
      return (
        <Box>
          <Hidden lgDown>
            <Link to={`../ExperimentsSub/${row.id}`}>
              <Button
                style={{
                  color: "white",
                  borderRadius: 10,
                  backgroundColor: "#2877b9",
                  marginRight: 5,
                  fontFamily: "GmarketSansMedium",
                }}
              >
                실험관리
              </Button>
            </Link>
            <Button
              style={{
                color: "#CCCCCC",
                borderRadius: 10,
                backgroundColor: "#5e646b",
                marginRight: 5,
                fontFamily: "GmarketSansMedium",
              }}
              onClick={() => handleOpen(row)}
            >
              수정
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              BackdropProps={{ style: { opacity: 0.2 } }}
            >
              <Box sx={style}>
                <ExperimentPageChangeModalHeader propFunction={handleClose} />
                <ExperimentPageChangeModalMiddle
                  data={state}
                  propFunction={handleProtocol}
                />
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
              삭제
            </Button>
          </Hidden>
          <Hidden lgUp>
            <Link to={`../ExperimentsSub/${row.id}`}>
              <Button
                style={{
                  color: "white",
                  borderRadius: 10,
                  backgroundColor: "#2877b9",
                  marginRight: 5,
                  fontFamily: "GmarketSansMedium",
                  fontSize: 10,
                  width: 20,
                  height: 35,
                }}
              >
                실험관리
              </Button>
            </Link>
            <Button
              style={{
                color: "#CCCCCC",
                borderRadius: 10,
                backgroundColor: "#5e646b",
                marginRight: 5,
                fontFamily: "GmarketSansMedium",
                fontSize: 10,
                width: 20,
                height: 35,
              }}
              onClick={() => handleOpen(row)}
            >
              수정
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              BackdropProps={{ style: { opacity: 0.2 } }}
            >
              <Box sx={style}>
                <ExperimentPageChangeModalHeader propFunction={handleClose} />
                <ExperimentPageChangeModalMiddle
                  data={state}
                  propFunction={handleProtocol}
                />
              </Box>
            </Modal>
            <Button
              style={{
                color: "#CCCCCC",
                borderRadius: 10,
                backgroundColor: "#393939",
                fontFamily: "GmarketSansMedium",
                fontSize: 10,
                width: 20,
                height: 35,
              }}
              onClick={() => handleDeleteAccount(row)}
            >
              삭제
            </Button>
          </Hidden>
        </Box>
      );
    } else {
      return value;
    }
  }

  React.useEffect(() => {
    //프로토콜 데이터 조회(검색어를 저장하여 검색어 입력시에 계속 그 리스트가 보여지도록 설정state)
    const getData = async () => {
      let d = [];
      const infoBody = await Api.getAPI_ExperimentList(Search,
        defaultValue);
      infoBody.data.map((item) => {
        var stitle = item.title;
        if (stitle.length > 25)
          stitle = stitle.substring(0, 24) + "..";
        var sdesc = item.desc;
        if (sdesc.length > 75)
          sdesc = sdesc.substring(0, 75) + "..";
        d.push(
          createData(
            item.id,
            stitle,
            sdesc,
            item.manager,
            "button"
          )
        );
      });
      setRows(d);
      return d;
    };
    getData();
  }, []);

  return (
    <Paper
      style={{ height: "70vh", width: "100%", backgroundColor: "#131313" }}
    >
      <TextField
        value={Search}
        onChange={handleSearchChange}
        placeholder="실험명"
        size="small"
        style={{ backgroundColor: "white", width: "35%"}}
        InputProps={{
          style: { fontFamily: "GmarketSansMedium" },
        }}
      />
      <Button
        style={{
          color: "white",
          borderRadius: 10,
          backgroundColor: "#2877b9",
          marginLeft: "1%",
          marginBottom: 10,
          fontFamily: "GmarketSansMedium",
        }}
        onClick={() => handleSearchChange2()}
      >
        검색
      </Button>
      <Button
        style={{
          color: "white",
          borderRadius: 10,
          backgroundColor: "#2877b9",
          marginRight: "3%",
          marginBottom: 10,
          float: "right",
          fontFamily: "GmarketSansMedium",
        }}
        onClick={() => handleOpenProtocol()}
      >
        프로토콜 추가
      </Button>
      <Modal
        open={openProtocol}
        onClose={handleProtocolClose}
        BackdropProps={{ style: { opacity: 0.2 } }}
      >
        <Box sx={style}>
          <ExperimentPageModalHeader propFunction={handleProtocolClose} />
          <ExperimentPageModalMiddle propFunction={handleAddProtocol} />
        </Box>
      </Modal>
      <TableContainer
        style={{
          height: "55vh",
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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
