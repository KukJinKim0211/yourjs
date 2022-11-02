// 서버 IP
export const SERVER_IP = 'http://yourjs.co.kr:18080/api';

export const apis = {
  idCheck: '/user/duple/userid', // POST 아이디중복체크
  nicknameCheck: '/user/duple/nickname', // POST 닉네임중복체크
  signUp: '/user', // POST 회원가입
  login: '/user/login', // POST 로그인
  getAccessToken: '/user/refresh', // 액세스토큰 재발급
};
