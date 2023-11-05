import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Main from "./components/main/Main";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import Navbar from "./components/navbar/Navbar";
import Search from "./components/search/Search";
import Booking from "./components/booking/booking";
import Schedule from "./components/schedule/schedule";
import Lessons from "./components/lessons/Lessons";
import Chat from "./components/chat/chat";
import Setting from "./components/setting/settingComponents/Setting";

///10/07/2023
// Navbar 만들기
//로그인 후 메인페이지 레이아웃 따놓기 \
//로그인페이지 반응형 작업

const NavbarLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route element={<NavbarLayout />}>
              <Route path="/" element={<Main />} />
              <Route path="/search" element={<Search />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/setting" element={<Setting />} />
            </Route>
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Signin />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
