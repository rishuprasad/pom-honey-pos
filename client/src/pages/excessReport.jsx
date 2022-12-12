import React from 'react';
import {useNavigate} from "react-router-dom"
import Button from '../components/Button'
import ExcessReport from '../components/ExcessReport';

  
const ExcessReportPage = () => {
  const navigate = useNavigate();
  
  return (
  <>
      <ExcessReport />
     <Button onClick={()=>navigate(-1)}>Go Back Home</Button>
  </>
  )
};
  
export default ExcessReportPage;