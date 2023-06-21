/* eslint-disable no-unused-vars */
import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Payments() {
  //const orders = useSelector(state => state.allOrders.sort((a, b) => a.userId - b.userId));
  const [orders, setOrders] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [show, setShow] = useState(false);
  const [initialValue, setInitialValue] = useState();
  const [orderId, setOrderId] = useState()

  const handleClose = () => {

    setShow(false);
  }
  const handleShow = () =>{
     setShow(true)
    }

  const saveChanges = () => {
   axios.put("/users/statusorder", {orderId:orderId, status:selectedOption})
   .then(res =>{
    console.log(res.data.message)
    document.getElementById("defaultValue").value = selectedOption
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
  })
    handleClose()
    getOrders()

  //agregar getorders a dispatch
  }


  const statusOrder = ['In process', 'Paid', 'Shipped', 'Delivered', 'Cancelled']
  
  const getOrders = async () => {
    try {
      const response = await axios.get('/users/orders');
      setOrders(response.data);
    } catch (error) {
      console.log('Order not found');
    }
  };

  useEffect(() => {
    getOrders();
  }, []);


  const handleSelectChange = (event, order) => {
    setInitialValue(order.statusDetail)
    setOrderId(order.id)
    setSelectedOption(event.target.value);
    handleShow()
  };

  

  return (
    <div className='d-flex'>
      <ToastContainer/>
      <div className='w-auto'>
        <Sidebar />
      </div>
      <div className='col bg-light'>
        <div className='p-5 bg-light bg-white rounded p-4'>
          <table className='table caption-top '>
            <caption className='text-black fs-4'>Payments</caption>
            <thead>
              <tr>
                <th scope='col'>Id order</th>
                <th scope='col'>userId</th>
                <th scope='col'>Date order</th>
                <th scope='col'>Total</th>
                <th scope='col'>Order status</th>
                <th scope='col'>Order detail</th>
              </tr>
            </thead>
            <tbody>
              {
                orders.map(order => {
                  return (
                    <tr key={order.id}>
                      <th scope='row' className='align-middle'>{order.id}</th>
                      <td className='align-middle'>{order.userId}</td>
                      <td className='align-middle'>{order.datePayment}</td>
                      <td className='align-middle'>{`$${order.total}`}</td>
                      <td className='align-middle'>
                      <Form.Select as='select' size='sm'style={{maxWidth:300}} id="defaultValue" value={order.statusDetail}  onChange={(event) => handleSelectChange(event, order)}>
                        {
                          statusOrder.map(sta => {
                            return (
                              <option key={sta} value={sta}>{sta}</option>
                            )
                          })
                        }
                        </Form.Select>
                      </td>
                      <td className='align-middle'><button type='button' className='btn btn-outline-secondary btn-sm'><i className="bi bi-eye-fill fs-5"></i></button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm change</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to proceed with the change? Confirm to continue.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Save Change
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
      </div>
    </div>
  )
}
