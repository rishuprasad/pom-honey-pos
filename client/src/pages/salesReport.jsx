import React from 'react';
import {useNavigate} from "react-router-dom"
import Button from '../components/Button'
import SalesReport from '../components/SalesReport';
  
const SalesReportPage = () => {
  const navigate = useNavigate();
  
  return (
  <>
     <SalesReport />
     <Button onClick={()=>navigate(-1)}>Go Back Home</Button>
  </>
  )
};
  
export default SalesReportPage;