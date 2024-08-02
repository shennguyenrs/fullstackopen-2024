import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleInputChange = (event) => {
    setNewName(event.target.value);
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
    };
    newPersons.push(newPerson);
    setPersons(newPersons);
    setNewName("");
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit" onClick={handleAddNewPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((i) => (
        <p key={i.name}>{i.name} </p>
      ))}
    </>
  );
}

export default App;
