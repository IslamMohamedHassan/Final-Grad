import React, { useContext, useEffect, useRef, useState } from 'react';
import { Spinner, Table, form, button, Col, Row } from 'react-bootstrap';
// import { ApiContext } from "../../context/API-Context";
import { ajax } from '../../libCustomAjax_v1';

import { constants } from '../../constants';

const URL = constants.API_HOST; 

const productUrl = URL+"/api/product"


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

 const createProduct = async (Product,file) => {
   file = (file.value)? file:null
   const response = await ajax(productUrl,"post",Product,file);
   
   const newProduct = await response.json();
   
   setProductData((productData) => [...productData, newProduct]);
   setProductUpdated(true)
 };

 const updateProductData = async (id, updatedPro,file) => {
   file = (file.value)? file:null
   const response = await ajax(`${productUrl}/${id}`,"post", updatedPro,file);
   
   const updatedProduct = await response.json();
   
   const updatedProductData = productData.map((product) => (product.id === id ? updatedProduct : product));
   setProductData(updatedProductData)
   setProductUpdated(true)
 };

 const deleteProduct = async (id) => {
   await ajax(`${productUrl}/${id}`,"delete");
   setProductData(productData.filter((product) => product.id !== id));
   setProductUpdated(true)
 };
 useEffect(() => {
    fetchProductData();
}, [])
useEffect(() => {

 if(productUpdated){
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
// user_id: null,
});

const [editProduct, setEditProduct] = useState({
id: '',
name: '',
description: '',
price: '',
approval: '',
category: '',
user_id: null,
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
    const file =
    fileInputRef.current !== null ? fileInputRef.current : undefined;
event.preventDefault();
await createProduct(newProduct,file);
setNewProduct({
name: '',
description: '',
price: '',
approval: '',
category: '',
// file: null,
// user_id: null,
});
setShowAddForm(false);
setIsLoading(false);
} 

const handleEditProduct = async (event) => {    
    event.preventDefault();

    const file = fileInputRef.current !== null ? fileInputRef.current : undefined;

await updateProductData(editProduct.id, editProduct,file);
setEditProduct({
id: '',
name: '',
description: '',
price: '',
approval: '',
category: '',
user_id: null,
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
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<button onClick={() => setShowAddForm(true)}>Add</button>
{showAddForm && (
<form onSubmit={handleAddProduct}>
<dev>
<label>Name</label>
<input type="text" name="name" value={newProduct.name} onChange={handleInputChange} />
</dev>
<dev>
<label>Description</label>
<input type="text" name="description" value={newProduct.description} onChange={handleInputChange} />
</dev>
<dev>
<label>Price</label>
<input type="number" name="price" value={newProduct.price} onChange={handleInputChange} />
</dev>
<dev>
<label>Approval</label>
<select as="select" name="approval" value={newProduct.approval} onChange={handleInputChange}>
<option value="">-- Select Approval --</option>
<option value="pending">Pending</option>
<option value="approved">Approved</option>
<option value="rejected">Rejected</option>
</select>
</dev>
<dev>
<label>Category</label>
<select as="select" name="category" value={newProduct.category} onChange={handleInputChange}>
<option value="">-- Select Category --</option>
<option value="food">Food</option>
<option value="toys">Toys</option>
<option value="accessories">Accessories</option>
<option value="beds">Beds</option>
<option value="grooming">Grooming</option>
</select>
</dev>
<dev>
<label>Image</label>
<input type="file" name="file"  ref={fileInputRef}/>
</dev>
<button variant="primary" type="submit">
Submit
</button>
</form>
)}
{isLoading ? (
<Spinner animation="border" />
) : (
<Table striped bordered hover>
<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Description</th>
<th>Price</th>
<th>Approval</th>
<th>Category</th>
<th>Image</th>
<th>Add</th>
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
<img src={product.image} alt="product" />
</td>
<td>
<button variant="danger" onClick={() => handleDeleteProduct(product.id)}>
Delete
</button>
</td>
<td>
<button variant="warning" onClick={() => { setEditProduct(product);
     setShowEditForm(true);}}>Update</button>
{/* <button onClick={() => setShowAddForm(true)}>Add</button> */}

</td>
</tr>
))}
</tbody>
</Table>
)}
{showEditForm && (
<form onSubmit={handleEditProduct}>
<dev>
            <label>Name</label>
            <input type="text" name="name" value={editProduct.name} onChange={handleInputChange} />
          </dev>
          <dev>
            <label>Description</label>
            <input type="text" name="description" value={editProduct.description} onChange={handleInputChange} />
          </dev>
          <dev>
            <label>Price</label>
            <input type="number" name="price" value={editProduct.price} onChange={handleInputChange} />
          </dev>
          <dev>
            <label>Approval</label>
            <select as="select" name="approval" value={editProduct.approval} onChange={handleInputChange}>
              <option value="">-- Select Approval --</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </dev>
          <dev>
            <label>Category</label>
            <select as="select" name="category" value={editProduct.category} onChange={handleInputChange}>
              <option value="">-- Select Category --</option>
              <option value="food">Food</option>
              <option value="toys">Toys</option>
              <option value="accessories">Accessories</option>
              <option value="beds">Beds</option>
              <option value="grooming">Grooming</option>
            </select>
          </dev>
          <dev>
            <label>Image</label>
            {/* <input type="file" name="file" ref={fileInputRef}/> */}
          </dev>
          <button variant="primary" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};


export default ProductsTable;
