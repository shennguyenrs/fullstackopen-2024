import axios from "axios";

const url =
  import.meta.env.VITE_APP_STAGE === "prod"
    ? "/api/persons"
    : import.meta.env.VITE_APP_STAGE === "dev"
      ? "http://localhost:3001/api/persons"
      : "";

const getAll = () => {
  return axios.get(url);
};

const addPerson = (person) => {
  return axios.post(url, person);
};

const deletePerson = (id) => {
  return axios.delete(`${url}/${id}`);
};

const updatePerson = (id, person) => {
  return axios.put(`${url}/${id}`, person);
};

export default { getAll, addPerson, deletePerson, updatePerson };
