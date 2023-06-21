import React from 'react'
import "./style.css"
import {Link} from "react-router-dom"
import { useState } from 'react'
import "bootstrap-icons/font/bootstrap-icons.css"


function Sidebar() {
    const [active, setActive] = useState("")

  return (
    <div className='sidebar d-flex justify-content-between text-white flex-column bg-dark ps-3 pe-4 vh-100'>
        <div>
            <hr className='text-secondary mt-2'/>
            <ul className='nav nav-pills flex-column mt-3'>
                {/* <li className={active === 1? 'active nav-item p-2 m1' : "nav-item p-2 m1"} onClick={e => setActive(1)}>
                    <Link to="/admin" className='p-1 text-decoration-none text-white'>
                        <i className='bi bi-speedometer2 me-3 fs-5'></i>
                        <span className='fs-4'><strong>Dashboard</strong></span>
                    </Link>
                </li> */}
                <li className={active === 2? 'active nav-item p-2 m1' : "nav-item p-2 m1"} onClick={e => setActive(2)}>
                    <Link to="/admin/users" className='p-1 text-decoration-none text-white'>
                        <i className='bi bi-people me-3 fs-5'></i>
                        <span className='fs-4'>Users</span>
                    </Link>
                </li>
                <li className={active === 3? 'active nav-item p-2 m1' : "nav-item p-2 m1"} onClick={e => setActive(3)}>
                    <Link to="/admin/wines" className='p-1 text-decoration-none text-white'>
                        <i className='bi bi-bag me-3 fs-5'></i>
                        <span className='fs-4'>Wines</span>
                    </Link>
                </li>
                <li className={active === 4? 'active nav-item p-2 m1' : "nav-item p-2 m1"} onClick={e => setActive(4)}>
                    <Link to="/admin/payments" className='p-1 text-decoration-none text-white'>
                        <i className='bi bi-currency-dollar me-3 fs-5'></i>
                        <span className='fs-4'>Payments</span>
                    </Link>
                </li>
                <li className={active === 5? 'active nav-item p-2 m1' : "nav-item p-2 m1"} onClick={e => setActive(5)}>
                    <Link to="/admin/newwine" className='p-1 text-decoration-none text-white'>
                        <i className='bi bi-plus-square me-3 fs-5'></i>
                        <span className='fs-4'>New wine</span>
                    </Link>
                </li>
            </ul>
        </div>
        <div>
            <hr className='text-white'/>
            <div className='nav-item p-2'>
                    <Link className='p-1 text-decoration-none text-white'>
                        <i className='bi bi-person-circle me-3 fs-4'></i>
                        <span className='fs-4'>Perfil</span>
                    </Link>
                </div>
        </div>
    </div>
  )
}

export default Sidebar