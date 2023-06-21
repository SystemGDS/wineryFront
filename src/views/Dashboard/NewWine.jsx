import React, { useState } from 'react';
import Sidebar from './Sidebar';
// import Navbar from './Navbar';
import { Button, Card, Form } from 'react-bootstrap';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewWine() {
    const [input, setInput] = useState({
        name: '',
        image:"",
        winery: '',
        origin: '',
        category: '',
        stock: "",
        price: "",
        detail: ''
    });
    const [errores, setErrores] = useState({
        name: '',
        winery: '',
        origin: '',
        category: '',
        stock: "",
        price: "",
        detail: ''
    })

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = async (event) => {
        const imagen = event.target.files[0]
        setInput({...input, image:imagen})

        try {
          const formData = new FormData();
         
          formData.append('image', imagen);
    
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
        validarInputs()
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (Object.values(errores).some(valor => valor !== '')) {
            return;
        }
        const changes = {
            name: document.getElementById('name').value,
            image: selectedImage ? selectedImage : null,
            winery: document.getElementById('winery').value,
            origin: document.getElementById('origin').value,
            detail: document.getElementById('detail').value,
            category: document.getElementById('category').value,
            stock: document.getElementById('stock').value,
            price: document.getElementById('price').value,
        }
        
        axios.post("/wines", changes)
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
        })
        .catch(error => {
            console.log(error)
        })

        setInput({
            name: '',
            image: '',
            winery: '',
            origin: '',
            category: '',
            stock: 0,
            price: 0,
            detail: ''
        });
    };


    const validarInputs = () => {
        const errores = {}

        const name = document.getElementById('name').value;
        const winery = document.getElementById('winery').value;
        const origin = document.getElementById('origin').value;
        const category = document.getElementById('category').value;
        const stock = document.getElementById('stock').value;
        const price = document.getElementById('price').value;
        // const image = document.getElementById('image').value;

        // if (image === "") errores.image = ""
        // if (image.length > 0 && /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(image)) errores.image = ""
        // if (image.length > 0 && !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(image)) errores.image = "The link must be an image"


        if (name === "") errores.name = ""
        if (name.length && name.length < 3) errores.name = "The name must have at least 3 characters"
        if (name.length && name.length > 60) errores.name = "The name must not exceed 60 characters"
        if (name.length >= 3 && name.length <= 60) errores.name = ""

        if (winery === "") errores.winery = ""
        if (winery.length && winery.length < 3) errores.winery = "The winery must have at least 3 characters"
        if (winery.length && winery.length > 60) errores.winery = "The winery must not exceed 60 characters"
        if (winery.length >= 3 && winery.length <= 60) errores.winery = ""


        if (origin === "") errores.origin = ""
        if (origin.length && origin.length < 3) errores.origin = "The origin must have at least 3 characters"
        if (origin.length && origin.length > 30) errores.origin = "The name must not exceed 30 characters"
        if (origin.length >= 3 && origin.length <= 60) errores.origin = ""


        if (category === "") errores.category = ""
        if (category.length && category.length < 3) errores.category = "The name must have at least 3 characters"
        if (category.length && category.length > 30) errores.category = "The name must not exceed 30 characters"
        if (category.length >= 3 && category.length <= 60) errores.category = ""


        if (stock >= 0) errores.stock = ""
        if (stock < 0) errores.stock = "The stock cannot be a negative number"

        if (price >= 0) errores.price = ""
        if (price < 0) errores.price = "The price cannot be a negative number or zero"

        setErrores(errores)

    };


    return (
        <div className='d-flex'>
            <ToastContainer/>
            <div className='w-auto'>
                <Sidebar />
            </div>
            <div className='col bg-light'>
                <div className='p-5 bg-white rounded p-4 mt-4' style={{ maxWidth: '800px', margin: '0 auto ', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>
                    <Card >
                        <Card.Body>
                            <Card.Title>Create new wine</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter wine name'
                                        name='name'
                                        value={input.name}
                                        onChange={handleInputChange}
                                        isInvalid={errores.name !== ''} />
                                    <Form.Control.Feedback type="invalid">
                                        {errores.name}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId='image'>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type='file'
                                        name='image'
                                        accept="image/*" 
                                        onChange={handleImageUpload}/>
                                </Form.Group>

                                <Form.Group controlId='winery'>
                                    <Form.Label>Winery</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter wine winery'
                                        name='winery'
                                        value={input.winery}
                                        onChange={handleInputChange}
                                        isInvalid={errores.winery !== ''} />
                                        <Form.Control.Feedback type="invalid">
                                            {errores.winery}
                                        </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId='origin'>
                                    <Form.Label>Origin</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter wine origin'
                                        name='origin'
                                        value={input.origin}
                                        onChange={handleInputChange}
                                        isInvalid={errores.origin !== ''} />
                                        <Form.Control.Feedback type="invalid">
                                            {errores.origin}
                                        </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId='category'>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter wine category'
                                        name='category'
                                        value={input.category}
                                        onChange={handleInputChange}
                                        isInvalid={errores.category !== ''} />
                                        <Form.Control.Feedback type="invalid">
                                            {errores.category}
                                        </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId='stock'>
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter wine stock'
                                        name='stock'
                                        value={input.stock}
                                        onChange={handleInputChange}
                                        isInvalid={errores.stock !== ''} />
                                    <Form.Control.Feedback type="invalid">
                                        {errores.stock}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId='price'>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter wine price'
                                        name='price'
                                        value={input.price}
                                        onChange={handleInputChange}
                                        isInvalid={errores.price !== ''} />
                                    <Form.Control.Feedback type="invalid">
                                        {errores.price}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId='detail'>
                                    <Form.Label>Detail</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        rows={3}
                                        placeholder='Enter wine detail'
                                        name='detail'
                                        value={input.detail}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <div className='d-flex justify-content-center mt-3'>
                                <Button variant='primary' type='submit'>
                                    Crear
                                </Button>
                                </div>
                                
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default NewWine;
