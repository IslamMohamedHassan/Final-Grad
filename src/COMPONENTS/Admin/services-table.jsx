import React, { useContext, useEffect, useRef, useState } from 'react';
import { Spinner, Table, form, button, Col, Row } from 'react-bootstrap';
import { ajax } from '../../libCustomAjax_v1';
import { constants } from '../../constants';

const URL = constants.API_HOST; 
const serviceUrl = URL+"/api/service"

const ServicesTable = () => {

    const [serviceData, setServiceData] = useState(null);
    const [serviceUpdated, setServiceUpdated] = useState(false)
    const fileInputRef = useRef(null);


    const fetchServiceData = async () => {
        const response = await ajax(serviceUrl);
        const data = await response.json();
        setServiceData(data.data)  
    }

    const createService = async (service,file) => {


        file = (file.value)? file:null
        const response = await ajax(serviceUrl, "post", service,file);
        
        const newService = await response.json();
        
        setServiceData((serviceData) => [...serviceData, newService]);
        setServiceUpdated(true)
    };

    const updateServiceData = async (id, updatedService) => {

        const response = await ajax(`${serviceUrl}/${id}`, "post",serviceData );
        const updatedServiceData = await response.json();
        const updatedServiceList = serviceData.map((service) => (service.id === id ? updatedServiceData : service));
        setServiceData(updatedServiceList)
        setServiceUpdated(true)
    };

    const deleteService = async (id) => {
        await ajax(`${serviceUrl}/${id}`,"delete");
        setServiceData(serviceData.filter((service) => service.id !== id));
        setServiceUpdated(true)
    };

    useEffect(() => {
        fetchServiceData();
    }, [])

    useEffect(() => {
        if(serviceUpdated){
            fetchServiceData();
            setServiceUpdated(false)
        }
    }, [serviceUpdated])


    const [newService, setNewService] = useState({
        user_id: '',
        name: '',
        phone: '',
        address: '',
        working_hours: '',
        description: '',
        service_type: '',
        animal_type: '',
        approval: '',
        image: null,
    });

    const [editService, setEditService] = useState({
        id: null,
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
        const file =
        fileInputRef.current !== null ? fileInputRef.current : undefined;
        await createService(newService,file);
        setShowAddForm(false);
        setIsLoading(false);
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        await updateServiceData(editService.id, editService);
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
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Services</h3>
                <button className="btn btn-success" onClick={() => setShowAddForm(true)}>
                    Add Service
                </button>
            </div>

            {showAddForm && (
                <form onSubmit={handleAddSubmit}>
                    <Row>
                        <Col>
                            <div className="form-group">
                                <label>User ID:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="user_id"
                                    value={newService.user_id}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={newService.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={newService.phone}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Address:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    value={newService.address}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Working Hours:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="working_hours"
                                    value={newService.working_hours}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Description:</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={newService.description}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Service Type:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="service_type"
                                    value={newService.service_type}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Animal Type:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="animal_type"
                                    value={newService.animal_type}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Approval:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="approval"
                                    value={newService.approval}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Image:</label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    name="image"
                                    // onChange={handleImageChange}
                                    ref={fileInputRef}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                {isLoading ? <Spinner animation="border" size="sm" /> : 'Submit'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary ml-2"
                                onClick={() => setShowAddForm(false)}
                                >
                                Cancel
                                </button>
                                </Col>
                                </Row>
                                </form>
                                )}
                                {showEditForm && (
            <form onSubmit={handleEditSubmit}>
                <Row>
                    <Col>
                        <div className="form-group">
                            <label>User ID:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="user_id"
                                value={editService.user_id}
                                onChange={handleEditInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={editService.name}
                                onChange={handleEditInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                value={editService.phone}
                                onChange={handleEditInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Address:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                value={editService.address}
                                onChange={handleEditInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Working Hours:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="working_hours"
                                value={editService.working_hours}
                                onChange={handleEditInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Description:</label>
                            <textarea
                                className="form-control"
                                name="description"
                                value={editService.description}
                                onChange={handleEditInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Service Type:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="service_type"
                                value={editService.service_type}
                                onChange={handleEditInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Animal Type:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="animal_type"
                                value={editService.animal_type}
                                onChange={handleEditInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Approval:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="approval"
                                value={editService.approval}
                                onChange={handleEditInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Image:</label>
                            <input
                                type="file"
                                className="form-control-file"
                                name="image"
                                // onChange={handleEditImageChange}
                                ref={fileInputRef}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            {isLoading ? <Spinner animation="border" size="sm" /> : 'Submit'}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary ml-2"
                            onClick={() => setShowEditForm(false)}
                        >
                            Cancel
                        </button>
                    </Col>
                </Row>
            </form>
        )}

        <Table striped bordered hover>
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
                    <th>Actions</th>
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
                                        src={`${URL}/${service.image}`}
                                        alt={`Service ${service.id} image`}
                                        width="50"
                                        height="50"
                                    />
                                )}
                            </td>
                            <td>
                                <button
                                    className="btn btn-primary mr-2"
                                    onClick={() => handleEditClick(service)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteClick(service.id)}
                                >
                                    Delete
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