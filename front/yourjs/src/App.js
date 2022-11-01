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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/maincalendar" element={<MainCalendar />} />
          <Route path="/notice" element={<MyNotice />} />
          <Route path="/notice/add" element={<MyNoticeAdd />} />
          <Route path="/notice/detail" element={<MyNoticeDetail />} />
          <Route path="/findnotice" element={<FindNotice />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/edit" element={<PortfolioEdit />} />
          <Route path="/MyGroup" element={<MyGroup />} />
          <Route path="/MyPage" element={<MyPage />} />
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





