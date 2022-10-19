import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Main from './pages/Main';
import MainCalendar from './pages/MainCalendar';
import MyNotice from './pages/MyNotice';
import FindNotice from './pages/FindNotice';
import Portfolio from './pages/Portfolio';
import MyGroup from './pages/MyGroup';
import MyPage from './pages/MyPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainCalendar />} />
          <Route path="/notice" element={<MyNotice />} />
          <Route path="/findnotice" element={<FindNotice />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/MyGroup" element={<MyGroup />} />
          <Route path="/MyPage" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
