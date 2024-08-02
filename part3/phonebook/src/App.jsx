import { useEffect, useState } from "react";

import FilterForm from "./components/filterForm";
import Notification from "./components/notification";
import PersonForm from "./components/personForm";
import Persons from "./components/persons";
import personService from "./services/person";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [filterName, setFilterName] = useState("");
  const [errMessage, setErrMessage] = useState(null);
  const [messageVariant, setMessageVariant] = useState("");

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
    const foundPerson = persons.find((i) => i.name === newName);

    if (foundPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const newPerson = {
          ...foundPerson,
          number: newNumber,
        };

        personService
          .updatePerson(foundPerson.id, newPerson)
          .then((res) => {
            let newPersons = [...persons].filter(
              (i) => i.id !== foundPerson.id,
            );
            newPersons.push(res.data);
            setPersons(newPersons);
            setNewName("");
            setNewNumber("");

            setErrMessage(`Update ${newName} with new phone number`);
            setMessageVariant("success");

            setTimeout(() => {
              setErrMessage(null);
              setMessageVariant("");
            }, 4000);
          })
          .catch((error) => {
            console.log(error);
            setErrMessage(
              `Information of ${newName} was already removed from server`,
            );
            setMessageVariant("error");

            setTimeout(() => {
              setErrMessage(null);
              setMessageVariant("");
            }, 4000);
          });
      }

      return;
    }

    let newPersons = [...persons];
    const newId = persons.length + 1;
    const newPerson = {
      id: newId.toString(),
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

        setErrMessage(`Added ${newName}`);
        setMessageVariant("success");

        setTimeout(() => {
          setErrMessage(null);
          setMessageVariant("");
        }, 4000);
      })
      .catch((error) => {
        const errorMessage = error.response.data.error;
        setErrMessage(errorMessage);
        setMessageVariant("error");
      });
  };

  const handleDeletePerson = (event, name, id) => {
    event.preventDefault();

    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          const newPersons = [...persons].filter((i) => i.id !== id);
          setPersons(newPersons);
        })
        .catch((error) => {
          const errorMessage = error.response.data.error;
          setErrMessage(errorMessage);
          setMessageVariant("error");
        });
    }
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
        const errorMessage = error.response.data.error;
        setErrMessage(errorMessage);
        setMessageVariant("error");
      });
  }, []);

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={errMessage} variant={messageVariant} />
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
      <Persons data={personsToShow} handleDelete={handleDeletePerson} />
    </>
  );
}

export default App;
