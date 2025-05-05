import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { detailProducts, updateProduct } from '../actions/productActions';

import axios from 'axios';

const ProductEditPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const { isAdmin: admin } = userInfo;

  const { id } = useParams();

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  const { loading, error, product, hasProduct } = productDetails;

  useEffect(() => {
    // After updating the product
    if (successUpdate) {
      dispatch({ type: 'PRODUCT_UPDATE_RESET' });
      navigate('/admin/productlist', { replace: true });
    }

    if (!userInfo || !admin) {
      navigate('/login');
    }

    if (!hasProduct || product.product._id !== id || successUpdate) {
      dispatch(detailProducts(id));
    } else {
      setName(product.product.name);
      setPrice(product.product.price);
      setImage(product.product.image);
      setBrand(product.product.brand);
      setCategory(product.product.category);
      setCountInStock(product.product.countInStock);
      setDescription(product.product.description);
    }
  }, [dispatch, id, product, hasProduct, navigate, userInfo, admin, successUpdate]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
      _id: id,
      name,
      price,
      image,
      brand,
      category,
      description,
      countInStock,
    }));
  };

  const fileUploadHandler = async (e) => {
    setUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
    
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
      console.log(data)
    } catch (error) {
      setUploading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FormContainer>
          <h1>Edit Product</h1>
          <Form onSubmit={formSubmitHandler} encType="multipart/form-data">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Edit Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="Price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Edit Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="Image">
              <Form.Label>Image</Form.Label>
              
              <Form.Control className='mt-2' onChange={fileUploadHandler}
              type='file' disabled={uploading}>
               

              </Form.Control>
              {uploading && <h3> Uploading... </h3>}
            </Form.Group> {/* Close the "Image" Form.Group */}
            <Form.Group controlId="Brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Edit Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Edit Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Edit Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Edit Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default ProductEditPage;
