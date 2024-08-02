const Persons = ({ data }) => {
  return (
    <>
      {data.map((i) => (
        <p key={i.id}>
          {i.name} {i.number}
        </p>
      ))}
    </>
  );
};

export default Persons;
