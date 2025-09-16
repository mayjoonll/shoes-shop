function Product({shoes}){
  const image = `images/shoes${shoes.id+1}.jpg`
  return (
    <>
    <img src={image} width="80%"/>
          <h4>{shoes.title}</h4>
          <p>{shoes.content}</p>
    </>
  );
}
export default Product;