import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" >Dashboard</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item border rounded">
                            <Link className="nav-link text-white" aria-current="page" >
                               <i className='bi bi-search'></i> Search
                                </Link>
                        </li>
                        <li className="nav-item mx-2 rounded border">
                            <Link className="nav-link text-white" aria-current="page">Account</Link>
                        </li>
                        <li className="nav-item border rounded">
                            <Link className="nav-link text-white" aria-current="page">Logout</Link>
                        </li> 
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar