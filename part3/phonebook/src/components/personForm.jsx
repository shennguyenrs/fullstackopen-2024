const PersonForm = ({
  newName,
  newNumber,
  handleInputNamechange,
  handleInputNumberchange,
  handleAddNewPerson,
}) => {
  return (
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
  );
};

export default PersonForm;
