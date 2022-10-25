// 소셜 로그인 관련
// 카카오 API
const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
// 네이버 API
const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;

export { KAKAO_AUTH_URL, NAVER_CLIENT_ID, NAVER_REDIRECT_URI };
