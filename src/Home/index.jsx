import {Container, Row, Col, Button} from 'react-bootstrap';
import Product from '../Product';
import axios from 'axios';
import { useState } from 'react';
// assets 폴더 내의 이미지 사용법 -> import 해서 사용
import bg_png from "../assets/images/bg.png"

function Home({product, setProduct}){
  // 몇 번 눌렀는지 체크하는 스테이트
  let [dataLoadingCount, setDataLoadingCount] = useState(0)

  // 로딩 중 처리 스테이트
  let [loadingState, setLoadingState] = useState(false)

  return(
    <div>
      {/* 메인 대문사진 영역 시작 */}
      <div className="main-bg" 
        style={{backgroundImage: `url('${bg_png}')`}}  
      />
      {/* 메인 대문사진 영역 끝 */}
      {/* 상품진열영역 시작 */}
      <Container>
        <Row xs={3}>
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
      {/* 로딩 메시지 */}
      <div className='text-center my-3'>
          {loadingState && <div>Loading .... Please wait!</div>}
      </div>

      <div className='d-flex justify-content-center
          align-items-center'>
          <Button variant="primary" size="lg"
            onClick={async()=>{
              let getUrl = ''
              if(dataLoadingCount == 0){
                getUrl = 'https://zzzmini.github.io/js/react_data_01.json';
                setDataLoadingCount(dataLoadingCount + 1);
                setLoadingState(true)
              } else if(dataLoadingCount == 1){
                getUrl = 'https://zzzmini.github.io/js/react_data_02.json';
                setDataLoadingCount(dataLoadingCount + 1);
                setLoadingState(true)
              } else {
                alert('데이터가 존재하지 않아요!')
                return;
              }

              try{
                const result = await axios(getUrl)
                let temp = [... product, ... result.data];
                setProduct(temp);
              } catch (error){
                console.log("가져오기 실패", error)
              } finally {
                setLoadingState(false)
              }              

              // 데이터를 3개 가져오는 함수
              // axios
              //   .get('https://zzzmini.github.io/js/react_data_01.json')
              //   .then((result)=>{
              //     let temp = [... product]
              //     for(let x of result.data){
              //       temp.push(x)
              //     }
              //     setProduct(temp)
              //   })
              //   .catch(()=>{
              //     console.log("가져오기 실패")
              //   })
            }}>
            데이터 가져오기</Button>
      </div>
    </div>
  )
}
export default Home;