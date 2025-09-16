import './App.css'
import AppNavBar from './AppNavBar';
import {Container, Row, Col} from 'react-bootstrap';
// assets 폴더 내의 이미지 사용법 -> import 해서 사용
import bg_png from "./assets/images/bg.png"
import img_2 from "./assets/images/shoes2.jpg"
import data from './data/data';
import { useState } from 'react';
import Product from './Product';
import {Routes, Route} from "react-router-dom";
import Detail from './Detail';

function App() {
  // 상품정보를 갖는 product 스테이트를 만든다
  const [product, setProduct] = useState(data)
  console.log(product)

  return (
    <>
      {/* 네비게이션 바 영역 시작 */}
      <AppNavBar/>
      {/* 네비게이션 바 영역 끝 */}

        {/* Routing 정보를 한꺼번에 모아놓는 장소 */}
        {/* 스프링에서 사용하는 컨트롤러 클래스 */}
        

      {/* 메인 대문사진 영역 시작 */}
      <div className='main-bg'
        style={{backgroundImage:`url('${bg_png}')`}}
      />
      <Routes>
          <Route path="/" element={<div>메인페이지</div>} />
          <Route path="/detail" element={<Detail/>} />
          <Route path="/cart" element={<div>장바구니페이지</div>} />
          <Route path="*" element={<div>Page Not Found 404 Error</div>}></Route>
        </Routes>
      {/* 메인 대문사진 영역 끝 */}
      {/* 상품진열 영역 시작 */}
      {/* 상품진열 영역 끝 */}
       <Container>
      <Row>
        {
          product.map((shoes,_)=>{
            return(
            <Col key={shoes.id} className='text-center'>
          {/* product 컴포넌트 자리 */}
          <Product shoes={shoes}/>
        </Col>
          )
          })
        }
      </Row>
    </Container>
    </>
  );
}

export default App
