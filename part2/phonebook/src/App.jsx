import { useEffect, useState } from "react";

import FilterForm from "./components/filterForm";
import PersonForm from "./components/personForm";
import Persons from "./components/persons";
import personService from "./services/person";

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

    personService
      .addPerson(newPerson)
      .then((res) => {
        newPersons.push(res.data);
        setPersons(newPersons);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => console.log(error));
  };

  const personsToShow = showAll
    ? persons
    : persons.filter((i) => i.name.toLowerCase().includes(filterName));

  useEffect(() => {
    personService
      .getAll()
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
