/** @format */

import React, { useContext, useRef, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getSession, setSession
} from "../../helper";
import { ApiContext } from "../../context/API-Context";
import { constants } from "../../constants";
import { ajax } from "../../libCustomAjax_v1";

const URL = constants.API_HOST;

//component
const ShelterProfile = () => {
  /*******************/
  const redirect = useNavigate();
  const routeLogin = () => {
    redirect("/login");
  };
  useEffect(() => {
    if (!getSession("login")) {
      routeLogin();
    } else {
      setAuth(getSession("auth"));
    }
  }, []);

  /*******************/

  const {dataUpdated } = useContext(ApiContext);
  const [editMode, setEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  // const [dataUpdated, setDataUpdated] = useState(false)

  const [auth, setAuth] = useState({});

  const [profileImage, setProfileImage] = useState("./Images/profile.webp");
  const fileInputRef = useRef(null);

/* ########## Start Khaled ################################### */ 
  //user data carier , states
  const [updateUserMessage  , setUpddateUserMessage]= useState(null); 
  const [updateUserWatingIndecator  , setUpdateUserWatingIndecator]= useState(null); 
  //service data carier , states
  // const [updateServiceMessage  , setUpdateSrviceMessage]= useState([]); 
  const [updateServiceWatingIndecator  , setUpdateServiceWatingIndecator]= useState(null); 
  const [updateServiceMessage  , setUpdateSrviceMessage]= useState([]); 
  
  //Action for update user(API and page)
  const updateUserDate = async (id, data,file) => {
        setUpdateUserWatingIndecator(true); 
        setUpddateUserMessage(null); 
        file = (file.value)? file:null
        const request = await ajax(URL+ "/api/user/" + id + "/update", "POST", data,file);
        const  response = await request.json();
        if(response.status){
          setUpdateUserWatingIndecator(false); 
          setSession("auth" , response.record); 
          setAuth(response.record);           
        }else{
          setUpdateUserWatingIndecator(false); 
          setUpddateUserMessage( response.msg); 
        }
    }

    //Action for update user(API and page)
    const addServiceData = async (data,file) => {
        setUpdateServiceWatingIndecator(true); 
        file = (file.value)? file:null
        const request = await ajax(URL+'/api/service', "post", data,file);
        const response = await request.json();        
        if(response.status){
          setUpdateServiceWatingIndecator(false); 
          setUpdateServiceWatingIndecator(false); 
        }else{
          setUpdateServiceWatingIndecator(false); 
          setUpdateSrviceMessage(response.errors); 
        }
 }
/* ########## End Khaled ################################### */ 


  const handleEdit = () => {
    setEditMode(true);
  };

  const handleClose = () => {
    setEditMode(false);
  };

  const handleSave = () => {
    // Perform validation and save changes
    setEditMode(false);
    /* ########## Start Khaled ################################### */ 
    //remove any message from edit user form
    setUpddateUserMessage(null); 
    setUpddateUserMessage(null); 
    /* ########## End Khaled ################################### */ 
  };

  const [newShelter, setNewShelter] = useState({
    name: "",
    phone: "",
    user_id: "",
    address: "",
    working_hours: "",
    description: "",
    animal_type: "dog",
    approval: "pending",
    service_type: "",
  });
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleEditUser = async (event) => {
    event.preventDefault();
    const file =
      fileInputRef.current !== null ? fileInputRef.current : undefined;
    /******/
    await updateUserDate(editUser.id, editUser, file);
    /******/
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewShelter({ ...newShelter, [name]: value });
    setEditUser({ ...editUser, [name]: value });
  };

  const handleAddShelter = async (event) => {
    setUpdateSrviceMessage([]); 

    event.preventDefault();
    const file =
      fileInputRef.current !== null ? fileInputRef.current : null;
    
    await addServiceData(newShelter, file);
    setNewShelter({
      name: "",
      phone: "",
      user_id: "",
      address: "",
      working_hours: "",
      description: "",
      animal_type: "dog",
      approval: "pending",
      service_type: "",
    });
  };

  const handleForm = () => {
    setShowForm(true);
  };

  const handleSaveShelter = () => {
    setUpdateSrviceMessage([]); 
    // Perform validation and save shelter data
    setShowForm(false);
  };

  useEffect(() => {
    if (dataUpdated) {
      setAuth(getSession("auth"));
      // setDataUpdated(false)
    }
  }, [dataUpdated]);
  return (
    <div>
      <div className="prof">
        <div className="info">
          <img
            src={auth.image ? URL + "/" + auth.image : profileImage}
            className="profileImage"
            alt="Profile"
            style={{
              position: "absolute",
              borderRadius: "50%",
              width: "180px",
              height: "180px",
              top: "-100px",
              left: "50%",
              transform: "translateX(-50%)",
              border: "2px",
            }}
          />
          <h3
            style={{
              marginTop: "100px",
              marginBottom: "10px",
              textAlign: "center",
              fontSize: "30px",
            }}>
            {auth.name}
          </h3>
          <h4
            style={{
              textAlign: " center",
              fontSize: "20px",
              marginBottom: "10px",
            }}>
            {auth.email}
          </h4>
          <button
            className="Middle-Button"
            style={{
              fontSize: "15px",
              marginLeft: "50%",
              transform: "translateX(-50%)",
              marginBottom: "20px",
              padding: "8px 23px",
              border: "none",
              color: "white",
              cursor: "pointer",
              borderRadius: "8px",
            }}
            onClick={() => {
              handleEdit();
              setEditUser(auth);
            }}>
            Edit profile
          </button>
        </div>

        {editMode && (
          <form onSubmit={handleEditUser}>
            <div
              className="edit"
              style={{
                backgroundColor: "#ffff",
                position: "absolute",
                width: "25%",
                border: "1px solid transparent",
                marginLeft: "65%",
                marginTop: "6%",
                borderRadius: "40px 40px 20px 20px",
                zIndex: "150",
              }}>
              <img
                className="editImage"
                src={(auth.image)? URL + "/" + auth.image : ""}
                alt="Edit Profile"
              />
              <label className="file-label">
                <input
                  type="file"
                  className="file-input"
                  accept="image/*"
                  ref={fileInputRef}
                />
                <span className="file-custom">
                  <i className="fas fa-upload"></i> Choose File
                </span>
              </label>

              <input
                className="editName"
                type="hidden"
                value={(editUser.id = auth.id)}
                name="id"
                onChange={handleInputChange}
              />
              <h5 className="editNM"> Name</h5>
              <input
                className="editName"
                type="text"
                value={editUser.name}
                name="name"
                onChange={handleInputChange}
              />
              <h5 className="editNM">Email</h5>
              <input
                className="editEmail"
                type="email"
                value={editUser.email}
                name="email"
                onChange={handleInputChange}
              />
              <h5 className="editNM">Phone</h5>
              <input
                className="editEmail"
                type="tel"
                value={editUser.phone}
                name="phone"
                onChange={handleInputChange}
              />
              <h5 className="editNM">Address</h5>
              <input
                className="editEmail"
                type="text"
                value={editUser.address}
                name="address"
                onChange={handleInputChange}
              />
              <input
                className="editEmail"
                type="text"
                value={auth.type}
                name="address"
                onChange={handleInputChange}
                hidden
              />

              {/* ### Start Kahled###################################### */}
                  {updateUserWatingIndecator ?
                    <h5 style={{'margin':'10px 0px', 'textAlign':'center' }}>Please Wait . . . </h5>:null
                  }
                  {updateUserMessage ?
                    <h5 style={{'margin':'10px 0px', 'color':'red','textAlign':'center' }}>{updateUserMessage}</h5>:null
                  }
              {/* ### End Kahled###################################### */}

              <input
                className="save"
                type="submit"
                value="Save"
              />
              <button
                className="save"
                onClick={handleSave}>
                Close
              </button>
            </div>
          </form>
        )}

        {/* ////////////////////////////////////////////////////////////////////////// */}
      </div>
      <div className="addShelter">
        <button
          id="add"
          onClick={handleForm}>
          Add { (auth.type == "shelter")? "Shelter" : "Clinic" }
        </button>
      </div>

      {showForm && (
        <div
          className="form"
          id="form">
          <img
            className="editImage"
            src={(auth.image)?URL + "/" + auth.image:""}
            alt="shelter"
          />

          <div className="form-row">
            <div className="form-group">
              <h5 className="editNM">
                {auth.type == "shelter" ? "Pet Name" : "Clinic Name"}
              </h5>
              <input
                type="text"
                className="editName"
                value={newShelter.name}
                name="name"
                onChange={handleInputChange}
                required
              />
            </div>
            <input
              type="text"
              className="editName"
              name="user_id"
              value={(newShelter.user_id = auth.id)}
              onChange={handleInputChange}
              hidden
            />
            <input
              type="text"
              className="editName"
              name="service_type"
              value={(newShelter.service_type = auth.type)}
              onChange={handleInputChange}
              hidden
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              className="editName"
              name="address"
              value={(newShelter.address = auth.address)}
              onChange={handleInputChange}
              hidden
            />
            <input
              type="tel"
              className="editName"
              value={(newShelter.phone = auth.phone)}
              name="phone"
              onChange={handleInputChange}
              hidden
            />
            <div className="form-group">
              <h5 className="editNM">Working Hours</h5>
              <input
                type="datetime-local"
                className="editName"
                name="working_hours"
                value={newShelter.working_hours}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <h5 className="editNM">Description</h5>
            <textarea
              className="textarea"
              value={newShelter.description}
              name="description"
              onChange={handleInputChange}
              required></textarea>
          </div>
          <div className="">
            {(auth.type == "shelter") ? (
              <select
                required
                className="form-select"
                id="businessType"
                name="animal_type"
                value={newShelter.animal_type}
                onChange={handleInputChange}>
                <option value="">Select Pet Type</option>
                <option value="dog">dog</option>
                <option value="cat">cat</option>
              </select>
            ) : (
              ""
            )}
          </div>
          <label className="file-label">
            <input
              type="file"
              className="file-input"
              ref={fileInputRef}
              required
            />
            <span className="file-custom">
              <i className="fas fa-upload"></i> Choose Image
            </span>
          </label>

          {/* ### Start Kahled###################################### */}
            {updateServiceWatingIndecator ?
              <h5 style={{'margin':'10px 0px', 'textAlign':'center' }}>Please Wait . . . </h5>:null
            }
            {updateServiceMessage ?
              <h5 style={{'margin':'10px 0px', 'color':'red' }}>
                 {
                   updateServiceMessage.map((error , index )=>(
                    <span key={index}>- {error}<br/></span>
                   )) 
                 }
                </h5>:null
            }
          {/* ### End Kahled###################################### */}

          <button
            className="save"
            onClick={handleAddShelter}>
            Save
          </button>
          <button
            className="save"
            onClick={handleSaveShelter}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ShelterProfile;
