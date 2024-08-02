const Persons = ({ data, handleDelete }) => {
  return (
    <>
      {data.map((i) => (
        <div key={i.id}>
          <p>
            {i.name} {i.number}
          </p>
          <button onClick={(event) => handleDelete(event, i.name, i.id)}>
            delete
          </button>
        </div>
      ))}
    </>
  );
};

export default Persons;
