import './index.css'; 
const RenderingViews = (props) => {
    const {details} = props;    
    const {name,councellingCountNo,date} = details; 
    return(
        <li className='view-container'>
            <h1 className='booked-name'>Name: {name}</h1>
            <p className='booked-para'>Councelling type: {councellingCountNo}</p>
            <p className='booked-date'>booked date: {date}</p>
        </li>
    )
}

export default RenderingViews; 