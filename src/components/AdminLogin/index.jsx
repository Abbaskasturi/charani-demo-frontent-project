import './index.css'
import {useState} from "react" 
import Cookies from 'js-cookie';  
import {  useNavigate } from 'react-router-dom';
const AdminLogin = () => {
    const [email,setemail] = useState(""); 
    const [password, setpassword] = useState(""); 
    const [adminmsg, setadminmsg] = useState("");   
    const apiUrl = import.meta.env.VITE_API_APP_URL;
    const endpoint = `${apiUrl}/panel/admin`
    const navigate = useNavigate(); 
    const onChangeEmail =(event) => {
        setemail(event.target.value) 
        setadminmsg("")
    }
    const onChangePassword =(event) => {
        setpassword(event.target.value) 
        setadminmsg("")
    }

    const formFunction = async (event) => {
        event.preventDefault(); 
        const obj = {
            email:email, 
            password:password, 
        } 
        const options ={
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(obj),
        }
        const apiCall = await fetch(endpoint, options); 
        const apiData = await apiCall.json(); 
        if(apiCall.ok){
            Cookies.set("jwt_token", apiData.jwtToken, {expires: 1})
            navigate('/adminhome',{replace: true}) 
        }else{
            setadminmsg(apiData.message)
            setemail(""); 
            setpassword("")
        }
    }
    return(
        <div className='admin-container'>
            <div className='admin-card'>
                <form onSubmit={formFunction} className='form-container'>
                    <h1 className='admin-h'>Admin Login</h1>
                    <input type='text' id='email' required placeholder='Email' className='input-admin' value={email} onChange={onChangeEmail} />
                    <input type='password' id='password' required placeholder='Password' className='input-admin' value={password} onChange={onChangePassword}/> 
                    {
                        adminmsg&&<p className='admin-error'>{adminmsg}</p>
                    }
                    <button type='submit' className='admin-btn'>Login</button> 
                </form>
            </div>
        </div>
    )
}

export default AdminLogin ; 