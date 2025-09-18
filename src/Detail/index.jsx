import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Discount from "../Discount";


function Detail({product}){

    const [showAlert, setShowAlert] = useState(true)
    const [inputData, setInputDate] = useState('')
    // 숫자말고 문자 입력 시 처리를 확인 할 논리값
    const [state, setState] = useState(false)

  // useEffect 실행 확인
  useEffect(()=>{
    // 타이머를 붙이고 2초 후에 Discount가 사라지도록
    const myTimer = setTimeout(()=>setShowAlert(false), 2000);
    // 기존에 사용한 타이머를 삭제
    return ()=>{
      clearTimeout(myTimer);
    }
    // 처음 실행 될 때 딱 한번만...
  }, [])

  // 입력 수량 확인 용 effect
  // input 상자에만 반응
  useEffect(()=>{
    // InputData state가 문자면
    // isNaN : is not a Number
    if(isNaN(inputData)){
        setState(true) 
    } else {
      setState(false)
    }
  }, [inputData])

  // detail/3 -> pathvariable 값을 확인...
  // hook : useParams
  // 파라미터를 변수로 저장할 때는 중괄로 사용 필수
  let {id} = useParams(); // 얘는 문자 값
  const navigate = useNavigate();

  // 가져온 pathvaribale값을 -> 숫자
  // props로 전달받은 product 배열에서 해당하는 객체만 찾아요...
  const findProduct = product.find(item => {
    return item.id === Number(id);
  })

  // 해당하는 제품이 존재하지 않을 때 처리
  if(findProduct == null){
    alert('찾는 상품이 없습니다.')
    // 바로 이전 페이지로 이동
    // history.back(); - 자바 스크립트 용
    navigate(-1);
    return null;
  }

  return(
    <div className="container">
      <div className="container mt-2">
          {showAlert && <Discount />}
        </div>
      <div className="row">
        <div className="col-md-6">
          <img src={`/images/shoes${findProduct.id+1}.jpg`} 
            width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{findProduct.title}</h4>
          <p>{findProduct.content}</p>
          {/* 문자가 들어올 때 출력할 내용 */}
          {state && <div>오류</div>}
          <p>수량:
            <input type="text" onChange={(e)=>{setInputDate(e.target.value)}}/>
          </p>
          <p>{findProduct.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  )
}
export default Detail;