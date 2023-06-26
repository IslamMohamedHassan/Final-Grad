import React, { useContext, useEffect, useRef, useState } from 'react';
import { Spinner, Table, form, Button, Col, Row, Form } from 'react-bootstrap';
// import { ApiContext } from "../../context/API-Context";
import { ajax } from '../../libCustomAjax_v1';
import "./Admin.css"
import { constants } from '../../constants';

const URL = constants.API_HOST;

const productUrl = URL + "/api/product"


const ProductsTable = () => {

  // site states product
  const [productData, setProductData] = useState(null);
  const [productUpdated, setProductUpdated] = useState(false)
  const fileInputRef = useRef(null);



  // CRUD operations for products
  const fetchProductData = async () => {
    const response = await ajax(productUrl);
    const data = await response.json();
    setProductData(data.data)
  }

  const createProduct = async (Product, file) => {
    file = (file.value) ? file : null
    const response = await ajax(productUrl, "post", Product, file);
    const newProduct = await response.json();
    setProductData((productData) => [...productData, newProduct]);
    setProductUpdated(true)
  };

  const updateProductData = async (id, updatedPro, file) => {
    file = (file.value) ? file : null
    const response = await ajax(`${productUrl}/${id}/update`, "post", updatedPro, file);
    const updatedProduct = await response.json();
    const updatedProductData = productData.map((product) => (product.id === id ? updatedProduct : product));
    setProductData(updatedProductData)
    setProductUpdated(true)
  };

  const deleteProduct = async (id) => {
    await ajax(`${productUrl}/${id}`, "delete");
    setProductData(productData.filter((product) => product.id !== id));
    setProductUpdated(true)
  };
  useEffect(() => {
    fetchProductData();
  }, [])
  useEffect(() => {

    if (productUpdated) {
      fetchProductData();
      setProductUpdated(false)
    }
  }, [productUpdated])


  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    approval: '',
    category: '',
  });

  const [editProduct, setEditProduct] = useState({
    name: '',
    description: '',
    price: '',
    approval: '',
    category: '',
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
    setEditProduct({ ...editProduct, [name]: value });
  };

  const handleAddProduct = async (event) => {
    const file = fileInputRef.current;
    event.preventDefault();
    await createProduct(newProduct, file);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      approval: '',
      category: '',
    });
    setShowAddForm(false);
    setIsLoading(false);
  }

  const handleEditProduct = async (event) => {
    event.preventDefault();

    const file = fileInputRef.current ? fileInputRef.current : null;
    console.log(file);

    await updateProductData(editProduct.id, editProduct, file);
    console.log(editProduct);
    setEditProduct({
      name: '',
      description: '',
      price: '',
      approval: '',
      category: '',
    });
    setShowEditForm(false);
    setIsLoading(false);
  }


  const handleDeleteProduct = (id) => {
    deleteProduct(id);
  };


  useEffect(() => {
    setIsLoading(true);
  }, [productData]);

  useEffect(() => {
    if (productData) {
      setIsLoading(false);
    }
  }, [productData]);

  return (
      <div>
        <Row className="mb-3">
          <Col>
          <div className='m-3'>

            <Button className="btn btn-success" onClick={() => setShowAddForm(true)}>Add Product</Button>
            </div>
          </Col>
        </Row>
        {showAddForm && (
          <Form onSubmit={handleAddProduct} className="container">
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" name="name" value={newProduct.name} onChange={handleInputChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Description
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" name="description" value={newProduct.description} onChange={handleInputChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Price
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="number" name="price" value={newProduct.price} onChange={handleInputChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Approval
              </Form.Label>
              <Col sm={10}>
                <Form.Select name="approval" value={newProduct.approval} onChange={handleInputChange}>
                  <option value="">-- Select Approval --</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Category
              </Form.Label>
              <Col sm={10}>
                <Form.Select name="category" value={newProduct.category} onChange={handleInputChange}>
                  <option value="">-- Select Category --</option>
                  <option value="food">Food</option>
                  <option value="toys">Toys</option>
                  <option value="accessories">Accessories</option>
                  <option value="beds">Beds</option>
                  <option value="grooming">Grooming</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Image
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="file" name="file" ref={fileInputRef} />
              </Col>
            </Form.Group>
            <button
                type="submit"
                className="btn btn-primary">
                {isLoading ? (
                  <Spinner
                    animation="border"
                    size="sm"
                  />
                ) : (
                  "Submit"
                )}
              </button>

              <button
                type="button"
                className="btn btn-secondary ml-2 m-3"
                onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
            {/* <Button variant="primary" type="submit">
              Submit
            </Button> */}
          </Form>
        )}
        {isLoading ? (
          <Spinner animation="border" />
        ) : (
          <Table striped bordered hover className='admin-table container mb-5'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Approval</th>
                <th>Category</th>
                <th>Image</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {productData &&
                productData.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.approval}</td>
                    <td>{product.category}</td>
                    <td>
                      <img  className='p-Image'  src={`${URL}/${product.image}`} alt="product" />
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>
                        Delete
                      </Button>
                    </td>
                    <td>
                      <Button variant="warning" onClick={() => {
                        setEditProduct(product);
                        setShowEditForm(true);
                      }}>Update</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
        {showEditForm && (
          <Form onSubmit={handleEditProduct}  className="container my-5">
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" name="name" value={editProduct.name} onChange={handleInputChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Description
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" name="description" value={editProduct.description} onChange={handleInputChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Price
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="number" name="price" value={editProduct.price} onChange={handleInputChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Approval
              </Form.Label>
              <Col sm={10}>
                <Form.Select name="approval" value={editProduct.approval} onChange={handleInputChange}>
                  <option value="">-- Select Approval --</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Category
              </Form.Label>
              <Col sm={10}>
                <Form.Select name="category" value={editProduct.category} onChange={handleInputChange}>
                  <option value="">-- Select Category --</option>
                  <option value="food">Food</option>
                  <option value="toys">Toys</option>
                  <option value="accessories">Accessories</option>
                  <option value="beds">Beds</option>
                  <option value="grooming">Grooming</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Image
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="file" name="file" ref={fileInputRef} />
              </Col>
            </Form.Group>
            {/* <Button variant="primary" type="submit">
              Submit
            </Button> */}
                          <button
                type="submit"
                className="btn btn-primary">
                {isLoading ? (
                  <Spinner
                    animation="border"
                    size="sm"
                  />
                ) : (
                  "Submit"
                )}
              </button>
          </Form>
        )}
      </div>
    );
  };
  
  export default ProductsTable;
