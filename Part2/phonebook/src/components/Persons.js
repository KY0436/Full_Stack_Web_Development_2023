import Service from "../services/persons";

const Persons = ({newFilter, persons, setPersons, setSuccessMessage }) => {
  const personsToShow =
    newFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        ) // Filter with the specific requirement

  // The handler for deletion of one person
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      Service.deleteData(id).then(() => {
        setPersons(persons.filter((item) => item.id != id));
        setSuccessMessage(
          `Deleted ${name}`
        )
      })
    }
  }

  return (
    <p>
      {personsToShow.map((person) => {
        return (
          <p key={person.id} className="contact-element">
            {person.name} {person.number} 
            <button
              type="submit"
              onClick={() => handleDelete(person.id, person.name)}
            >
              delete
            </button>            
          </p>
        )
      })}
    </p>
  )
}

export default Persons;