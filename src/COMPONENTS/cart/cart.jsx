// /** @format */
// import {PayPalScriptProvider,PayPalButtons} from "@paypal/react-paypal-js"
// import React from "react";
// // import { PRODUCTS } from "../../products";
// import { useContext } from "react";
// import { ShopContext } from "../../context/shop-context";
// import { useNavigate } from "react-router-dom";
// import CartItem from "./cart-item";
// const Cart = () => {
//   const { cartItems, getTotalAmount, checkout,productItems } = useContext(ShopContext);
//   const totalAmount = getTotalAmount();
//   const navigate = useNavigate();
//   console.log(cartItems);
//   return (
//     <div className="cart">
//       <div className="shopTitle">
//         <h1>Pets Shop Cart</h1>
//       </div>
//       <div className="cartProduct">
//         {productItems.map((product) => {
//           if (cartItems[product.id] !== 0) {
//             return (
//               <CartItem
//                 key={product.id}
//                 data={{ ...product }}
//               />
//             );
//           } else {
//             return null;
//           }
//         })}
//       </div>
//       <p>subTotal: ${totalAmount}</p>
//       <button onClick={() => navigate("/")}>Continue Shopping</button>
//       <button
//         onClick={() => {
//           checkout();
//           navigate("/");
//         }}>
//         Checkout
//       </button>
//         <PayPalScriptProvider options={{"client-id":"AdhDbKF_Lov12WaVtt1dRbyhS4W3Np2M9SfjGlY5vrs4q8NOwMjG8icMqBxlvvdsOWjTilS-iVYyWdpD"}}>
//             <PayPalButtons
//             createOrder={(data, actions) => {
//                 return actions.order.create({
//                   purchase_units: [
//                     {
//                       amount: {
//                         value: totalAmount,
//                       },
//                     },
//                   ],
//                 });
//               }}
//               onApprove={async (data, actions) => {
//                 const details = await actions.order.capture();
//                 const name = details.payer.name.given_name;
//                 alert("Transaction completed by " + name);
//               }}
//             />
//         </PayPalScriptProvider>
//     </div>
//   );
// };

// export default Cart;

import React, { useContext, useState } from 'react';
import { Table } from 'react-bootstrap';
import { ApiContext } from '../../context/api-context';

 const UserTable = () => {
    const { userData, createData, updateData, deleteData } = useContext(ApiContext);
  
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        type: '',
        phone: '',
        file: ''
    });

    const [editUser, setEditUser] = useState({
        id: '',
        name: '',
        email: '',
        type: '',
        phone: '',
        file: ''
    });

    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewUser({ ...newUser, [name]: value });
        setEditUser({ ...editUser, [name]: value });
    };

    const handleAddUser = (event) => {
        event.preventDefault();
        createData(newUser);
        setNewUser({
            id: '',
            name: '',
            email: '',
            type: '',
            phone: '',
        });
        setShowAddForm(false);
    };

    const handleEditUser = (event) => {
        event.preventDefault();
        updateData(editUser.id, editUser);
        setEditUser({
            id: '',
            name: '',
            email: '',
            type: '',
            phone: '',
            image: ''
        });
        setShowEditForm(false);
    };

    const handleDeleteUser = (id) => {
        deleteData(id);
    };

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
            <button onClick={() => setShowAddForm(true)}>add</button>
            {showAddForm && (
                <form onSubmit={handleAddUser}>

                    <input type="text" name="id" value={newUser.id} onChange={handleInputChange} />
                    <input type="text" name="name" value={newUser.name} onChange={handleInputChange} />
                    <input type="email" name="email" value={newUser.email} onChange={handleInputChange} />
                    <input type="text" name="type" value={newUser.type} onChange={handleInputChange} />
                    <input type="tel" name="phone" value={newUser.phone} onChange={handleInputChange} />
                    <input type="file" name="file" value={newUser.image} onChange={handleInputChange} />
                    <button type="submit">Submit</button>
                </form>
            )}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Phone</th>
                        <th>Image</th>
                        <th>add</th>
                        <th>delete</th>
                        <th>update</th>
                    </tr>
                </thead>
                <tbody>
                    {userData &&
                        userData.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.type}</td>
                                <td>{user.phone}</td>
                                <td><img src={user.image} alt="dsa"/></td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user.id)}>delete</button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setEditUser(user);
                                            setShowEditForm(true);
                                        }}
                                    >
                                        update
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            {showEditForm && (
                <form onSubmit={handleEditUser}>
                    <input type="hidden" name="id" value={editUser.id} onChange={handleInputChange} />
                    <input type="text" name="name" value={editUser.name} onChange={handleInputChange} />
                    <input type="email" name="email" value={editUser.email} onChange={handleInputChange} />
                    <input type="text" name="type" value={editUser.type} onChange={handleInputChange} />
                    <input type="tel" name="phone" value={editUser.phone} onChange={handleInputChange} />
                    <input type="text" name="image" value={editUser.image} onChange={handleInputChange} />
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};
export default UserTable;

