const FilterForm = ({ filterName, handleFilterNamechange }) => {
  return (
    <form>
      filter shown with
      <input value={filterName} onChange={handleFilterNamechange} />
    </form>
  );
};

export default FilterForm;
