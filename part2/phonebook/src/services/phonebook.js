import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () =>
  axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

const createContact = (newContact) =>
  axios
    .post(baseUrl, newContact)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

const updateContact = (id, changedContact) =>
  axios
    .put(`${baseUrl}/${id}`, changedContact)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

const deleteContact = (id) =>
  axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export default { getAll, createContact, updateContact, deleteContact };
