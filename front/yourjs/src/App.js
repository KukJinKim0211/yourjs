import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import HeaderlessLayout from './layout/HeaderlessLayout';
import Main from './pages/Main';
import MainCalendar from './pages/MainCalendar';
import MyNotice from './pages/MyNotice';
import FindNotice from './pages/FindNotice';
import Portfolio from './pages/Portfolio';
import PortfolioEdit from './pages/PortfolioEdit';
import MyGroup from './pages/MyGroup';
import MyPage from './pages/MyPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import KakaoLogin from './pages/KakaoLogin';
import NaverLogin from './pages/NaverLogin';
import MyNoticeDetail from './components/MyNotice/MyNoticeDetail';
import MyNoticeAdd from './components/MyNotice/MyNoticeAdd';
import axios from 'axios';
import axiosInstance from './common/customAxios';
import { SERVER_IP, apis } from './common/apis';
import { getCookie } from './common/cookie';
import PublicRoute from './route/PublicRoute';
import PrivateRoute from './route/PrivateRoute';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 자동 로그인은 설정이 되어 있지만 액세스 토큰은 없는 경우 ( 브라우저 다시 실행할 시 )
    if (
      JSON.parse(localStorage.getItem('autoLogin')) &&
      sessionStorage.getItem('accessToken') === null
    ) {
      // refreshToken으로 AccessToken 요청하기
      axios
        .get(SERVER_IP + apis.getAccessToken, {
          headers: { Authorization: `Bearer ${getCookie('refresh_Token')}` },
        })
        .then(response => {
          if (response.status === 200) {
            sessionStorage.setItem('accessToken', response.data.accessToken);
            sessionStorage.setItem('loginState', true);
          }
        })
        .then(() => window.location.replace('/maincalendar'));
    }

    if (
      JSON.parse(localStorage.getItem('autoLogin')) &&
      sessionStorage.getItem('nickname') === null
    ) {
      axiosInstance
        .get(apis.getUserInfo, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        })
        .then(response => {
          sessionStorage.setItem('nickname', response.data.nickname);
          dispatch({ type: 'login', nickname: response.data.nickname });
        });
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route
            path="/maincalendar"
            element={
              <PrivateRoute>
                <MainCalendar />
              </PrivateRoute>
            }
          />
          <Route
            path="/notice"
            element={
              <PrivateRoute>
                <MyNotice />
              </PrivateRoute>
            }
          />
          <Route
            path="/notice/add"
            element={
              <PrivateRoute>
                <MyNoticeAdd />
              </PrivateRoute>
            }
          />
          <Route
            path="/notice/detail"
            element={
              <PrivateRoute>
                <MyNoticeDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/findnotice"
            element={
              <PrivateRoute>
                <FindNotice />
              </PrivateRoute>
            }
          />
          <Route
            path="/portfolio"
            element={
              <PrivateRoute>
                <Portfolio />
              </PrivateRoute>
            }
          />
          <Route
            path="/portfolio/edit"
            element={
              <PrivateRoute>
                <PortfolioEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/mygroup"
            element={
              <PrivateRoute>
                <MyGroup />
              </PrivateRoute>
            }
          />
          <Route
            path="/mypage"
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route element={<HeaderlessLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login/kakao" element={<KakaoLogin />} />
          <Route path="/login/naver" element={<NaverLogin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
