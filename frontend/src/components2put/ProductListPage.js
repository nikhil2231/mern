import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Modal, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { listProducts, deleteProduct , createProduct} from '../actions/productActions';

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState(false);


  const productList = useSelector((state) => state.productList);
  const userLogin = useSelector((state) => state.userLogin);
  
  const deleteProductReducer = useSelector((state) => state.productDeleteReducer);

  const { userInfo } = userLogin;
  const { error, loading, products } = productList;
  const {error:deleteError, loading:productLoading, success} = deleteProductReducer;

  const createProductReducer = useSelector((state) => state.productCreate);
  const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = createProductReducer;


  console.log(products);

  useEffect(() => {

     dispatch({type: 'PRODUCT_CREATE_RESET'})


    if(success) {
        dispatch({type: 'PRODUCT_DELETE_RESET'});
        navigate('/admin/productlist')
    }



    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigate('/login');
    }

    if(successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    }


  }, [dispatch, userInfo, navigate, success, successCreate, createdProduct]);

  function deleteHandler(id) {

  setShowModal(true)
  setProductId(id)

  



  }

  function closeModal() {
    setShowModal(false);
  }

  function deleteUserHandler() {
    dispatch(deleteProduct(productId))

    closeModal();
  }

 function createProductHandler() {
  dispatch(createProduct());
 }


  return (
    <>
    <Row>
      {loadingCreate ? (
        <Loader />
      ) : errorCreate ? (
        <Message variant='danger'>{errorCreate}</Message>
      ) : null}
    </Row>
    <Row>
      <Col xs={6}>
        <h1>Create a Product</h1>
      </Col>
      <Col xs={6} className='d-flex justify-content-end'>
        <Button className='my-3' onClick={createProductHandler}>
          Create A Product <i className='fas fa-plus'></i>
        </Button>
      </Col>
    </Row>
  




    <Container>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='table-responsive'>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>Rs {product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </Link> 
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button> 
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete <b>{productId} </b></Modal.Body>
        {productLoading ? (<p> Deleting Product</p>) : deleteError ? (<p> {deleteError} </p>)  :
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>
            Cancel
          </Button>
          <Button variant='danger' onClick={deleteUserHandler}>
            Delete
          </Button>
        </Modal.Footer>}
      </Modal>
    </Container>
    </>
  );
};

export default ProductListPage;
