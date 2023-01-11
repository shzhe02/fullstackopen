const Filter = ({searchkey, handleSearchkey}) => {
  return (
    <div>
      filter shown with <input value={searchkey} onChange={handleSearchkey}/>
    </div>
  )
}

export default Filter