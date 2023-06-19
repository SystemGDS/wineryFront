import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import DashboardContainer from './DashboardContainer'

export default function Admin() {
  return (
    <div className='d-flex'>
    <div className='w-auto'>
        <Sidebar/>
    </div>
    <div className='col'>
    <Navbar/>
    <DashboardContainer/>
    </div>
    </div>
  )
}
