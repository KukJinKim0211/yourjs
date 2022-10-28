import axios from 'axios';
import { SERVER_IP } from './apis';
import { getCookie, setCookie } from './cookie';

// axios에 기본 BASE URL 설정
const axiosInstance = axios.create({
  baseURL: SERVER_IP, // 요청시에 추가적으로 앞에 붙는 기본 URL 설정
});

// 토큰 만료를 대비해 axios에 토큰 만료 에러가 발생 시 interceptor로 처리
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    // 토른 만료 에러 처리
    if (error.response.status === 401) {
      console.log('토큰만료 에러 intercepter start');
      console.log(getCookie('refresh_Token'));
      console.log('토큰만료 에러 intercepter end');
    }
    console.log('interceptor 시작');
    console.log(error.response.status);
    console.log(originalRequest);
    console.log('interceptor 종료');

    return await axios(originalRequest);
  },
);

export default axiosInstance;
