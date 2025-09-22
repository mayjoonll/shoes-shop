import React from "react"
import Table from 'react-bootstrap/Table';
import userStore from "../store/userStore";
import cartStore from "../store/cartStore";

function Cart(){
  // 특정 스테이트만 가져오는 방법
  const userName = userStore((state)=> state.userName)
  // console.log(userName);

  const {productName, productStock} = userStore();

  // console.log(productName)
  // console.log(productStock)

  // 카트 데이터 가져오기
  const cartData = cartStore((x)=> x.cartData);
  console.log(cartData)

  return(
    <div>
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