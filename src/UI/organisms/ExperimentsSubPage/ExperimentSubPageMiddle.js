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
import ExperimentSubPageChangeModalHeader from "../../molecules/ExperimentsSubPage/ExperimentSubPageChangeModalHeader";
import ExperimentSubPageChangeModalMiddle from "../../molecules/ExperimentsSubPage/ExperimentSubPageChangeModalMiddle";
import ExperimentSubPageModalHeader from "../../molecules/ExperimentsSubPage/ExperimentSubPageModalHeader";
import ExperimentSubPageModalMiddle from "../../molecules/ExperimentsSubPage/ExperimentSubPageModalMiddle";
import { Link } from "react-router-dom";
import Api from "../../../API/API";
import cookie from "../../../API/cookie";
import Hidden from '@mui/material/Hidden';
import CsvDownload from "https://cdn.skypack.dev/react-json-to-csv@1.0.4";
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
  { id: "id", label: "id", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 50 },
  { id: "sex", label: "성별", minWidth: 50 },
  {
    id: "age",
    label: "나이",
    minWidth: 50,
  },
  {
    id: "maindiagnosis",
    label: "주진단명",
    minWidth: 100,
  },
  {
    id: "machine",
    label: "자극기기",
    minWidth: 100,
  },
  {
    id: "time",
    label: "실험시간",
    minWidth: 200,
  },
  {
    id: "intensity",
    label: "최대 자극세기",
    minWidth: 100,
  },
  {
    id: "link",
    label: "설문조사",
    minWidth: 50,
  },
  {
    id: "agreement",
    label: "동의서",
    minWidth: 50,
  },
  {
    id: "csv",
    label: "csv",
    minWidth: 100,
  },
  {
    id: "button",
    label: "-",
    minWidth: 250,
  },
];

export default function ExperimentSubPageMiddle(props) {
  const Experimentsid = props.id;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openProtocol, setOpenProtocol] = React.useState(false);
  const [state, setState] = React.useState([]);
  const [listLength, setlistLength] = React.useState(false);
  const [datas, setdatas] = React.useState([
    {
      code
        :
        "EEG1",
      proto_exp_id
        :
        1089,
      serial
        :
        19997304,
      time
        :
        0,
      v
        :
        -4236350,
      regdate
        :
          new Date()
    }
  ])
  //데이터 생성
  function createData(
    id,
    name,
    sex,
    ages,
    maindiagnosis,
    machine,
    time,
    intensity,
    link,
    agreement,
    csv,
    button
  ) {
    const today = new Date();
    const birthDate = new Date(
      parseInt(ages.slice(0, 4)),
      parseInt(ages.slice(4, 6)),
      parseInt(ages.slice(6, 8))
    );
    let age = today.getFullYear() - birthDate.getFullYear() + 1; //생년월일 나이로 변환

    return {
      id,
      name,
      sex,
      age,
      maindiagnosis,
      machine,
      time,
      intensity,
      link,
      agreement,
      csv,
      button,
      ages,
    };
  }

  const handleOpen = (row) => {
    setOpen(true);
    setState(row);
  };
  const handleClose = () => setOpen(false);

  //실험 100개 이상시 안보이도록 제한
  const handleOpenProtocol = (row) => {
    if (listLength == true) {
      alert("프로토콜 리스트의 개수가 초과되었습니다. 새로운 프로토콜을 생성해주세요.")
    }
    else {
      setOpenProtocol(true);
      setState(row);
    }
  };
  const handleProtocolClose = () => setOpenProtocol(false);

  //실험 정보 수정
  const handleProtocol = (
    id,
    name,
    sex,
    birthday,
    maindiagnosis,
    link,
    file
  ) => {
    const getData = async () => {
      const infoBody = await Api.getAPI_ExperimentSubModify(
        id,
        name,
        sex,
        birthday,
        maindiagnosis,
        link,
        file,
        Experimentsid,
        defaultValue
      );
      if (infoBody != null) {
        alert("수정되었습니다");
      }
    };
    getData();
    handleClose();
  };

  //페이지네이션
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //실험 데이터 생성
  const handleAddProtocol = (
    name,
    sex,
    birthday,
    maindiagnosis,
    link,
    file,
    defaultValue
  ) => {
    const getData = async () => {
      if (window.outerWidth < 1100) { //모바일은 기기연동이 안되서 화면자체에서 막음
        alert("모바일은 실험 불가합니다.");
        window.location.href = `/`;
      } else {
        const infoBody = await Api.getAPI_ExperimentSubCreate(
          name,
          sex,
          birthday,
          maindiagnosis,
          link,
          file.name,
          Experimentsid,
          defaultValue
        );
        if (infoBody != null) {
          var id = infoBody.data.id;
          alert("추가되었습니다");
          window.location.href = `../ExperimentsSub/${Experimentsid}/${id}`;
        }
      };
    }
    getData();
    handleProtocolClose();
  };

  var data1 = [];
  var data2 = [];
  var data3 = [];
  var data4 = [];
  var data5 = [];
  var data6 = []; 
  function dataload(row) {
    alert("데이터 로드 시작합니다. 잠시만 기다려주세요.");
    const getData3 = async () => {
      const infoBody = await Api.getAPI_GETEEG1Data(
        row.id,
        defaultValue
      );
      if (infoBody.data.length > 0) {
        data1.push(infoBody.data);
        data = data1[0].concat(data2[0]);
      }
      const infoBody2 = await Api.getAPI_GETEEG2Data(
        row.id,
        defaultValue
      );
      if (infoBody2.data.length > 0) {
        data2.push(infoBody2.data);
      }
      const infoBody3 = await Api.getAPI_GETPPGData(
        row.id,
        defaultValue
      );
      if (infoBody3.data.length > 0) {
        data3.push(infoBody3.data);
      }
      const infoBody4 = await Api.getAPI_GETXData(
        row.id,
        defaultValue
      );
      if (infoBody4.data.length > 0) {
        data4.push(infoBody4.data);
      }
      const infoBody5 = await Api.getAPI_GETYData(
        row.id,
        defaultValue
      );
      if (infoBody5.data.length > 0) {
        data5.push(infoBody5.data);
      }
      const infoBody6 = await Api.getAPI_GETZData(
        row.id,
        defaultValue
      );
      if (infoBody6.data.length > 0) {
        data6.push(infoBody6.data);
      } 
      var data = data1[0].concat(data2[0], data3[0], data4[0], data5[0], data6[0]);
      setdatas(data);
      alert("데이터 로드가 끝났습니다. 다운로드해주세요.");
    }
    getData3();
  }
  //실험데이터 삭제
  const handleDeleteAccount = (row) => {
    const getData = async () => {
      const infoBody = await Api.getAPI_ExperimentSubDelete(
        row.id,
        defaultValue
      );
      if (infoBody != null) {
        alert("삭제되었습니다");
      }
    };
    getData();
  };

  //각 셀
  function cell(value, row) {
    if (value == "button") {
      return (
        <Box>
          <Hidden lgDown>
            <Link to={`../ExperimentsResult/${Experimentsid}/${row.id}`}>
              <Button
                style={{
                  color: "white",
                  borderRadius: 10,
                  backgroundColor: "#2877b9",
                  marginRight: 5,
                  fontFamily: "GmarketSansMedium",
                }}
              >
                실험정보
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
                <ExperimentSubPageChangeModalHeader propFunction={handleClose} />
                <ExperimentSubPageChangeModalMiddle
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
            <Link to={`../ExperimentsResult/${Experimentsid}/${row.id}`}>
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
                실험정보
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
                <ExperimentSubPageChangeModalHeader propFunction={handleClose} />
                <ExperimentSubPageChangeModalMiddle
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
    } else if (value == null) {
      return "null";
    } else if (value == "") {
      return "null";
    } else if (value == "M") {
      return "남성";
    } else if (value == "W") {
      return "여성";
    } else if (
      value[0] == "<" &&
      value[1] == "a" &&
      value[2] == " " &&
      value[3] == "h"
    ) {
      return <a href={value.split('"', 3)[1]}>link</a>;
    } else if (value[24] == "<" && value[25] == "b" && value[26] == "r") {
      var string1 = value.substr(0, 24);
      var string2 = value.substr(29);
      return (
        <Box>
          <h5>{string1}</h5>
          <h5>{string2}</h5>
        </Box>
      );
    } else if (value == "csv") {
      return (
        <Box>
          <Button
            style={{
              color: "#CCCCCC",
              borderRadius: 10,
              backgroundColor: "#393939",
              fontFamily: "GmarketSansMedium",
              fontSize: 10,
              width: 20,
              height: 35,
              marginRight: 5,
            }}
            onClick={() => dataload(row)}
          >
            Load
          </Button>
          <CsvDownload
            // data : object 또는 object의 배열
            data={datas}
            // filename : 파일이름
            filename='data.csv'
            style={{
              color: "white",
              borderRadius: 10,
              backgroundColor: "#2877b9",
              fontFamily: "GmarketSansMedium",
              fontSize: 10,
              width: 100,
              height: 35,
            }}
          >
            Download
          </CsvDownload>

        </Box>
      )
    }
    else {
      return value;
    }
  }

  React.useEffect(() => {
    //실험 데이터 조회
    const getData = async () => {
      let d = [];
      const infoBody = await Api.getAPI_ExperimentSubList(
        Experimentsid,
        defaultValue
      );
      if (infoBody.data.length >= 100) {
        setlistLength(true);
      }
      infoBody.data.map((item) => {
        var link_txt = "";
        if (item.survey_link != "") { //링크 첨부
          link_txt =
            '<a href="' + item.survey_link + '" target="_blank">link</a>';
        }
        else {
          link_txt = "null"
        }
        var agree_txt = "";
        if (item.agree_filename != "") { //파일 다운
          var api_base_url = "http://neurotx.co.kr:8888";
          agree_txt =
            '<a href="' + api_base_url + '/files/' + item.agree_filename + '" target="_blank">' + item.agree_filename + '</a>';
        }
        else {
          agree_txt = "null"
        }
        var sdiagnosis = item.diagnosis;
        d.push(
          createData(
            item.id,
            item.name,
            item.gender,
            item.birth,
            sdiagnosis,
            item.deviceinfo,
            item.exp_duration,
            item.maxstimulus,
            link_txt,
            agree_txt,
            "csv",
            "button"
          )
        );
      });
      setRows(d);
      return d;
    };
    getData();
  }, [datas]);

  return (
    <Paper
      style={{ height: "70vh", width: "100%", backgroundColor: "#131313" }}
    >
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
        실험시작
      </Button>
      <Modal
        open={openProtocol}
        onClose={handleProtocolClose}
        BackdropProps={{ style: { opacity: 0.2 } }}
      >
        <Box sx={style}>
          <ExperimentSubPageModalHeader propFunction={handleProtocolClose} />
          <ExperimentSubPageModalMiddle propFunction={handleAddProtocol} />
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
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={String(page * 10 + index + 1)}
                  >
                    {columns.map((column, index2) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={
                            String(page * 10 + index + 1) +
                            "and" +
                            String(index2)
                          }
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
