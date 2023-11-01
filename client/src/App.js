import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Main from "./pages/Main";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Navbar from "./components/Navbar";
import Search from "./components/routes/Search";
import Booking from "./components/routes/Booking";
import Schedule from "./components/routes/Schedule";
import Lessons from "./components/routes/Lesson";
import Chat from "./components/routes/Chat";
import Setting from "./pages/Setting/Setting";

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
