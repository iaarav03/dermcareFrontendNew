import { useEffect, useState } from "react";
import axios from "axios"; 

export default function useFetch(query) {
  const [getdata, setData] = useState({
    isloading: false,
    status: null,
    apidata: undefined,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isloading: true }));
        const { data, status } = await axios.get(`http://localhost:5000/user/${query}`);

        // console.log(data.username);
        if (status === 200) {
          setData((prev) => ({
            ...prev,
            isloading: false,
            apidata: data,
            status: status,
          }));
        }
      } catch (error) {
        setData((prev) => ({ ...prev, isloading: false, serverError: error }));
      }
    };

    fetchData();
  }, [query]);
  return [getdata,setData]
}
