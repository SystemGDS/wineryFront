import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function Payments() {
  return (
    <div className='d-flex'>    
    <div className='w-auto'>
     <Sidebar/>
     </div> 
     <div className='col'>
     <Navbar />
        <div className='p-5 bg-light bg-white rounded p-4'>
        <table className='table caption-top '>
          <caption className='text-black fs-4'>Payments</caption>
          <thead>
            <tr>
              <th scope='col'>id</th>
              <th scope='col'>username</th>
              <th scope='col'>email</th>
              <th scope='col'>isAdmin</th>
              <th scope='col'>isBanned</th>
              <th scope='col'>Order status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope='row'>1</th>
              <td className="align-middle">Ale</td>
              <td className="align-middle">ale@ale.com</td>
              <td className="align-middle">true</td>
              <td className="align-middle">false</td>
              <td className="align-middle">Paid</td>
            </tr>
          </tbody>
    
        </table>
        </div>
        </div>
        </div>
      )
}
