import { create } from "zustand";

const userStore = create((set)=>(
  {
    // state 정의
    userName: '안유진',
    productName: ['나이키', '프로스펙스', '아디다스'],
    productStock: [10, 11, 12],

    // 각종 함수(Delete, Update)
    changeName: ()=> set((state)=>({
      userName: '장원영'
    })),
    
    addProductName: ()=> set((state)=>(
      { productName: [...productName, '고무신']}
    )),
  }
));
export default userStore;