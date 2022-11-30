import axios from 'axios';
import { base_url } from './URL';

const client = axios.create({
    baseURL: base_url + '/api'
})

client.interceptors.request.use(
    function (config) {
        const user = sessionStorage.getItem('user'); // 토큰 받아오기
        
        // 토큰 유무 판단 코드
        if (!user) {
            config.headers["X-AUTH-TOKEN"] = null;
            return config
        }
        const { accessToken, refreshToken } = JSON.parse(user)
        config.headers["X-AUTH-TOKEN"] = accessToken;

        return config
    }
)

client.interceptors.response.use(
    function (response) {
        return response
    },
    async function (error) {
      if (error.response && error.response.status === 403) {
          try {
              const originalRequest = error.config;
        
              const user = sessionStorage.getItem('user'); // 토큰 받아오기
              const { accessToken, refreshToken } = JSON.parse(user)
              const data = await client.get('auth/refreshtoken', {
                headers: {
                    REFRESHTOKEN: refreshToken
                }
            })
            console.log(data);
            if(data.data.result === 'fail'){
                sessionStorage.removeItem('user')
                window.location.href = '/login';
                alert('세션이 만료되었습니다.');
                return null;
            }
              if (data) {
                  const {accessToken, refreshToken} = data.data
                  sessionStorage.removeItem('user')
                  sessionStorage.setItem('user', JSON.stringify(data.data, ['accessToken', 'refreshToken']))
                  originalRequest.headers['X-AUTH-TOKEN'] = accessToken;
                  return await client.request(originalRequest);
                  }
          } catch (error){
              localStorage.removeItem('user');
              console.log(error);
          }
          return Promise.reject(error)
      }
      return Promise.reject(error)
    }
)

export default client;