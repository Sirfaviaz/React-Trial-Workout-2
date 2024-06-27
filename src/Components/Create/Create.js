import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../store/AuthContext';
import { FirebaseContext } from '../../store/FirebaseContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore'; 
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { db, storage } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!user) {
      setError('You must be logged in to create a post.');
      return;
    }

    if (!name || !category || !price || !image) {
      setError('Please fill all fields and select an image.');
      return;
    }
    setLoading(true);
    setError('');
  
    try {
      const imageRef = ref(storage, `/images/${image.name}`);
      const uploadTask = await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(uploadTask.ref);
  
      await addDoc(collection(db, 'products'), {
        name,
        category,
        price,
        imageUrl: downloadURL,
        userId: user.uid,
        createdAt: new Date().toISOString()
      });
      setLoading(false);
      alert('Post created successfully!');
      navigate('/');
    } catch (err) {
      setLoading(false);
      console.error(err);
      setError(err.message);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      if (selectedImage.type.startsWith('image/')) {
        setImage(selectedImage);
        setError('');
      } else {
        setError('Please select a valid image file (JPEG, PNG, GIF)');
        setImage(null);
      }
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <label htmlFor="name">Name</label>
        <br />
        <input
          className="input"
          type="text"
          id="name"
          name="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <input
          className="input"
          type="text"
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          className="input"
          type="number"
          id="price"
          name="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <br />
        <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''} />
        <br />
        <input onChange={handleImageChange} type="file" />
        <br />
        <button onClick={handleSubmit} className="uploadBtn" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload and Submit'}
        </button>
        {error && <p className="error">{error}</p>}
      </div>
    </Fragment>
  );
};

export default Create;
