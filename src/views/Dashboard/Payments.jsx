/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Payments() {
  //const orders = useSelector(state => state.allOrders.sort((a, b) => a.userId - b.userId));
  const [orders, setOrders] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [show, setShow] = useState(false);
  const [initialValue, setInitialValue] = useState();
  const [orderId, setOrderId] = useState();
  const [currentOrder, setCurrentOrder] = useState()
  const [showOrder, setShowOrder] = useState()


  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleCloseOrder = () => {
    setShowOrder(false);
  };
  const handleShowOrder = () => {
    setShowOrder(true);
  };



  const saveChanges = () => {
    axios
      .put("/users/statusorder", { orderId: orderId, status: selectedOption })
      .then((res) => {
        console.log(res.data.message);
        document.getElementById("defaultValue").value = selectedOption;
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
      });
    handleClose();
    getOrders();

    //agregar getorders a dispatch
  };

  const statusOrder = [
    "In process",
    "Paid",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const getOrders = async () => {
    try {
      const response = await axios.get("/users/orders");
      setOrders(response.data);
    } catch (error) {
      console.log("Order not found");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleSelectChange = (event, order) => {
    setInitialValue(order.statusDetail);
    setOrderId(order.id);
    setSelectedOption(event.target.value);
    handleShow();
  };


  const viewOrder = (order) => {
    handleShowOrder()
    setCurrentOrder(order)
  }

  return (
    <div className="d-flex">
      <ToastContainer />
      <div className="w-auto">
        <Sidebar />
      </div>

      <div className='col bg-light'>
        <div className='p-5 bg-light bg-white rounded p-4'>
          <table className='table caption-top '>
            <caption className='text-black fs-4'>Payments</caption>

            <thead>
              <tr>
                <th scope="col">Id order</th>
                <th scope="col">userId</th>
                <th scope="col">Date order</th>
                <th scope="col">Total</th>
                <th scope="col">Order status</th>
                <th scope="col">Order detail</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order.id}>
                    <th scope="row" className="align-middle">
                      {order.id}
                    </th>
                    <td className="align-middle">{order.userId}</td>
                    <td className="align-middle">{order.datePayment}</td>
                    <td className="align-middle">{`$${order.total}`}</td>
                    <td className="align-middle">
                      <Form.Select
                        as="select"
                        size="sm"
                        style={{ maxWidth: 300 }}
                        id="defaultValue"
                        value={order.statusDetail}
                        onChange={(event) => handleSelectChange(event, order)}
                      >
                        {statusOrder.map((sta) => {
                          return (
                            <option key={sta} value={sta}>
                              {sta}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </td>
                    <td className="align-middle">
                      <Button variant="outline-secondary" size="sm"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => viewOrder(order)}
                      >
                        <i className="bi bi-eye-fill fs-5"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm change</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to proceed with the change? Confirm to continue.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={saveChanges}>
                Save Change
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showOrder} onHide={handleCloseOrder}>
            <Modal.Body >
              <div>
              <h5>Order Details</h5>
              <p>Order id: {currentOrder.id}</p>
              <p>User ID: {currentOrder.userId}</p>
              <div className="row text-align">
                {
                  currentOrder.items &&
                  currentOrder.items.map((wine) => {
                     return (
                      <div className="col mb-3 d-flex justify-content-center">
                          <p>Wine id: {wine.id}</p>
                          <img style={{maxWidth: 100 , maxHeight: 200}} src={wine.picture_url} alt={wine.id} />
                          <p className="fs-5">{wine.title}</p>
                          <p className="fs-6">{wine.quantity}</p>
                            <p className="fs-6">{wine.price}</p>
                      </div>
                    )
                  })
                }
              </div>
              <p>Date of Purchase: {currentOrder.datePayment}</p>
              <p>Total: {currentOrder.total}</p>
              </div>
            </Modal.Body>
          </Modal>

        </div>
      </div>
    </div>
  );
}