import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const DiseaseSection = ({ letter, data }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleItem = (itemId) => {
    if (expandedItem === itemId) {
      setExpandedItem(null);
    } else {
      setExpandedItem(itemId);
    }
  };

  return (
    <div className="mb-6 p-4 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 p-2  rounded-lg">
        {letter}
      </h3>
      <div className="space-y-4 mt-4">
        {data.map((item) => (


          
          <div
            key={item.id}
            className={`bg-white p-4 rounded-lg shadow-md hover:bg-gray-200 `}
          >
         
            <div className="text-center mb-4">
              <p className="text-lg font-inter font-bold">{item.id.toUpperCase()}</p>
            </div>
              



      

            <div className="flex flex-row justify-center">
              <div className="md:w-2/4">
                <p className="font-inter ">
                  {" "}
                  {expandedItem === item.id ? item.description.replace(/<p>/g, '') : ""}
 
                </p>
              </div>
              <div className="relative">
                {item.symptoms.length > 0 && (
                  <button
                    className="toggle-button"
                    onClick={() => toggleItem(item.id)}
                  >
                    {expandedItem === item.id ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>
                )}
                {expandedItem === item.id && (
                  <ul className="list-disc pl-4">
                    {item.symptoms.map((namee) => (
                      <li key={namee}>{namee}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function About() {
  const [data, setData] = useState([]);
  const [sData, setsData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const apiUrl = "https://health.triage.ninja/en/patient.json";

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setData(response.data);
        setsData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filteredData = data.filter((item) =>
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setsData(filteredData);
  };

  const resetSearch = () => {
    setSearchTerm("");
    setsData(data);
  };

  const groupedData = sData.reduce((groups, item) => {
    const startingLetter = item.id.charAt(0).toUpperCase();
    if (!groups[startingLetter]) {
      groups[startingLetter] = [];
    }
    groups[startingLetter].push(item);
    return groups;
  }, {});

  const startingLetters = Object.keys(groupedData).sort();

  const scrollToLetter = (letter) => {
    const element = document.getElementById(`section-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  



  return (
    <div>
     
      <div className="mb-4 flex justify-center items-center relative" >
       

          <div className=" h-[70vh] sm:h-[50vh] bg-stone-200 min-w-full text-center ">

                     <div className=" font-josefin-sans text-5xl mt-10 ">Your complete guide to </div>
                     <div className="font-josefin-sans text-5xl mt-2"> skin Health. </div>
                   <div className="mt-6"> <p>Find information from experts on skin conditions, including symptoms,</p> </div>
                     <div> <p>causes, diagnosis, and treatment options.</p> </div>
                     <div className="">
  {Array.from({ length: 26 }, (_, index) => {
    const letter = String.fromCharCode(65 + index);
    return (
      <button
  key={letter}
  className={`${
    letter === 'A'
      ? "bg-custom-class-for-A bg-gradient-to-r from-rose-200 to-teal-200l-100 py-2 px-4 rounded-md mx-1"
      : searchTerm && searchTerm.toUpperCase() === letter
      ? "bg-black hover:bg-gradient-to-r from-cyan-700 to-blue-700 text-gray-800 py-2 px-4 rounded-md mx-1"
      : "bg-stone-200 hover:bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-800 py-2 px-4 rounded-md mx-1"
  }`}
  onClick={() => scrollToLetter(letter)}
>
  {letter}
</button>

    );
  })}
</div>

     <div className="mt-4">
 <input
          type="text"
          placeholder="Search by name..."
          className="border rounded-md py-2 px-3 mr-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      <button
  className="  bg-purple-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none"
  onClick={handleSearch}
>
  Search
</button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 ml-2 rounded-md"
          onClick={resetSearch}
        >
          Reset
          
        </button>



     </div>


          </div>












      </div>
      {error ? (
        <p>Error loading data. Please try again later.</p>
      ) : sData.length > 0 ? (
        <div>
        {startingLetters.map((letter) => (
            <div key={letter} id={`section-${letter}`}>
              <DiseaseSection key={letter} letter={letter} data={groupedData[letter]} />
            </div>
          ))}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default About;
