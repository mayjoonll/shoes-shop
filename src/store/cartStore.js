import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const cartStore = create(immer((set)=>(
  {
    cartData: [
      {id: 0, name: "White and Black", count: 2},
      {id: 1, name: "Grey Nike", count: 1},
    ],

    addItem: (item) =>
      set((state) => {
        state.cartData.push(item)
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
          // name이 공백이 아닌 경우
          if(updates.name !== ""){
            item.name = updates.name
          }

          // 수량이 숫자로 오면 변경
          if(typeof updates.count === "number" && ! Number.isNaN(updates.count)){
            item.count = updates.count
          }
        }
      })

    // id와 form 객체를 받아서 수정
    // updateItem: (id, updates) => set((state) => ({
    //   cartData: state.cartData.map((x)=>
    //     x.id === id? {... x, ...updates} : x)
    // })),
  }
)))
export default cartStore;