import React from "react"
import Table from 'react-bootstrap/Table';
import userStore from "../store/userStore";
import cartStore from "../store/cartStore";
import {Form, Row, Col, Button, InputGroup} from "react-bootstrap"

function Cart(){
  // 특정 스테이트만 가져오는 방법
  const userName = userStore((state)=> state.userName)
  // console.log(userName);
  // console.log(productName)
  // console.log(productStock)

  // 카트 데이터 가져오기
  // const cartData = cartStore((x)=> x.cartData);
  const {cartData} = cartStore();

  console.log(cartData)

  return(
    <div>
      {/* CRUD 테스트 용 폼 */}
      <Form className="mb-3 px-3">
        <Row className="gy-2 gx-2 aling-items-end">
          <Col xs={12} md={2}>
            <Form.Label>ID</Form.Label>
            <Form.Control name="id"
              type="number"
              placeholder="예: 2"
              min={0}
            />
          </Col>
          <Col xs={12} md={6}>
            <Form.Label>상품명</Form.Label>
            <Form.Control name="name"
              type="text"
              placeholder="예: Red Nike Air"
            />
          </Col>
          <Col xs={12} md={2}>
            <Form.Label>수량</Form.Label>
            <InputGroup>
              <Form.Control name="count"
              type="number"
              placeholder="1"
              min={1}
              />
            </InputGroup>
          </Col>
          <Col xs={12} md={2} className="d-flex gap-2">
            <Button variant="primary" className="flex-fill">추가</Button>
            <Button variant="warning" className="flex-fill">수정</Button>
            <Button variant="danger" className="flex-fill">삭제</Button>
          </Col>
        </Row>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {
            cartData.map((item, index)=>{
              return(
                <tr key={index}>
                  <th>{item.id}</th>
                  <th>{item.name}</th>
                  <th>{item.count}</th>
                  <th>수정삭제</th>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
}
// Cart 부모컴포넌트 내부의 state가 변해도
// 나랑 관련이 없으면
// 다시 랜더링하지 않음.
export default React.memo(Cart)