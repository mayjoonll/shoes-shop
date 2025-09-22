import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const cartStore = create(immer((set)=>(
  {
    // 카트 초기화
    cartData: [],

    plusCount: (id) => 
      set((state)=>{
        const idx = state.cartData.findIndex((x)=> x.id === id);
        if(idx !== -1) state.cartData[idx].count ++
      }),

    minusCount: (id) => 
      set((state)=>{
        const idx = state.cartData.findIndex((x)=> x.id === id);
        if((idx !== -1) && !(state.cartData[idx].count === 0)) 
          state.cartData[idx].count -= 1
      }),  

    // {
    // id : 0,
    // title : "White and Black",
    // content : "Born in France",
    // price : 120000,
    // count : 1
    // }
    addItem: (item) =>
      set((state) => {
        // 기존에 카트에 담겨있는 상품인지 확인
        const findItem = state.cartData.find(x => x.id === item.id)
        // null, undifind, "" => if(finditem)
        let insertItem = {}
        if(! findItem){
          // count : 1 로 주고  추가
          insertItem = {
            ... item,
            count: 1
          }
          // state에 추가
          state.cartData.push(insertItem)
        } else {
          // 기존에 있는 데이터 => count ++
          findItem.count++
        }
      }),
    // 데이터 추가
    // addItem: (item)=>set((state)=>({
    //   cartData: [...state.cartData, item]
    // })),

    removeItem: (id) => 
      set((state)=>{
        const idx = state.cartData.findIndex((x)=> x.id === id);
        if(idx !== -1) state.cartData.splice(idx, 1)
      }),

    // id 만 받아서 삭제 처리
    // removeItem: (id) => set((state) => ({
    //   cartData: state.cartData.filter((x)=> x.id !== id),
    // })),

    updateItem: (id, updates) =>
      set((state)=>{
        // 수정할 객체 먼저 찾기
        const item = state.cartData.find((x)=> x.id === id)
        if(item){
          // title이 공백이 아닌 경우
          if(updates.title !== ""){
            item.title = updates.name
          }

          // 수량이 숫자로 오면 변경
          if(typeof updates.count === "number" && ! Number.isNaN(updates.count)){
            item.count = updates.count
          }
        }
      }),

    // 전체 데이터 삭제하기
    clearAll: () =>
      set((state)=> {state.cartData = []})

    // id와 form 객체를 받아서 수정
    // updateItem: (id, updates) => set((state) => ({
    //   cartData: state.cartData.map((x)=>
    //     x.id === id? {... x, ...updates} : x)
    // })),
  }
)))
export default cartStore;