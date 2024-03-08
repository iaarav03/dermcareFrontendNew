import { Navigate } from "react-router-dom";
import { useAuthStore } from "./store";


export const Authorization=({children})=>{

 const token=localStorage.getItem('token');

 if(token)
   
 return <Navigate to={'/'} replace={true}></Navigate>

 return children;


}
export const Passauth=({children})=>{


 const username=useAuthStore(state=>state.auth.username)
 if(!username){
    return <Navigate to={'/'} replace={true}></Navigate>
 }
 return children;



}


export const DoctorAuth=({children})=>{

   const token=localStorage.getItem('token');
  
   if(!token)
     
   return <Navigate to={'/register'} replace={true}></Navigate>
  
   return children;
  
  
  }