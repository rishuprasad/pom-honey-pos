import React,{createContext,useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';

// the context used on pages
const Context = createContext();
// take the context for customizing
export const useCustomContext = () => useContext(Context)

// create different colors and initial color and size
const Provider = ({children}) => {
    const colorList = ['black','blue','red','yellow','green','orange'];
    const [size,setSize] = useState(14)
    const [color,setColor] = useState('black')
    const [user,setUser] = useState({
        firstName: '',
        lastName: ''
    })

    // change the value according to different variables
    const handleChange = (value,name) => {
        setUser(prev => ({...prev,[name]: value}))
    } 

    // change font color and size, use in all pages
    return (
        <Context.Provider value={{
            user,
            handleChange,
            setColor,
            color,
            colorList,
            setSize,
            size
        }}>{children}</Context.Provider>
    )
}

export default Provider