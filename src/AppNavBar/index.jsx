import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import './AppNavBar.css'
// Route : 페이지(컴포넌트) 이동 처리
// Routes : Route를 감싸는 용도
// Link : 실제로 페이지를 보여주는 역할, Link위치에 컴포넌트 뿌려줌
// userNavigate : 스크립트 영역에서 링크처리를 하는 훅
import { Link, useNavigate } from "react-router-dom";
// import {UserContext} from "../context/UserContext.jsx"
// import { useContext } from "react";

import userStore from "../store/userStore";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useState } from "react";

function AppNavBar(){
  // const {loginUser} = useContext(UserContext);
  // console.log(loginUser)

  // store에서 정보 가져오기(zustand 사용)
  const {userName, productStock, productName, changeName, addProduct} 
          = userStore();

  // console.log(productName);
  // console.log(productStock);
  // 로그인 정보를 담을 스테이트 선언
  const [userInfo, setUserInfo] = useState(undefined);

  const navigate = useNavigate();

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const handelAuth = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      // console.log(user)
      setUserInfo(user)
    }).catch((error) => {
      console.log(error)
    });
  }

  const handleLogOut = () => {
    signOut(auth)
    .then(()=> {
      setUserInfo(undefined);
      navigate("/");
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  return (
    <>
      <div className="App">
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand>Muzinjang</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>

              {userInfo && (
                <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
              )}

              <Nav.Link onClick={()=>{navigate('/recent')}}>Recent</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/about')}}>About</Nav.Link>
              <NavDropdown title="Info" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={()=>{navigate('/about/member')}}>Member</NavDropdown.Item>
                <NavDropdown.Item onClick={()=>{navigate('/about/location')}}>Location</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="ms-auto align-items-center">
              {
                userInfo? (
                  <div className="d-flex align-item-center userInfoArea">
                    <img 
                      src={userInfo.photoURL}
                      alt={userInfo.displayName}
                      className="userImage"
                    />
                    <span className="me-3 text-light small">
                      {userInfo.email || userInfo.displayName}
                    </span>
                    <Nav.Link onClick={handleLogOut}>LogOut</Nav.Link>
                  </div>
                ) : (
                  <Nav.Link onClick={handelAuth}>LogIn</Nav.Link>
                )
              }
              {/* <Nav.Link as="span" 
                  onClick={()=>{
                    changeName()
                    addProduct('르무통', 5)
                  }}  >
                  유저변경</Nav.Link>
              <Nav.Link as="span">{`${userName}님 로그인 됨.`}</Nav.Link> */}
            </Nav>
          </Container>
        </Navbar>
      </div>
    </>
  )
}

export default AppNavBar;