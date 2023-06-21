import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import "bootstrap/dist/css/bootstrap.min.css"
import { useSelector, useDispatch } from 'react-redux'
import Pagination from '../../components/Pagination/Pagination.jsx'
import { getWines } from '../../Redux/Actions/actionsIndex'
import axios from "axios"
import { Button, Modal, Card, Form, Image} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Wines() {
    const dispatch = useDispatch()
    const wines = useSelector(state => state.wines.sort((a, b) => a.id - b.id));
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(11)
    const [modalAbierto, setModalAbierto] = useState(false);
    const [producto, setProducto] = useState({})
    const [errores, setErrores] = useState({
        name: '',
        winery: '',
        origin: '',
        category: '',
        stock: '',
        price: '',
    });
    const [selectedImage, setSelectedImage] = useState(null);

    const maxPage = Math.ceil(wines.length / perPage)

  

  const handleImageUpload = async (event) => {
    try {
      const formData = new FormData();
      formData.append('image', event.target.files[0]);

      const response = await axios.post(`https://api.imgbb.com/1/upload?key=a4af5b7bd04c5237eca393c653cba89d`, 
        // key: imgBBUploader, // Reemplaza con API key
        formData,
      );
      // Obtén la URL de la imagen cargada
      const imageURL = response.data.data.display_url;
      // setImageUrl(imageURL);
      // Haz algo con la respuesta, como mostrar el enlace a la imagen cargada
      setSelectedImage(imageURL)
      console.log(imageURL);
    } catch (error) {
      console.error(error);
    }
  };




    function sliceWines() {
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        return wines.slice(startIndex, endIndex);
    }

    function bannedWine(id) {
        axios.patch(`/wines`, { id })
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
                dispatch(getWines());
                setPage(1)
            })
            .catch(error => {
                console.log(error)
            });
    }

    const modalHandler = (wines) => {
        setModalAbierto(true);
        setProducto(wines)
    };

    const saveChanges = () => {
        if (Object.values(errores).some(valor => valor !== '')) {
            return;
        }

        

        const changes = {
            id: producto.id,
            name: document.getElementById('nameWine').value ? document.getElementById('nameWine').value : null,
            winery: document.getElementById('wineryWine').value ? document.getElementById('wineryWine').value : null,
            origin: document.getElementById('originWine').value ? document.getElementById('originWine').value : null,
            detail: document.getElementById('detailWine').value ? document.getElementById('detailWine').value : null,
            image: selectedImage ? selectedImage : null,
            category: document.getElementById('categoryWine').value ? document.getElementById('categoryWine').value : null,
            stock: document.getElementById('stockWine').value ? document.getElementById('stockWine').value : null,
            price: document.getElementById('priceWine').value ? document.getElementById('priceWine').value : null,

        }

        axios.put("/wines", changes)
            .then(res => {
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
                dispatch(getWines())
                setPage(1)
                cerrarModal()
            })
            .catch(error => {
                console.log(error)
            })

    }

    const validarInputs = () => {
        const errores = {}
        const name = document.getElementById('nameWine').value;
        const winery = document.getElementById('wineryWine').value;
        const origin = document.getElementById('originWine').value;
        const category = document.getElementById('categoryWine').value;
        const stock = document.getElementById('stockWine').value;
        const price = document.getElementById('priceWine').value;
        // const image = document.getElementById('imageWine').value;

        // if(image === "") errores.image = ""
        // if(image.length > 0 && /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(image)) errores.image = ""
        // if(image.length > 0 && !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(image)) errores.image = "The link must be an image"


        if(name === "") errores.name = ""
        if(name.length && name.length < 3 ) errores.name = "The name must have at least 3 characters"
        if(name.length && name.length > 60 ) errores.name = "The name must not exceed 60 characters"
        if(name.length >= 3 && name.length <= 60) errores.name = ""
        
        if(winery === "") errores.winery = ""
        if(winery.length && winery.length < 3 ) errores.winery = "The winery must have at least 3 characters"
        if(winery.length && winery.length > 60 ) errores.winery = "The winery must not exceed 60 characters"
        if(winery.length >= 3 && winery.length <= 60) errores.winery = ""


        if(origin === "") errores.origin = ""
        if(origin.length && origin.length < 3 ) errores.origin = "The origin must have at least 3 characters"
        if(origin.length && origin.length > 30 ) errores.origin = "The name must not exceed 30 characters"
        if(origin.length >= 3 && origin.length <= 60) errores.origin = ""


        if(category === "") errores.category = ""
        if(category.length && category.length < 3 ) errores.category = "The name must have at least 3 characters"
        if(category.length && category.length > 30 ) errores.category = "The name must not exceed 30 characters"
        if(category.length >= 3 && category.length <= 60) errores.category = ""


        if(stock >= 0) errores.stock = ""
        if(stock < 0) errores.stock = "The stock cannot be a negative number"
    
        if(price >= 0) errores.price = ""
        if(price < 0) errores.price = "The price cannot be a negative number or zero"

        setErrores(errores)
        return true;
    };



    const cerrarModal = () => {
        setModalAbierto(false);
    };


    useEffect(() => {
        dispatch(getWines());
    }, [dispatch]);

    useEffect(() => {
        setPage(1);
        setPerPage(11)
    }, [wines])

    return (
        <div className='d-flex'>
             <ToastContainer />
            <div className='w-auto'>
                <Sidebar />
            </div>
            <div className='col bg-light'>
                <div className='p-5 bg-white rounded p-4'>
                    <table className='table caption-top'>
                        <caption className='text-black fs-4'>Wines</caption>
                        <thead>
                            <tr>
                                <th scope='col'>Id</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Category</th>
                                <th scope='col'>Stock</th>
                                <th scope='col'>Price</th>
                                <th scope='col'>Visible</th>
                                <th scope='col'>Edit</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                sliceWines().map(wine => {
                                    return (
                                        <tr key={wine.id}>
                                            <th scope='row' className="align-middle">{wine.id}</th>
                                            <td className="align-middle">{wine.name}</td>
                                            <td className="align-middle">{wine.category}</td>
                                            <td className="align-middle">{wine.stock}</td>
                                            <td className="align-middle">{`$${wine.price}`}</td>
                                            <td className="align-middle"><button onClick={() => bannedWine(wine.id)} type="button" className="btn btn-outline-secondary btn-sm">{wine.banned ? <i className="bi bi-eye-slash-fill fs-6"></i> : <i className="bi bi-eye fs-6"></i>}</button></td>
                                            <td className="align-middle"> <Button variant="outline-secondary" size="sm" onClick={() => modalHandler(wine)}  ><i className="bi bi-pencil-square fs-6"></i></Button></td>


                                        </tr>
                                    )
                                })
                            }

                        </tbody>

                    </table>
                    <Modal show={modalAbierto} onHide={cerrarModal} >
                        <Modal.Header>
                            <Modal.Title>Edit</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Card>
                                <Card.Body>
                                    <Form>
                                        <Form.Group controlId="imageWine">
                                            <div className='d-flex justify-content-center align-items-center'> <Image src={producto.image} style={{ maxWidth: '300px', maxHeight: '200px' }} fluid /></div>
                                            <Form.Control type="file"  accept="image/*" onChange={handleImageUpload}  />
                                    
                                        </Form.Group>

                                        <Form.Group controlId="nameWine">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder={producto.name} onChange={validarInputs} isInvalid={errores.name !== ''} />
                                            <Form.Control.Feedback type="invalid">
                                                {errores.name}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group controlId="wineryWine">
                                            <Form.Label>Winery</Form.Label>
                                            <Form.Control type="text" placeholder={producto.winery} onChange={validarInputs} isInvalid={errores.winery !== ''} />
                                            <Form.Control.Feedback type="invalid">
                                                {errores.winery}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group controlId="originWine">
                                            <Form.Label>Origin</Form.Label>
                                            <Form.Control type="text" placeholder={producto.origin} onChange={validarInputs} isInvalid={errores.origin !== ''} />
                                            <Form.Control.Feedback type="invalid">
                                                {errores.origin}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group controlId="categoryWine">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Control type="text" placeholder={producto.category} onChange={validarInputs} isInvalid={errores.category !== ''} />
                                            <Form.Control.Feedback type="invalid">
                                                {errores.category}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group controlId="stockWine">
                                            <Form.Label>Stock</Form.Label>
                                            <Form.Control type="number" placeholder={producto.stock}  onChange={validarInputs} isInvalid={errores.stock !== ''} />
                                            <Form.Control.Feedback type="invalid">
                                                {errores.stock}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group controlId="priceWine">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control type="number" placeholder={producto.price}  onChange={validarInputs} isInvalid={errores.price !== ''} />
                                            <Form.Control.Feedback type="invalid">
                                                {errores.price}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group controlId="detailWine">
                                            <Form.Label>Descripción</Form.Label>
                                            <Form.Control as="textarea" placeholder={producto.detail} />
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={cerrarModal}>Cerrar</Button>
                            <Button variant="primary" onClick={saveChanges} >Guardar Cambios</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <Pagination page={page} setPage={setPage} maxPage={maxPage} />

            </div>
        </div>
    )
}

export default Wines