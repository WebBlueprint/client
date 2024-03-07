import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import React, { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./components/application/store/AuthContext";
import Main from "./components/main/Main";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import Navbar from "./components/navbar/Navbar";
import Search from "./components/search/Search";
import Schedule from "./components/schedule/schedule";
import Setting from "./components/setting/settingMain";
import ChatPage from "./components/chat/ChatPage.js";
import LocationBox from "../src/components/block/GolfLocationBox/LocationBox";
import ReviewLocation from "../src/components/block/GolfReviewBox/ReviewLocation";
import ReviewLocationData from "./components/block/GolfReviewBox/ReviewLocationData";
import Header from "./components/block/Header/Header";
import LessonRemaining from "./components/block/LessonRemaining/LessonRemaining";
import LessonSchedule from "./components/block/LessonSchedule/LessonSchedule";
import UpcomingEvent from "./components/block/UpcomingEvent/UpcomingEvent";
import ListData from "./components/block/UpcomingList/ListData";
import UpcomingList from "./components/block/UpcomingList/UpcomingList";
import LessonDetail from "../src/components/lessons/lessonsCompoenets/ViewDetail_Lessons/LessonviewDetails";
import Searched from "../src/components/search/searched";
import SearchPro from "../src/components/search/searchPro";
import SearchCourse from "../src/components/search/searchCourse";
import MyLessonsMain from "./components/lessons/LessonsMain.jsx";
import Booking from "./components/booking/Booking.jsx";
import ProDetail from "./components/block/DetailPage/ProDetail.jsx";
import DrivingRangeDetail from "./components/block/DetailPage/DrivingRangeDetail.jsx";

function App() {
  const { login, userinfo, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/verifyauth",
          {},
          { withCredentials: true }
        );
        console.log("JWT토큰 응답 확인", response.data.accessToken);
        login({ email: response.data.decodedToken.email });
      } catch (error) {
        console.error("사용자 확인 중 오류 발생:", error);
      }
    };

    checkToken();
  }, []);

  const NavbarLayout = () => (
    <>
      <Navbar />
      <Outlet />
    </>
  );

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
              <Route path="/lessons" element={<MyLessonsMain />} />
              <Route path="/lessons/:id" element={<LessonDetail />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/searched" element={<Searched />} />
              <Route path="/prodetail" element={<ProDetail />} />
              <Route path="/drivingnrange" element={<DrivingRangeDetail />} />
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
            <Route path="/searchPro" element={<SearchPro />} />
            <Route path="/searchCourse" element={<SearchCourse />} />
            {/* block component 추후에 삭제 */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
