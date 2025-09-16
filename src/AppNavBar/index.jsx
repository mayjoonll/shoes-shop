import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import './AppNavBar.css'
// Route : 페이지(컴포넌트) 이동 처리
// Routes : url에 담겨있는 정보를 획득
// Link : 실제로 페이지를 보여주는 역할, Link위치에 컴포넌트 뿌려줌
import { Link, useNavigate } from "react-router-dom";

function AppNavBar(){

  const navigate = useNavigate();

  return (
    <>
      <div className="App">
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand>Muzinjang</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
              <Nav.Link>Cart</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </>
  )
}

export default AppNavBar;