import Cookies from 'js-cookie'; 
import { Navigate } from 'react-router-dom'; 
const Protected = ({children}) => {
    const jwt_token = Cookies.get("jwt_token"); 
    if(!jwt_token){
        return <Navigate to='/landingpage'/>; 
    }
    return children; 
}

export default Protected; 