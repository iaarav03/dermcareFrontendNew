import toast from "react-hot-toast"


const usernamevalidate=(values)=>{

         const errors=uservalidate({},values);
         return errors
}

const uservalidate=(error={},values)=>{
 
     if(!values.username){
              error.username=toast.error('username required')
     }
     if(values.username.include(" ")){
        error.username=toast.error("invalid username");
     }
      return error;



}
export default usernamevalidate