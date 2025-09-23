import { useNavigate } from "react-router-dom";

function Product({shoes}) {
  const image = `/images/shoes${shoes.id + 1}.jpg`
  const navigate = useNavigate();

  let handleClick = () => {
    // 선택된 ID를 localStorage에 저장
    // 기존 로컬스토리지에 최근본 정보 recent 가 존재하는지 확인
    let getRecentData = localStorage.getItem("recent")
    let saveData = [];

    if(! getRecentData){
      // 로컬스토리지에 없는 경우, 배열 만들어서 저장
      saveData.unshift(shoes.id);
      // saveData 배열 -> json 타입 변환 -> 스토리지에 저장
      localStorage.setItem("recent", JSON.stringify(saveData));
    } else {
      // recent가 존재하는 경우
      // json -> array object 변환
      saveData = JSON.parse(getRecentData);
      saveData.unshift(shoes.id);
      // 중복을 제거하기 위해 Set으로 변환
      saveData = [... new Set(saveData)]
      localStorage.setItem("recent", JSON.stringify(saveData));
    }

    navigate(`/detail/${shoes.id}`)
  }

  return (
    <>
      <img onClick={()=> handleClick()}
        src={image} width="80%" />
      <h4>{shoes.title}</h4>
      <p>{shoes.content}</p>
    </>
  );
}
export default Product;