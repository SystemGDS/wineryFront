/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import axios from 'axios';
// const imgBBUploader = process.env.REACT_APP_IMGBB_KEY
const ImgBBImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await axios.post(`https://api.imgbb.com/1/upload?key=a4af5b7bd04c5237eca393c653cba89d`, 
        // key: imgBBUploader, // Reemplaza con API key
        formData,
      );
      // Obtén la URL de la imagen cargada
      const imageURL = response.data.data.display_url;
      // setImageUrl(imageURL);
      // Haz algo con la respuesta, como mostrar el enlace a la imagen cargada
      console.log(imageURL);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {/* <img src={imageURL} alt="Imagen cargada" /> */}
      <button onClick={handleImageUpload}>Cargar imagen</button>
      
       
    </div>
  );
};

export default ImgBBImageUploader;