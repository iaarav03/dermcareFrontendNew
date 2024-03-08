


export const authenticate=async(username)=>{


  try {

     return await axios.post('/authenticate',{username})
    


    
  } catch (error) {
    return {error:"Authenticate failed"}
  }







}



const getuser=async(username)=>{

   try {
           
    const {data}=await axios(`/getuser/${username}`)
    return {data};



   } catch (error) {
    return {error:'get usert failed'}
   }



}