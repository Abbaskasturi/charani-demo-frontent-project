import Header from '../Header';
import Cookies from 'js-cookie';  
import './index.css';
import {useState} from "react"; 
const Home = () => {
    const [bookmsg, setbookmsg] = useState(""); 
    const singleCounselling = async () => {
        const apiUrl = import.meta.env.VITE_API_APP_URL; 
        const endpoint = `${apiUrl}/counselling/student` 
        let councellingCountNo = 1;
         const jwtToken = Cookies.get("jwt_token"); 
        const obj = {
            councellingCountNo: councellingCountNo,
        } 
        const options ={
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}` 
            }, 
            body: JSON.stringify(obj) 
        }
        const apiCall = await fetch(endpoint, options) 
        const apiData = await apiCall.json(); 
        if(apiCall.ok){
            setbookmsg(`${apiData.message} 1 to 1`) 
        }    
    }
    const groupCounselling = async () => {
        const apiUrl = import.meta.env.VITE_API_APP_URL; 
        const endpoint = `${apiUrl}/counselling/student` 
        let councellingCountNo = "Group";
         const jwtToken = Cookies.get("jwt_token"); 
        const obj = {
            councellingCountNo: councellingCountNo,
        } 
        const options ={
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}` 
            }, 
            body: JSON.stringify(obj) 
        }
        const apiCall = await fetch(endpoint, options) 
        const apiData = await apiCall.json(); 
        if(apiCall.ok){
            setbookmsg(`${apiData.message} Group councelling`) 
        }  
    }
    return(
        <div className='home-container'>
            <Header/>
            <div className='content-container'>
                <h1 className='home-heading'>Welcome to the Infycode infinite learning solutions</h1>
                <p className='book-paragraph'>Book your slot for counselling below</p>
            </div>
            <h1 className='booked-heading'>{bookmsg}</h1>
            <div className='both-book-container'>
                <div className='book-container'>
                    <h1 className='one-heading'>1 to 1 Counselling</h1>
                    <button className='book-now-btn' onClick={singleCounselling}>Book Now</button>
                </div>
                 <div className='book-container'>
                    <h1 className='one-heading'>Group Counselling</h1>
                    <button className='book-now-btn' onClick={groupCounselling}>Book Now</button>
                </div>
            </div>
        </div>
    )
}
export default Home; 
