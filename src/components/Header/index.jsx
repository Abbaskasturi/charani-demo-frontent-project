import './index.css'; 
import Cookies from 'js-cookie'; 
import { useNavigate } from 'react-router-dom'; 
const Header = () => {
    const usenavigate = useNavigate();  
    const logout = () => {
        Cookies.remove("jwt_token"); 
        usenavigate('/landingpage', {replace: true}) 
    }
    return(
        <div className='header-container'>
            <img src='https://www.charani.in/assets/img/Charani%20Logo.jpeg' className='logo-img' alt='logo'/>
            <button className='logout-btn' onClick={logout}>Logout</button>
        </div>
    )
}

export default Header; 