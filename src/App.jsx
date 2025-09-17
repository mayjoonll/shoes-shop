import "./App.css";
import AppNavBar from "./AppNavBar";
// assets 폴더 내의 이미지 사용법 -> import 해서 사용
import bg_png from "./assets/images/bg.png"
import img_2 from "./assets/images/shoes2.jpg"
import {Container, Row, Col} from 'react-bootstrap';
import data from "./data/data";
import { useState } from "react";
import Product from "./Product";
import { Routes, Route } from "react-router-dom";
import Detail from "./Detail";
import About from "./About";

function App() {
  // 상품정보를 갖는 product 스테이트를 만든다.
  const [product, setProduct] = useState(data);

  return (
    <>
      {/* 네비게이션 바 영역 시작 */}
      <AppNavBar />
      {/* 네비게이션 바 영역 끝 */}
      {/* 메인 대문사진 영역 시작 */}
      <div className="main-bg" 
        style={{backgroundImage: `url('${bg_png}')`}}  
      />
      {/* 메인 대문사진 영역 끝 */}
      {/* Routing 정보를 한꺼번에 모아놓는 장소 */}
      {/* 스프링에서 사용하는 컨트롤러 클래스 */}
      <Routes>
        <Route path="/" element={<div>메인페이지</div>} />
        <Route path="/detail" element={<Detail/>} />
        <Route path="/cart" element={<div>장바구니페이지</div>} />
        {/* 중첩라우팅 처리 */}
        <Route path="/about" element={<About/>}>
          {/* /about/member */}
          <Route path="member" element={<div>Member Page</div>}></Route>
          <Route path="location" element={<div>Location Page</div>}></Route>
        </Route>
        <Route path="*" element={<div>Page Not Found 404 Error</div>}></Route>
      </Routes>
      {/* 상품진열영역 시작 */}
      <Container>
        <Row>
          {
            product.map((shoes, _)=>{
              return(
                <Col key={shoes.id} className="text-center">
                  {/* Product 콤포넌트 자리 */}
                  <Product shoes={shoes}/>
                </Col>
              )
            })
          }
        </Row>
      </Container>
      {/* 상품진열영역 끝 */}
    </>
  );
}

export default App;