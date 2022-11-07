import axios from 'axios';
import { SERVER_IP, apis } from './apis';
import { getCookie, setCookie } from './cookie';

// axios에 기본 BASE URL 설정
const axiosInstance = axios.create({
  baseURL: SERVER_IP, // 요청시에 추가적으로 앞에 붙는 기본 URL 설정
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  function (config) {
    config.headers['Authorization'] = `Bearer ${sessionStorage.getItem(
      'accessToken',
    )}`;
    return config;
  },
  function (error) {
    // 오류 요청을 보내기전 수행할 일
    // ...
    return Promise.reject(error);
  },
);

// 토큰 만료를 대비해 axios에 토큰 만료 에러가 발생 시 interceptor로 처리
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    console.log('Interceptor 호출 시작==============');
    const originalRequest = error.config;
    console.log(error.response.status);
    // 토른 만료 에러 처리
    if (error.response.status === 401) {
      console.log('토큰만료 에러 intercepter start');
      // refreshToken으로 AccessToken 요청하기
      axios
        .get(SERVER_IP + apis.getAccessToken, {
          headers: { Authorization: `Bearer ${getCookie('refresh_Token')}` },
        })
        .then(response => {
          sessionStorage.setItem('accessToken', response.data.accessToken);
        });
      console.log('토큰만료 에러 intercepter end');
      return await axiosInstance(originalRequest);
    }
    // console.log('interceptor 재송신 시작');
    // console.log(originalRequest);
    console.log('Interceptor 호출 종료==============');
    // return await axios(originalRequest);
  },
);

export default axiosInstance;
