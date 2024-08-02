import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleInputNamechange = (event) => {
    setNewName(event.target.value);
  };

  const handleInputNumberchange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleAddNewPerson = (event) => {
    event.preventDefault();

    if (persons.find((i) => i.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    let newPersons = [...persons];
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    newPersons.push(newPerson);
    setPersons(newPersons);
    setNewName("");
    setNewNumber("");
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleInputNamechange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleInputNumberchange} />
        </div>
        <div>
          <button type="submit" onClick={handleAddNewPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((i) => (
        <p key={i.name}>
          {i.name} {i.number}
        </p>
      ))}
    </>
  );
}

export default App;
