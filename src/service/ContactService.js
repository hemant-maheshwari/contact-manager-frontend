import axios from 'axios';

const API_URL = 'http://localhost:8000/api/contacts';

const getContacts = () => {
    return axios.get(API_URL);
};

const createContact = (contact) => {
    return axios.post(API_URL, contact);
};

const getContact = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const updateContact = (id, contact) => {
    return axios.put(`${API_URL}/${id}`, contact);
};

const deleteContact = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const getContactHistory = (id) => {
    return axios.get(`${API_URL}/${id}/history`);
};

export default {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
    getContactHistory,
};
