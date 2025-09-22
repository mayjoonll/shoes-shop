import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

function UserProvider({children}){
  // 유저 정보를 담는 스테이트 선언
  const [loginUser, setLoginUser] = useState(null);
  useEffect(()=>{
    axios
      .get("https://zzzmini.github.io/js/userdata.json")
      .then((res)=>setLoginUser(res.data))
      .catch((error)=> console.log("Error : ", error))
  },[])

  return(
    <UserContext.Provider value={{loginUser, setLoginUser}}>
      {children}
    </UserContext.Provider>
  )
}
export default UserProvider;