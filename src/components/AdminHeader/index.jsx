import './index.css' 
import {useNavigate} from 'react-router-dom'
import {Link} from "react-router-dom"; 
const AdminHeader = () => {
    const usenavigate = useNavigate(); 
    const onLogout = () => {
        usenavigate('/admin', {replace: true}) 
    }
    return(
        <div className='admin-header-container'>
            <Link to='/addadmin'>
                <button className='admin-header-btn'>
                    Add new admin
                </button>
            </Link>
            <Link to='/bookedstudents'>
                <button className='admin-header-btn'>
                    View councelling 
                </button>
            </Link>
            <button className='admin-header-btn' onClick={onLogout}>
                Logout
            </button>
        </div>
    )
}

export default AdminHeader; 
