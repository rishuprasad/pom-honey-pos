import React from 'react';
import {useNavigate} from "react-router-dom"
import Button from '../components/Button'
import RestockReport from '../components/RestockReport';

  
const RestockReportPage = () => {
  const navigate = useNavigate();
  
  return (
  <>
    <RestockReport />
     <Button onClick={()=>navigate(-1)}>Go Back Home</Button>
  </>
  )
};
  
export default RestockReportPage;