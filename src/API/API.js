import axios from "axios";
import cookie from "./cookie";
const api = "http://neurotx.co.kr:8888";
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
  //로그인
  getUserData: async (token) => {
    return await LoginInfo(`/users/me`, token);
  },
  getAPI_AccountLogin_Syns: async (id, pw) => {
    let bodyFormData = new FormData();
    bodyFormData.append("username", id);
    bodyFormData.append("password", pw);
    return await Login(`/token`, bodyFormData);
  },
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
  getAPI_FindID: async (Email) => {
    const data = JSON.stringify({
      email: Email,
    });
    return await postFormReqest(`/findid/${Email}`, data);
  },
  getAPI_ChangePassword: async (pw, user, defaultValue) => {
    const data = JSON.stringify({
      requestUserCode: user,
      userCode: user,
      password: pw,
      encryption: 0,
    });
    return await postJsonReqest(`/Manager/UpdatePassword`, data, defaultValue);
  },
  getAPI_user: async (user_id) => {
    return await getFormRequest(`/users/${user_id}`, defaultValue);
  },
  //유저
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
  getAPI_UserModify: async (UserID, Email, defaultValue) => {
    const data = JSON.stringify({
      id: UserID,
      email: Email,
    });
    return await patchJsonReqest(`/users/`, data, defaultValue);
  },
  getAPI_logout: async (UserID, defaultValue) => {
    const data = JSON.stringify({
      id: UserID,
      tokens: "NULL"
    });
    return await patchJsonReqest(`/users/`, data, defaultValue);
  },
  getAPI_UserAdmin: async (UserID, button, defaultValue) => {
    const data = JSON.stringify({
      id: UserID,
      is_staff: button,
    });
    return await patchJsonReqest(`/users/`, data, defaultValue);
  },
  getAPI_UserDelete: async (UserID, defaultValue) => {
    return await deleteJsonReqest(`/users/${UserID}`, defaultValue);
  },
  //라이센스
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
  getAPI_ADDLicenseKey: async (defaultValue) => {
    return await getFormRequest(`/licenseKey/`, defaultValue);
  },
  getAPI_LicenseDelete: async (LicenseID, defaultValue) => {
    return await deleteJsonReqest(`/licenses/${LicenseID}`, defaultValue);
  },
  //메인화면(실험관리)
  getAPI_ExperimentList: async (
    Search,
    defaultValue
  ) => {
    const data = {
      keyword: Search,
    };
    return await getJsonRequest2(`/protocols/`, data, defaultValue);
  },
  getAPI_ExperimentModify: async (id, name, manager, content, defaultValue) => {
    const data = JSON.stringify({
      id: id,
      title: name,
      manager: manager,
      desc: content,
    });
    return await patchJsonReqest(`/protocols/`, data, defaultValue);
  },
  getAPI_ExperimentDelete: async (code, defaultValue) => {
    return await deleteJsonReqest(`/protocols/${code}`, defaultValue);
  },
  getAPI_ExperimentCreate: async (name, manager, content, defaultValue) => {
    const data = JSON.stringify({
      title: name,
      manager: manager,
      desc: content,
    });
    return await postJsonReqest(`/protocols/`, data, defaultValue);
  },
  //실험 상세
  getAPI_ExperimentSubList: async (id, defaultValue) => {
    const data = { protocol_id: id };
    return await getJsonRequest2(`/protocolExps/`, data, defaultValue);
  },
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
  getAPI_ExperimentSubDelete: async (code, defaultValue) => {
    return await deleteJsonReqest(`/protocolExps/${code}`, defaultValue);
  },
  //실험데이터 전송
  getAPI_PostData: async (upload_data,defaultValue) => {
    return await postJsonReqest(`/protocolExpsEvent/`, upload_data, defaultValue);
  },
  getAPI_PostTrigger: async(obj,defaultValue) => {
    return await postJsonReqest(`/protocolExpTrigger/`,obj,defaultValue);
  },
  getAPI_PostMarker: async(obj,defaultValue) => {
    return await postJsonReqest(`/protocolExpsEvent/`, obj, defaultValue)
  },
  getAPI_getMarker: async(id,defaultValue) => {
    return await getJsonRequest(`/protocolExpsEvent/${id}`, {}, defaultValue)
  },
  getAPI_deleteMarker: async(id,defaultValue) => {
    return await deleteJsonReqest(`/protocolExpsEvent/${id}`, defaultValue);
  },
  getModifyMarker: async(id, obj, defaultValue) => {
    return await patchJsonReqest(`/protocolExpsEvent/${id}`, obj, defaultValue);
  },
  getPostStimulus: async(obj, defaultValue)=> {
    return await postJsonReqest(`/protocolExpStimulus/`, obj, defaultValue);
  },
  getAPI_Stimulus: async(id, defaultValue) => {
    return await getJsonRequest(`/protocolExpStimulus/${id}`, {}, defaultValue)
  },
  getAPI_PostFile: async(obj,defaultValue) => {
    return await postJsonReqest(`/upload/`, obj, defaultValue)
  },
};

export default Api;
