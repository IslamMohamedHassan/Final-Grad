import { ajax } from "../libCustomAjax_v1";
import React, { createContext, useEffect, useState } from 'react'

export const ApiContext = createContext(null);
const apiUrl = "http://ah.khaledfathi.com/api/user"

const ApiContextProvider = (props) => {

    const [userData, setUserData] = useState()
    const [dataUpdated, setDataUpdated] = useState(false)

    const fetchData = async () => {
        const response = await ajax(apiUrl);
        const data = await response.json();
        setUserData(data.data)
    }

    const createData = async (data) => {
        const response = await ajax(apiUrl, "post", data);
        const newData = await response.json()   ;
        setUserData((prevUserData) => [...prevUserData, newData]);
        setDataUpdated(true)
    }
    const updateData = async (id, data) => {
        const response = await ajax(apiUrl + "/" + id + "/update", "POST", data);
        const updatedData = await response.json();
        const updatedUserData = userData.map((item) =>
            item.id == id ? updatedData : item
        );
        setUserData(updatedUserData)
        setDataUpdated(true)
    }

    const deleteData = async (id) => {
        const response = await ajax(apiUrl + "/" + id, "delete");
        setUserData(userData.filter((item) => item.id !== id))
        setDataUpdated(true)
    }
    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (dataUpdated) {
            fetchData();
            setDataUpdated(false)
        }
    }, [dataUpdated])


    console.log(userData)

    const contextValues = {
        userData,
        createData,
        updateData,
        deleteData
    }

    return (
        <ApiContext.Provider value={contextValues}>
            {props.children}
        </ApiContext.Provider>
    )
}

export default ApiContextProvider