import './home.css'
import React, { useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom'
// import { useLocation } from 'react-router-dom'
import { NavLink } from "react-router-dom";

function Home() {
    // const history = useHistory();
    // const location = useLocation();
    const [display, setDisplay] = useState(true)
    // useEffect(() => {
    //     if (location.pathname === '/dashboard' || location.pathname === '/affiliate-dashboard') {
    //         setDisplay(true)
    //     }
    //     if (location.pathname === "/sign-in" || location.pathname === "/sign-up" || location.pathname === "/reset-password" || location.pathname === '/change-password' || location.pathname === '/' || location.pathname === '/admin' || location.pathname === '/admin-signup' || location.pathname === '/verify-otp' || location.pathname === '/online-booking' || location.pathname === '/blog' || location.pathname === '/privacy-term' ) {
    //         setDisplay(false)
    //     }
    // }, [history, location.pathname])

    return (
        <>
            {
                display ?
                    <div className='admin-panel'>
                        <div className='admin-cont'>
                            <div className='container'>
                                <div className='row'><div className='col1'>
                                        <h1>Log in As</h1>
                                    </div></div>
                                    <div className='row'><div className='col2'>
                                   
                                    <NavLink className="navbar-brand" to="/admin">
                                    Admin</NavLink>
                                    </div></div>
                                    <div className='row'><div className='col3'>

                                    <NavLink className="navbar-brand" to="/admin">
                                    Tester </NavLink>                                    </div></div>
                                    
                                    <div className='row'><div className='col4'>
                                    <NavLink className="navbar-brand" to="/admin">
                                        Farmer</NavLink>                                     </div></div>
                                    <div className='row'><div className='col5'>
                                    <NavLink className="navbar-brand" to="/admin">
                                        Importer</NavLink></div></div>
                                    <div className='row'><div className='col6'>
                                    <NavLink className="navbar-brand" to="/admin">
                                        Exporter</NavLink>                      </div></div>
                                    <div className='row'><div className='col7'>
                                    <NavLink className="navbar-brand" to="/admin">
                                    Processor</NavLink> </div></div>
                            </div>
                        </div>
                    </div> : ''
            }
        </>
    )
}

export default Home