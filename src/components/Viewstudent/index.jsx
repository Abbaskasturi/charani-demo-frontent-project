import './index.css';
import AdminHeader from '../AdminHeader';
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Circles } from "react-loader-spinner";
import RenderingViews from '../RenderingViews';

const apiConstants = {
    initial: "initial",
    progress: "progress",
    fail: "fail",
    success: "success"
};

const Viewstudent = () => {
    const [apistate, setapistate] = useState(apiConstants.initial);
    const [apiData, setapiData] = useState([]);

    const apiUrl = import.meta.env.VITE_API_APP_URL;
    const endpoint = `${apiUrl}/panel/view`;

    const jwtToken = Cookies.get("jwt_token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setapistate(apiConstants.progress);

                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();

                    setapiData(data.councellingData || []);
                    setapistate(apiConstants.success);
                } else {
                    setapistate(apiConstants.fail);
                }
            } catch (error) {
                console.log(error);
                setapistate(apiConstants.fail);
            }
        };

        fetchData();
    }, []);

    const renderingLoader = () => (
        <div className='loader-container'>
            <Circles height="50" width="50" color="black" />
        </div>
    );
    const renderingSuccessUi = () => {
        const allCounselling = apiData.flatMap(
            (student) => student.councelling || []
        );

        return (
            <ul className='rendering-ui-list'>
                {allCounselling.map((eachView) => (
                    <RenderingViews
                        key={eachView.date}  
                        details={eachView}
                    />
                ))}
            </ul>
        );
    };

    const renderingFailureUi = () => (
        <div className="error-message">
            <p>Failed to fetch data</p>
        </div>
    );

    const rendering = () => {
        switch (apistate) {
            case apiConstants.progress:
                return renderingLoader();
            case apiConstants.success:
                return renderingSuccessUi();
            case apiConstants.fail:
                return renderingFailureUi();
            default:
                return null;
        }
    };

    return (
        <div className='view-students-container'>
            <AdminHeader />
            {rendering()}
        </div>
    );
};

export default Viewstudent;