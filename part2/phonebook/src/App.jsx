import { useState, useEffect } from "react";
import axios from "axios";

import FilterForm from "./components/filterForm";
import PersonForm from "./components/personForm";
import Persons from "./components/persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [filterName, setFilterName] = useState("");

  const handleInputNamechange = (event) => {
    setNewName(event.target.value);
  };

  const handleInputNumberchange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterNamechange = (event) => {
    if (event.target.value === "") {
      setShowAll(true);
    } else {
      setShowAll(false);
    }

    setFilterName(event.target.value);
  };

  const handleAddNewPerson = (event) => {
    event.preventDefault();

    if (persons.find((i) => i.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    let newPersons = [...persons];
    const newId = persons.length + 1;
    const newPerson = {
      id: newId,
      name: newName,
      number: newNumber,
    };
    newPersons.push(newPerson);
    setPersons(newPersons);
    setNewName("");
    setNewNumber("");
  };

  const personsToShow = showAll
    ? persons
    : persons.filter((i) => i.name.toLowerCase().includes(filterName));

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h2>Phonebook</h2>
      <FilterForm
        filterName={filterName}
        handleFilterNamechange={handleFilterNamechange}
      />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleInputNamechange={handleInputNamechange}
        handleInputNumberchange={handleInputNumberchange}
        handleAddNewPerson={handleAddNewPerson}
      />
      <h3>Numbers</h3>
      <Persons data={personsToShow} />
    </>
  );
}

export default App;
