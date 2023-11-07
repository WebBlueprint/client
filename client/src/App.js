import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
<<<<<<< HEAD
import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './components/application/store/AuthContext';
=======
>>>>>>> origin/yuncheol
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
<<<<<<< HEAD
=======
import LocationBox from "../src/components/block/GolfLocationBox/LocationBox";
import ReviewLocation from "../src/components/block/GolfReviewBox/ReviewLocation";
import ReviewLocationData from "./components/block/GolfReviewBox/ReviewLocationData";
import Header from "./components/block/Header/Header";
import LessonRemaining from "./components/block/LessonRemaining/LessonRemaining";
import LessonSchedule from "./components/block/LessonSchedule/LessonSchedule";
import UpcomingEvent from "./components/block/UpcomingEvent/UpcomingEvent";
import ListData from "./components/block/UpcomingList/ListData";
import UpcomingList from "./components/block/UpcomingList/UpcomingList";
>>>>>>> origin/yuncheol

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
            {/* block component 추후에 삭제 */}
            <Route path="block0" element={<LocationBox />} />
            <Route path="block1" element={<ReviewLocation />} />
            <Route path="block2" element={<ReviewLocationData />} />
            <Route path="block3" element={<Header />} />
            <Route path="block4" element={<LessonRemaining />} />
            <Route path="block5" element={<LessonSchedule />} />
            <Route path="block6" element={<UpcomingEvent />} />
            <Route path="block7" element={<ListData />} />
            <Route path="block8" element={<UpcomingList />} />
            {/* block component 추후에 삭제 */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
