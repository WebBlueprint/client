import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Signup from "./compoenets/Signup";
import Signin from "./compoenets/Signin";
import Sidebar from "./compoenets/Sidebar";
import Test0 from "./pages/Test0";
import Test1 from "./pages/Test1";
import Test2 from "./pages/Test2";
import Test3 from "./pages/Test3";
import Test4 from "./pages/Test4";

///10/07/2023
// Navbar 만들기
//로그인 후 메인페이지 레이아웃 따놓기 \
//로그인페이지 반응형 작업

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Signin />} />
            <Route path="test0" element={<Test0 />} />
            <Route path="test1" element={<Test1 />} />
            <Route path="test2" element={<Test2 />} />
            <Route path="test3" element={<Test3 />} />
            <Route path="test4" element={<Test4 />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
