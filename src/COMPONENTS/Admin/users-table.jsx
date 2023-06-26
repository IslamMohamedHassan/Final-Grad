/** @format */

import React, { useContext, useEffect, useState } from "react";
import {
  Spinner,
  Table,
  Form,
  Button,
  Col,
  Row,
  Label,
  FormGroup,
  Input,
} from "reactstrap";
import { ApiContext } from "../../context/API-Context";
import "./Admin.css";
import { constants } from "../../constants";

const URL = constants.API_HOST;

const UsersTable = () => {
  const { userData, createAdminData, updateAdminData, deleteData } =
    useContext(ApiContext);

  const [newUser, setNewUser] = useState({
    name: "",
    password: "",
    email: "",
    type: "",
    phone: "",
  });

  const [editUser, setEditUser] = useState({
    name: "",
    password: "",
    email: "",
    type: "",
    phone: "",
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
    setEditUser({ ...editUser, [name]: value });
  };

  const handleAddUser = async (event) => {
    event.preventDefault();
    await createAdminData(newUser);
    setNewUser({
      name: "",
      password: "",
      email: "",
      type: "",
      phone: "",
    });
    setShowAddForm(false);
    setIsLoading(false);
  };

  const handleEditUser = async (event) => {
    event.preventDefault();
    await updateAdminData(editUser.id, editUser);
    setEditUser({
      name: "",
      password: "",
      email: "",
      type: "",
      phone: "",
    });
    setShowEditForm(false);
    setIsLoading(false);
  };

  const handleDeleteUser = (id) => {
    deleteData(id);
  };

  useEffect(() => {
    setIsLoading(true);
  }, [userData]);

  useEffect(() => {
    if (userData) {
      setIsLoading(false);
    }
  }, [userData]);

  return (
    <div>
      <div className="m-3">
        <Button
          className="btn btn-success"
          onClick={() => setShowAddForm(true)}>
          Add User
        </Button>
      </div>
      {showAddForm && (
        <Form
          onSubmit={handleAddUser}
          className="container my-4">
          <Row>
            <Col>
              <FormGroup>
                <Label for="name">Name:</Label>
                <Input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password:</Label>
                <Input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="phone">Phone:</Label>
                <Input
                  type="tel"
                  name="phone"
                  value={newUser.phone}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="email">Email:</Label>
                <Input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="type">Type:</Label>

                <select
                className="form-select"
                  name="type"
                  value={newUser.type}
                  onChange={handleInputChange}>
                  <option value="">Select Type</option>
                  <option value="user">user</option>
                  <option value="suppler">Supplier</option>
                  <option value="clinics">Clinics</option>
                  <option value="shelter">Shelter</option>
                </select>
              </FormGroup>
              {/* <FormGroup>
                                <Label for="image">Image:</Label>
                                <Input type="file" name="file" value={newUser.image} onChange={handleInputChange} />
                            </FormGroup> */}
            </Col>
          </Row>
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
        </Form>
      )}
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <Table
          striped
          bordered
          hover
          className="admin-table container mb-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Phone</th>
              {/* <th>Image</th> */}
              <th>Delete</th>
              <th>Update</th>
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
                  {/* <td>
                    <img
                      className="p-Image"
                      src={`${URL}/${user.image}`}
                      alt="photo"
                    />
                  </td> */}

                  <td>
                    <Button
                      variant="danger"
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(user.id)}>
                      Delete
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      className="btn btn-warning"
                      onClick={() => {
                        setEditUser(user);
                        setShowEditForm(true);
                      }}>
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
      {showEditForm && (
        <Form
          onSubmit={handleEditUser}
          className="container my-5 ">
          <input
            type="hidden"
            name="id"
            value={editUser.id}
            onChange={handleInputChange}
          />
          <Row>
            <Col>
              <FormGroup>
                <Label for="name">Name:</Label>
                <Input
                  type="text"
                  name="name"
                  value={editUser.name}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email:</Label>
                <Input
                  type="email"
                  name="email"
                  value={editUser.email}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col>
              
              <FormGroup>
                <Label for="type">User Type</Label>

                <select
                  name="type"
                  className="form-select"
                  value={editUser.type}
                  onChange={handleInputChange}>
                  <option value="">Select Type</option>
                  <option value="user">Supplier</option>
                  <option value="suppler">Supplier</option>
                  <option value="clinics">Clinics</option>
                  <option value="shelter">Shelter</option>
                </select>
              </FormGroup>
              <FormGroup>
                <Label for="phone">Phone:</Label>
                <Input
                  type="tel"
                  name="phone"
                  value={editUser.phone}
                  onChange={handleInputChange}
                />
              </FormGroup>
              {/* <FormGroup>
                                <Label for="image">Image:</Label>
                                <Input type="text" name="image" value={editUser.image} onChange={handleInputChange} />
                            </FormGroup> */}
            </Col>
          </Row>
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
          </button>{" "}
        </Form>
      )}
    </div>
  );
};

export default UsersTable;
