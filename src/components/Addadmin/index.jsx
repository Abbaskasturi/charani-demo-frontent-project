import './index.css'
import {useState} from "react" 
import Cookies from 'js-cookie';  
import {  useNavigate } from 'react-router-dom';
import AdminHeader from '../AdminHeader';
const Addadmin = () => {
    const [email,setemail] = useState(""); 
    const [password, setpassword] = useState("");   
    const [name, setname] = useState(""); 
    const [addmsg,setaddmsg] = useState(""); 
    const apiUrl = import.meta.env.VITE_API_APP_URL;
    const endpoint = `${apiUrl}/panel/add`
    const navigate = useNavigate(); 
    const onChangeEmail =(event) => {
        setemail(event.target.value) 
        setaddmsg("")
    }
    const onChangePassword =(event) => {
        setpassword(event.target.value) 
        setaddmsg("")
    }
    const onChangeName = (event) => {
        setname(event.target.value)
        setaddmsg("")
    }

    const formFunction = async (event) => {
        event.preventDefault(); 
        const jwtToken = Cookies.get("jwt_token"); 
        const obj = {
            name: name, 
            email:email, 
            password:password, 
        } 
        const options ={
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`
            }, 
            body: JSON.stringify(obj),
        }
        const apiCall = await fetch(endpoint, options); 
        const apiData = await apiCall.json(); 
        if(apiCall.ok){
            setaddmsg(apiData.message)
            setemail(''); 
            setname(""); 
            setpassword("")

        }else{
            setaddmsg(apiData.message)

        }
    }
    return(
        <div>
        <AdminHeader/>
        <div className='admin-container'>
            <div className='admin-card'>
                <form onSubmit={formFunction} className='form-container'>
                    <h1 className='admin-h'>Add New Admin</h1>
                    <input type='text' id='name' required placeholder='Name' className='input-admin' value={name} onChange={onChangeName} />
                    <input type='text' id='email' required placeholder='Email' className='input-admin' value={email} onChange={onChangeEmail} />
                    <input type='password' id='password' required placeholder='Password' className='input-admin' value={password} onChange={onChangePassword}/> 
                    {
                        <p className='add-person-msg'>{addmsg}</p>
                    }
                    <button type='submit' className='admin-btn'>Add</button>  
                </form>
            </div>
        </div>
    </div>
    )
}

export default Addadmin; 