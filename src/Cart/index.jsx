import React, { useState } from "react"
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
  const {cartData, addItem, removeItem, updateItem} = cartStore();

  console.log(cartData)

  // 폼 정보를 저장하는 스테이트
  const [form, setForm] = useState({
    id: "",
    name : "",
    count: 1,
  })

  // 폼 내부의 input 상자의 값이 바뀔 때 스테이트에 저장
  const onChange = (e)=>{
    // 수정 중인 상자의 name, value 속성을 가져옴.
    const {name, value} = e.target;
    // 스테이트에서 이전 스테이트 값을 활용
    // prev : form state 이전 값을 의미
    // setForm(updated);
    setForm((prev) => {
      // 이전 값을 변수로 저장
      const updated = {... prev}

      if(name==="id" || name==="count"){
        // id와 count는 숫자 필드니까... 숫자로 변경
        if(value === ""){
          updated[name] = "";
        } else {
          updated[name] = Number(value)
        }
      } else if(name==="name"){
        updated[name] = value;
      }
      return updated;
    })
  }

  // 데이터 추가 단추 클릭 함수
  const handleAdd = () => {
    addItem(form);
    clearForm();
  }

  // 데이터 삭제 처리 함수
  const handleDelete = () => {
    removeItem(form.id)
    clearForm();
  }

  // 데이터 수정 단추 클릭 시 수행 함수
  const handleUpdate =() => {
    updateItem(form.id, form)
    console.log(form.id)
    console.log(form)
    clearForm()
  }

  const clearForm = () => {
    setForm({
      id: "",
      name:"",
      count:1
    })
  }

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
              value={form.id}
              onChange={onChange}
            />
          </Col>
          <Col xs={12} md={6}>
            <Form.Label>상품명</Form.Label>
            <Form.Control name="name"
              type="text"
              placeholder="예: Red Nike Air"
              value={form.name}
              onChange={onChange}
            />
          </Col>
          <Col xs={12} md={2}>
            <Form.Label>수량</Form.Label>
            <InputGroup>
              <Form.Control name="count"
              type="number"
              placeholder="1"
              min={1}
              value={form.count}
              onChange={onChange}
              />
            </InputGroup>
          </Col>
          <Col xs={12} md={2} className="d-flex gap-2">
            <Button variant="primary" className="flex-fill" onClick={handleAdd}>
              추가</Button>
            <Button variant="warning" className="flex-fill" onClick={handleUpdate}>
              수정</Button>
            <Button variant="danger" className="flex-fill" onClick={handleDelete}>
              삭제</Button>
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