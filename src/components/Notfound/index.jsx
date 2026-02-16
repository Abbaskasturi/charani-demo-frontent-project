import './index.css'; 
import {Link} from 'react-router-dom'
const Notfound = () => {
    return(
        <div className='not-found-container'>
            <h1 className='oops-heading'>Oops!</h1>
            <p className='paragraph-401'>401 This page is not found</p>
            <p className='paragraph-401-2'>this page is not available now or its not valid page</p>
            <Link to='/landingpage'>
                <button className='not-found-btn'>
                    Go To Landingpage
                </button>
            </Link>
        </div>
    )
}

export default Notfound; 