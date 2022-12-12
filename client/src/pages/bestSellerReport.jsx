import React from 'react';
import {useNavigate} from "react-router-dom"
import Button from '../components/Button'
import ComboReport from '../components/ComboReport';

  
const BestSellersReportPage = () => {
  const navigate = useNavigate();
  
  return (
  <>
      <ComboReport />
     <Button onClick={()=>navigate(-1)}>Go Back Home</Button>
  </>
  )
};
  
export default BestSellersReportPage;