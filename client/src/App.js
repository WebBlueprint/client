import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './compoenets/Sidebar';
import Signup from './compoenets/Signup';
import Signin from './compoenets/Signin'
///10/07/2023
// Navbar 만들기
//로그인 후 메인페이지 레이아웃 따놓기 \
//로그인페이지 반응형 작업 


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route path='signup' element={<Signup />} />
          <Route path='signin' element={<Signin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
