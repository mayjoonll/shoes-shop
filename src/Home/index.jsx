import {Container, Row, Col} from 'react-bootstrap';
import Product from '../Product';

function Home({product}){
  return(
    <div>
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
    </div>
  )
}
export default Home;