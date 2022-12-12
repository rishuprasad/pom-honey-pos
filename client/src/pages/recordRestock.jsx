import React from 'react';
import {useNavigate} from "react-router-dom"
import Button from '../components/Button'
import RecordRestock from '../components/RecordRestock';
  
const RecordRestockPage = () => {
  const navigate = useNavigate();
  
  return (
  <>
     <RecordRestock />
     <Button onClick={()=>navigate(-1)}>Go Back Home</Button>
  </>
  )
};
  
export default RecordRestockPage;