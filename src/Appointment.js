import React,{useState} from 'react';
import myimage from './assets/try2.jpg';
import Testimonials from './Testimonials';
import AddPatient from './Doctor2';

const Appointment = () => {
  const [isAddPatientModalOpen, setAddPatientModalOpen] = useState(false);
  // const [patients, setPatients] = useState([]);
  // const[show,setShow]=useState(false);

  const toggleAddPatientModal = () => {
    setAddPatientModalOpen(!isAddPatientModalOpen);
  };
  return (
    <>
    <div className='relative flex flex-col md:flex-row z-10'>
  <div className=''>
    <img src={myimage} className='max-w-full md:w-[100vw]  md:h-[100vh]' alt='Try Image' />
  </div>
  <div className='  text-container text-center absolute left-0 mt-10 md:mt-40  md:w-1/2 '>
    <h1 className=' text-sm md:text-4xl font-bold pt-10 pr-20'>Skip the travel!</h1>
    <h1 className='text-sm md:text-4xl pt-2  font-bold'>Take Doctor Consultation Online</h1>
    <button  onClick={toggleAddPatientModal} type="button" className='mt-3 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Consult Now</button>
  </div>
  {isAddPatientModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="bg-white shadow-md rounded-lg p-8 w-96 z-10">
                <AddPatient onClose={toggleAddPatientModal} />
              </div>
            </div>
          )}
</div>

<div className='  h-fit bg-[#10838D] text-white flex flex-wrap justify-between items-center p-4'>
  <div className='w-1/2 md:w-auto' >
    <h2 className='text-3xl font-semibold'>20,000+</h2>
    <p className='text-sm'>Users</p>
  </div>
  <div className='w-1/2 md:w-auto'>
    <h2 className='text-3xl font-semibold'>100+</h2>
    <p className='text-sm'>Doctors</p>
  </div>
  <div className='w-1/2 md:w-auto'>
    <h2 className='text-3xl font-semibold'>15</h2>
    <p className='text-sm'>Specialists</p>
  </div>
  <div className='w-1/2 md:w-auto'>
    <h2 className='text-3xl font-semibold'>4.5/5</h2>
    <p className='text-sm'>Rating</p>
  </div>
</div>



<div className='text-center mt-4 flex flex-col items-center'>
  <h1 className='font-semibold ml-4 md:text-3xl'>Benefits of Online Consultation</h1>

  <ul className="mt-5 md:text-2xl space-y-4 text-left text-gray-500 dark:text-gray-400">
    <li className="flex items-center space-x-3 rtl:space-x-reverse">
      <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
      </svg>
      <span>Consult Top Doctors 24x7</span>
    </li>
    <li className="flex items-center space-x-3 rtl:space-x-reverse">
      <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
      </svg>
      <span>Convenient and Easy</span>
    </li>
    <li className="flex items-center space-x-3 rtl:space-x-reverse">
      <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
      </svg>
      <span>100% Safe Consultations </span>
    </li>
    <li className="flex items-center space-x-3 rtl:space-x-reverse">
      <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
      </svg>
      <span>Similar Clinic Experience <span className="font-semibold text-gray-900 dark:text-white"></span></span>
    </li>
    <li className="flex items-center space-x-3 rtl:space-x-reverse">
      <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
      </svg>
      <span>Free Follow-up <span className="font-semibold text-gray-900 dark:text-white"></span></span>
    </li>
  </ul>
</div>

      <Testimonials/>
    </>
  );
};

export default Appointment;
