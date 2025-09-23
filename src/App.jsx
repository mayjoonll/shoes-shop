import "./App.css";
import AppNavBar from "./AppNavBar";
import data from "./data/data";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Detail from "./Detail";
import About from "./About";
import Home from "./Home";
import Cart from "./Cart";
import Recent from "./Recent";


function App() {
  // 상품정보를 갖는 product 스테이트를 만든다.
  const [product, setProduct] = useState(data);

  return (
    <>
      {/* 네비게이션 바 영역 시작 */}
      <AppNavBar />
      {/* 네비게이션 바 영역 끝 */}
      
      {/* Routing 정보를 한꺼번에 모아놓는 장소 */}
      {/* 스프링에서 사용하는 컨트롤러 클래스 */}
      <Routes>
        <Route path="/" element={<Home product={product} setProduct={setProduct}/>} />
        {/* /detail/2 -> PathVariable 설정 법 */}
        <Route path="/detail/:id" element={<Detail product={product}/>} />
        <Route path="/cart" element={<Cart />} />
        {/* 중첩라우팅 처리 */}
        <Route path="/about" element={<About/>}>
          {/* /about/member */}
          <Route path="member" element={<div>Member Page</div>}></Route>
          <Route path="location" element={<div>Location Page</div>}></Route>
        </Route>
        <Route path="/recent" element={<Recent  product={product}/>} />
        <Route path="*" element={<div>Page Not Found 404 Error</div>}></Route>
      </Routes>
    </>
  );
}

export default App;