import React from 'react';
import {useNavigate} from "react-router-dom"
import Button from '../components/Button'
import RegisterCustomer from '../components/RegisterServer';

  
const RegisterEmployeePage = () => {
  const navigate = useNavigate();
  
  return (
  <>
      <RegisterCustomer />
     <Button onClick={()=>navigate(-1)}>Go Back Home</Button>
  </>
  )
};
  
export default RegisterEmployeePage;