/** @format */

import React, { useContext, useEffect, useRef, useState } from "react";
import { Spinner, Table, form, Button, Col, Row } from "react-bootstrap";
import { ajax } from "../../libCustomAjax_v1";
import { constants } from "../../constants";

const URL = constants.API_HOST;
const serviceUrl = URL + "/api/service";

const ServicesTable = () => {
  const [serviceData, setServiceData] = useState(null);
  const [serviceUpdated, setServiceUpdated] = useState(false);
  const fileInputRef = useRef(null);

  const fetchServiceData = async () => {
    const response = await ajax(serviceUrl);
    const data = await response.json();
    setServiceData(data.data);
  };

  const createService = async (service, file) => {
    file = file.value ? file : null;
    const response = await ajax(serviceUrl, "post", service, file);

    const newService = await response.json();
console.log(newService);
    setServiceData((serviceData) => [...serviceData, newService]);
    setServiceUpdated(true);
  };

  const updateServiceData = async (id, updatedService, file) => {
    const response = await ajax(
      `${serviceUrl}/${id}/update`,
      "post",
      updatedService,
      file.value ? file : null
    );
    const updatedServiceData = await response.json();
    console.log(updatedServiceData);
    const updatedServiceList = serviceData.map((service) =>
      service.id === id ? updatedServiceData : service
    );
    setServiceData(updatedServiceList);
    setServiceUpdated(true);
  };

  const deleteService = async (id) => {
    await ajax(`${serviceUrl}/${id}`, "delete");
    setServiceData(serviceData.filter((service) => service.id !== id));
    setServiceUpdated(true);
  };

  useEffect(() => {
    fetchServiceData();
  }, []);

  useEffect(() => {
    if (serviceUpdated) {
      fetchServiceData();
      setServiceUpdated(false);
    }
  }, [serviceUpdated]);

  const [newService, setNewService] = useState({
    user_id: "",
    name: "",
    phone: "",
    address: "",
    working_hours: "",
    description: "",
    service_type: "",
    animal_type: "",
    approval: "",
    image: null,
  });

  const [editService, setEditService] = useState({
    user_id: "",
    name: "",
    phone: "",
    address: "",
    working_hours: "",
    description: "",
    service_type: "",
    animal_type: "",
    approval: "",
    image: null,
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const file = fileInputRef.current;
    await createService(newService, file);
    setShowAddForm(false);
    setIsLoading(false);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const file = fileInputRef.current;
    setIsLoading(true);
    await updateServiceData(editService.id, editService, file);
    setShowEditForm(false);
    setIsLoading(false);
  };

  const handleEditClick = (service) => {
    setEditService(service);
    setShowEditForm(true);
  };

  const handleDeleteClick = async (id) => {
    setIsLoading(true);
    await deleteService(id);
    setIsLoading(false);
  };

  return (
    <div >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="btn btn-success m-3"
          onClick={() => setShowAddForm(true)}>
          Add Service
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="container">
          <Row>
            <Col>
              <div className="form-group">
                {/* <label className="my-2">User ID:</label> */}
                <input
                  type="text"
                  className="form-control"
                  name="user_id"
                  value={newService.user_id}
                  onChange={handleInputChange}
                  hidden
                />
              </div>

              <div className="form-group">
                <label className="my-2">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={newService.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="my-2">Phone:</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={newService.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="my-2">Address:</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={newService.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="my-2">Working Hours:</label>
                <input
                  type="text"
                  className="form-control"
                  name="working_hours"
                  value={newService.working_hours}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="my-2">Description:</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={newService.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="my-2">Service Type:</label>
                <select
                  className="form-control"
                  id="service_type"
                  name="service_type"
                  value={newService.service_type}
                  onChange={handleInputChange}
                  required>
                  <option value="">Select Service Type</option>
                  <option value="clinics">Clinics</option>
                  <option value="shelter">Shelter</option>
                </select>
              </div>

              <div className="form-group">
                <label className="my-2">Animal Type:</label>

                <select
                  className="form-control"
                  id="animal_type"
                  name="animal_type"
                  value={newService.animal_type}
                  onChange={handleInputChange}>
                  <option value="">Select Animal Type</option>
                  <option value="cat">Cat</option>
                  <option value="dog">Dog</option>
                </select>
              </div>

              <div className="form-group">
                <label className="my-2">Approval:</label>

                <select
                  className="form-control"
                  id="approval"
                  name="approval"
                  value={newService.approval}
                  onChange={handleInputChange}>
                  <option value="">Select Approval Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="form-group my-2">
                <label className="my-2">Image:</label>
                <input
                  type="file"
                  className="form-control-file"
                  name="image"
                  // onChange={handleImageChange}
                  ref={fileInputRef}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary mb-3">
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
                className="btn btn-secondary ml-2 mb-3 ms-3"
                onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
            </Col>
          </Row>
        </form>
      )}
      {showEditForm && (
        <form onSubmit={handleEditSubmit} className="container">
          <Row>
            <Col>
              <div className="form-group">
                <label className="my-2">User ID:</label>
                <input
                  type="text"
                  className="form-control"
                  name="user_id"
                  value={editService.user_id}
                  onChange={handleEditInputChange}
                />
              </div>

              <div className="form-group">
                <label className="my-2">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={editService.name}
                  onChange={handleEditInputChange}
                />
              </div>

              <div className="form-group">
                <label className="my-2">Phone:</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={editService.phone}
                  onChange={handleEditInputChange}
                />
              </div>

              <div className="form-group">
                <label className="my-2">Address:</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={editService.address}
                  onChange={handleEditInputChange}
                />
              </div>

              <div className="form-group">
                <label className="my-2">Working Hours:</label>
                <input
                  type="text"
                  className="form-control"
                  name="working_hours"
                  value={editService.working_hours}
                  onChange={handleEditInputChange}
                />
              </div>

              <div className="form-group">
                <label className="my-2">Description:</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={editService.description}
                  onChange={handleEditInputChange}
                />
              </div>

              <div className="form-group">
                <label className="my-2">Service Type:</label>
                <select
                  className="form-control"
                  id="service_type"
                  name="service_type"
                  value={editService.service_type}
                  onChange={handleEditInputChange}
                  required>
                  <option value="">Select Service Type</option>
                  <option value="clinics">Clinics</option>
                  <option value="shelter">Shelter</option>
                </select>
              </div>

              <div className="form-group">
                <select
                  className="form-control"
                  id="animal_type"
                  name="animal_type"
                  value={editService.animal_type}
                  onChange={handleEditInputChange}>
                  <option value="">Select Animal Type</option>
                  <option value="cat">Cat</option>
                  <option value="dog">Dog</option>
                </select>
              </div>

              <div className="form-group">
                <label className="my-2">Approval:</label>
                <select
                  className="form-control"
                  id="approval"
                  name="approval"
                  value={editService.approval}
                  onChange={handleEditInputChange}>
                  <option value="">Select Approval Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="form-group">
                <label className="my-2">Image:</label>
                <input
                  type="file"
                  className="form-control-file  my-3"
                  name="image"
                  // onChange={handleEditImageChange}
                  ref={fileInputRef}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary mb-3">
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
                className="btn btn-secondary ml-2 mb-3 ms-3"
                onClick={() => setShowEditForm(false)}>
                Cancel
              </button>
            </Col>
          </Row>
        </form>
      )}

      <Table
        striped
        bordered
        hover
        className="container admin-table mb-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Working Hours</th>
            <th>Description</th>
            <th>Service Type</th>
            <th>Animal Type</th>
            <th>Approval</th>
            <th>Image</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {serviceData &&
            serviceData.map((service) => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.user_id}</td>
                <td>{service.name}</td>
                <td>{service.phone}</td>
                <td>{service.address}</td>
                <td>{service.working_hours}</td>
                <td>{service.description}</td>
                <td>{service.service_type}</td>
                <td>{service.animal_type}</td>
                <td>{service.approval}</td>
                <td>
                  {service.image && (
                    <img
                    className="p-Image"
                      src={`${URL}/${service.image}`}
                      alt={`Service ${service.id} image`}
                    />
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteClick(service.id)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => handleEditClick(service)}>
                    Update
                  </button>
                  </td>

              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ServicesTable;
