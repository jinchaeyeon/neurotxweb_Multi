import axios from "axios";
import cookie from "./cookie";

//서버 도메인
const api = "http://neurotx.co.kr:8888";

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

const Login = async (path, params = {}) => {
  try {
    const response = await axios.post(api + path, params, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response;
  } catch (e) {
    return null;
  }
};

const LoginInfo = async (path, params = {}) => {
  try {
    const response = await axios.get(api + path, {
      headers: {
        authorization: `Bearer ${params}`,
        Accept: "*/*",
      },
    });
    return response;
  } catch (e) {
    return [];
  }
};

const getFormRequest = async (path, defaultValue) => {
  try {
    const response = await axios.get(api + path, {
      headers: {
        authorization: `Bearer ${defaultValue.key}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (e) {
    return [];
  }
};

const getJsonRequest = async (path, params, defaultValue) => {
  try {
    const response = await axios.get(api + path, {
      params: { params },
      headers: {
        authorization: `Bearer ${defaultValue.key}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (e) {
    console.log(e)
    return [];
  }
};

const getJsonRequest2 = async (path, params, defaultValue) => {
  try {
    const response = await axios.get(api + path, {
      params:  params ,
      headers: {
        authorization: `Bearer ${defaultValue.key}`,
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    return response;
  } catch (e) {
    return [];
  }
};

const postFormReqest = async (path, params) => {
  try {
    const response = await axios.post(api + path, params, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (e) {
    alert(e.response.data.detail);
    return null;
  }
};

const postJsonReqest = async (path, params, defaultValue) => {
  try {
    const response = await axios.post(api + path, params, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${defaultValue.key}`,
      },
      dataType: "json",
    });
    return response;
  } catch (e) {
    alert(e.response.data.detail);
    return null;
  }
};

const patchJsonReqest = async (path, body, defaultValue) => {
  try {
    const { data } = await axios.patch(api + path, body, {
      headers: {
        Authorization: `Bearer ${defaultValue.key}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (e) {
    return null;
  }
};

const deleteJsonReqest = async (path, defaultValue) => {
  try {
    const { data } = await axios.delete(api + path, {
      headers: {
        authorization: `Bearer ${defaultValue.key}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (e) {
    return null;
  }
};

const Api = {
  //내 정보 조회
  getUserData: async (token) => {
    return await LoginInfo(`/users/me`, token);
  },
  //로그인
  getAPI_AccountLogin_Syns: async (id, pw) => {
    let bodyFormData = new FormData();
    bodyFormData.append("username", id);
    bodyFormData.append("password", pw);
    return await Login(`/token`, bodyFormData);
  },
  //회원가입
  getAPI_SignUp: async (ID, PW, Email, Name, boolean, date, License) => {
    const data = JSON.stringify({
      requestDateTime: date,
      password: PW,
      username: ID,
      email: Email,
      first_name: Name,
      last_name: "",
      is_staff: boolean,
    });
    return await postFormReqest(`/users/?license_key=${License}`, data);
  },

  //아이디 찾기
  getAPI_FindID: async (Email) => {
    const data = JSON.stringify({
      email: Email,
    });
    return await postFormReqest(`/findid/${Email}`, data);
  },

  //비밀번호 변경(작동 x, 백엔드 수정 필요)
  getAPI_ChangePassword: async (pw, user, defaultValue) => {
    const data = JSON.stringify({
      requestUserCode: user,
      userCode: user,
      password: pw,
      encryption: 0,
    });
    return await postJsonReqest(`/Manager/UpdatePassword`, data, defaultValue);
  },

  //유저 정보 조회
  getAPI_user: async (user_id) => {
    return await getFormRequest(`/users/${user_id}`, defaultValue);
  },
  //유저 리스트 조회
  getAPI_UserList: async (
    search,
    searchParameter,
    orderParameter,
    order,
    pageNumber,
    count,
    defaultValue
  ) => {
    const data = {
      search: search,
      searchParameter: searchParameter,
      orderParameter: orderParameter,
      order: order,
      pageNumber: pageNumber,
      count: count,
    };
    return await getJsonRequest(`/users/`, data, defaultValue);
  },
  //유저정보 수정(이메일)
  getAPI_UserModify: async (UserID, Email, defaultValue) => {
    const data = JSON.stringify({
      id: UserID,
      email: Email,
    });
    return await patchJsonReqest(`/users/`, data, defaultValue);
  },
  //로그아웃
  getAPI_logout: async (UserID, defaultValue) => {
    const data = JSON.stringify({
      id: UserID,
      tokens: "NULL"
    });
    return await patchJsonReqest(`/users/`, data, defaultValue);
  },
  //유저 관리자 정보 수정
  getAPI_UserAdmin: async (UserID, button, defaultValue) => {
    const data = JSON.stringify({
      id: UserID,
      is_staff: button,
    });
    return await patchJsonReqest(`/users/`, data, defaultValue);
  },
  //유저 삭제
  getAPI_UserDelete: async (UserID, defaultValue) => {
    return await deleteJsonReqest(`/users/${UserID}`, defaultValue);
  },
  //라이센스 리스트 조회
  getAPI_LicenseList: async (
    search,
    searchParameter,
    orderParameter,
    order,
    pageNumber,
    count,
    defaultValue
  ) => {
    const data = {
      search: search,
      searchParameter: searchParameter,
      orderParameter: orderParameter,
      order: order,
      pageNumber: pageNumber,
      count: count,
    };
    return await getJsonRequest(`/licenses/`, data, defaultValue);
  },
  //라이센스 키 추가
  getAPI_ADDLicenseKey: async (defaultValue) => {
    return await getFormRequest(`/licenseKey/`, defaultValue);
  },
  //라이센스 삭제
  getAPI_LicenseDelete: async (LicenseID, defaultValue) => {
    return await deleteJsonReqest(`/licenses/${LicenseID}`, defaultValue);
  },
  //실험 프로토콜 리스트 조회
  getAPI_ExperimentList: async (
    Search,
    defaultValue
  ) => {
    const data = {
      keyword: Search,
    };
    return await getJsonRequest2(`/protocols/`, data, defaultValue);
  },
  //실험 프로토콜 정보 수정
  getAPI_ExperimentModify: async (id, name, manager, content, defaultValue) => {
    const data = JSON.stringify({
      id: id,
      title: name,
      manager: manager,
      desc: content,
    });
    return await patchJsonReqest(`/protocols/`, data, defaultValue);
  },
  //실험 프로토콜 삭제
  getAPI_ExperimentDelete: async (code, defaultValue) => {
    return await deleteJsonReqest(`/protocols/${code}`, defaultValue);
  },
  //실험 프로토콜 추가
  getAPI_ExperimentCreate: async (name, manager, content, defaultValue) => {
    const data = JSON.stringify({
      title: name,
      manager: manager,
      desc: content,
    });
    return await postJsonReqest(`/protocols/`, data, defaultValue);
  },
  //실험 리스트 조회
  getAPI_ExperimentSubList: async (id, defaultValue) => {
    const data = { protocol_id: id };
    return await getJsonRequest2(`/protocolExps/`, data, defaultValue);
  },
  //실험 정보 수정
  getAPI_ExperimentSubModify: async (
    id,
    name,
    sex,
    birthday,
    maindiagnosis,
    link,
    file,
    Experimentsid,
    defaultValue
  ) => {
    const data = JSON.stringify({
      id: id,
      name: name,
      gender: sex,
      birth: birthday,
      duagbisus: maindiagnosis,
      desc: "",
      survey_link: link,
      agree_filename: file,
      proto_id: Experimentsid,
    });
    return await patchJsonReqest(`/protocolExps/`, data, defaultValue);
  },
  //실험 추가
  getAPI_ExperimentSubCreate: async (
    name,
    sex,
    birthday,
    maindiagnosis,
    link,
    file,
    Experimentsid,
    defaultValue
  ) => {
    const data = JSON.stringify({
      name: name,
      gender: sex,
      birth: birthday,
      duagbisus: maindiagnosis,
      desc: "",
      survey_link: link,
      agree_filename: file,
      proto_id: Experimentsid,
    });
    return await postJsonReqest(`/protocolExps/`, data, defaultValue);
  },
  //실험 삭제
  getAPI_ExperimentSubDelete: async (code, defaultValue) => {
    return await deleteJsonReqest(`/protocolExps/${code}`, defaultValue);
  },
  //실험데이터 전송
  getAPI_PostData: async (upload_data,defaultValue) => {
    return await postJsonReqest(`/protocolExpsEvent/`, upload_data, defaultValue);
  },
  //트리거 전송
  getAPI_PostTrigger: async(obj,defaultValue) => {
    return await postJsonReqest(`/protocolExpTrigger/`,obj,defaultValue);
  },
  //마커 전송
  getAPI_PostMarker: async(obj,defaultValue) => {
    return await postJsonReqest(`/protocolExpsEvent/`, obj, defaultValue)
  },
  //마커 조회
  getAPI_getMarker: async(id,defaultValue) => {
    return await getJsonRequest(`/protocolExpsEvent/${id}`, {}, defaultValue)
  },
  //마커 삭제
  getAPI_deleteMarker: async(id,defaultValue) => {
    return await deleteJsonReqest(`/protocolExpsEvent/${id}`, defaultValue);
  },
  //마커 수정
  getModifyMarker: async(id, obj, defaultValue) => {
    return await patchJsonReqest(`/protocolExpsEvent/${id}`, obj, defaultValue);
  },
  //자극 전송
  getPostStimulus: async(obj, defaultValue)=> {
    return await postJsonReqest(`/protocolExpStimulus/`, obj, defaultValue);
  },
  //자극 리스트 조회
  getAPI_Stimulus: async(id, defaultValue) => {
    return await getJsonRequest(`/protocolExpStimulus/${id}`, {}, defaultValue)
  },
  //파일 전송
  getAPI_PostFile: async(obj,defaultValue) => {
    return await postJsonReqest(`/upload/`, obj, defaultValue)
  },
};

export default Api;
