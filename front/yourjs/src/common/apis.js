// 서버 IP
export const SERVER_IP = 'https://yourjs.co.kr/api';

export const apis = {
  // [포트폴리오 API] 개인상세정보 조회/수정/추가/삭제
  portfolio: '/portfolio', // GET, POST, PUT, DELETE

  // [구직포지션 API] 유저관심포지션 조회/등록
  userSubject: '/subject/user', // GET, POST

  // [구직포지션 API]
  subject: '/subject', // GET

  // [구직포지션 유저 조회 API]
  subjectPosition: '/subject/position', // GET

  // [공고 API]
  notice: '/notice', // GET, POST, PUT, DELETE

  noticeSubject: '/notice/subject',

  // [일정 API]
  schedule: '/notice/schedule', // PUT, DELETE

  // [경력사항 API]
  career: '/career', // GET, POST, PUT, DELETE

  // [수상내역 API]
  award: '/award', // GET, POST, PUT, DELETE

  // [자격증/어학 API]
  certificate: '/certificate', // GET, POST, PUT, DELETE

  // [팔로우 API]
  follow: '/follow', // GET, POST, DELETE

  // [학력사항 API]
  graduation: '/graduate', // GET, POST, PUT, DELETE

  // [교육사항 API]
  education: '/education', // GET, POST, PUT, DELETE

  // [자소서 API]
  selfIntroduce: '/introduce', // GET, POST, PUT, DELETE

  // [병역사항 API]
  military: '/military', //GET, POST, PUT, DELETE

  // [프로젝트 경험 API]
  project: '/project', // GET, POST, PUT, DELETE

  // [회원관리 API]
  signUp: '/user', // POST 회원가입
  deleteUser: '/user', // DELETE 회원 탙뢰
  login: '/user/login', // POST 로그인

  kakaoLogin: '/user/kakao', // POST 카카오로그인
  naverLogin: '/user/naver', // POST 네이버로그인

  idCheck: '/user/duple/userid', // POST 아이디중복체크
  nicknameCheck: '/user/duple/nickname', // POST 닉네임중복체크

  passwordChange: '/user/passchange', // PATCH 패스워드변경
  levelChange: '/user/levelchange', // PATCH 공개범위 변경
  infoChange: '/user/infochange', // PATCH 계정정보 변경

  getUserInfo: '/user/simple', // GET 기본 정보 조회
  getUserDetailInfo: '/user/detail', // GET 세부 정보 조회

  checkAuth: '/user/roles', // GET 유저 권한 확인
  checkUserAuth: '/user/roles/', // GET 특정 유저 권한 확인

  getAccessToken: '/user/refresh', // 액세스토큰 재발급
};
