import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUsers } from '../../Redux/Actions/actionsIndex'

function User() {

  const dispatch = useDispatch()
  const users = useSelector(state => state.allUsers.sort((a, b) => a.id - b.id));

  useEffect(()=> {
    dispatch(getUsers())
  },[dispatch])

  const bannedUser = (email) => {
    axios.put(`/users/ban`, { email })
      .then(response => {
        toast.info(`${response.data.message}`, {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(getUsers())
      })
      .catch(error => {
        console.log(error)
      });
  }

  const adminHandler = (email) => {
    axios.put("/users/isadmin", {email})
    .then(res =>{
      toast.info(`${res.data.message}`, {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(getUsers())
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div className='d-flex'>
      <ToastContainer/>
      <div className='w-auto'>
        <Sidebar />
      </div>
      <div className='col bg-light'>
        <div className='p-5 bg-white rounded p-4'>
          <table className='table caption-top '>
            <caption className='text-black fs-4'>Users</caption>
            <thead>
              <tr>
                <th scope='col'>Id</th>
                <th scope='col'>User name</th>
                <th scope='col'>E-mail</th>
                <th scope='col'>Admin</th>
                <th scope='col'>Banned</th>
                {/* <th scope='col'>Order status</th> */}
              </tr>
            </thead>
            <tbody>
              {
                users.map(user => {
                  return (
                    <tr key={user.id}>
                      <th scope="row" className='align-middle'>{user.id}</th>
                      <td className="align-middle">{user.userName}</td>
                      <td className="align-middle">{user.email}</td>
                      <td className="align-middle"><button onClick={() => adminHandler(user.email)} type="button" className="btn btn-outline-secondary btn-sm">{user.isAdmin ? <i className="bi bi-hand-thumbs-up-fill fs-5"></i> : <i className="bi bi-x-circle-fill fs-5"></i>}</button></td>
                      <td className="align-middle"><button onClick={() => bannedUser(user.email)} type="button" className="btn btn-outline-secondary btn-sm">{user.banned ? <i className="bi bi-person-fill-slash fs-5"></i> : <i className="bi bi-person-check-fill fs-5"></i>}</button></td>
                      {/* <td className="align-middle">{user.orders.at(-1).statusDetail}</td> */}

                    </tr>
                  )
                })
              }
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}

export default User