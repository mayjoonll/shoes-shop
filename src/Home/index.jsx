import {Container, Row, Col, Button} from 'react-bootstrap';
import Product from '../Product';
import axios from 'axios';

function Home({product, setProduct}){
  return(
    <div>
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
      <div className='d-flex justify-content-center
          align-items-center'>
          <Button variant="primary" size="lg"
            onClick={async()=>{
              try{
                const result1 = await axios('https://zzzmini.github.io/js/react_data_01.json')
                let temp = [... product, ... result1.data];
                setProduct(temp);
              } catch (error){
                console.log("가져오기 실패", error)
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